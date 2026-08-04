import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const reviewMode = process.argv[3] ?? "visible";
const cityDataDirectory = path.join(process.cwd(), "lib", "areas", "cities");

if (!new Set(["visible", "hidden"]).has(reviewMode)) {
  throw new Error('Review mode must be either "visible" or "hidden".');
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function matchOne(html, expression) {
  return decodeHtml(html.match(expression)?.[1]?.trim() ?? "");
}

function pageText(html) {
  const mains = [...html.matchAll(/<main[\s\S]*?<\/main>/gi)].map(
    (match) => match[0],
  );
  const main = mains.sort((left, right) => right.length - left.length)[0] ?? html;
  return decodeHtml(
    main
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function wordSet(text) {
  const ignored = new Set([
    "about", "after", "also", "around", "before", "being", "curtain",
    "curtains", "different", "installation", "into", "local", "need",
    "properties", "property", "service", "should", "track", "tracks",
    "where", "which", "with", "within", "your",
  ]);
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9'-]+/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 4 && !ignored.has(word)),
  );
}

function jaccard(left, right) {
  const intersection = [...left].filter((word) => right.has(word)).length;
  return intersection / (left.size + right.size - intersection);
}

const cityFiles = (await fs.readdir(cityDataDirectory))
  .filter((file) => file.endsWith(".ts"));
const source = (
  await Promise.all(
    cityFiles.map((file) => fs.readFile(path.join(cityDataDirectory, file), "utf8")),
  )
).join("\n");
const reviewSource = await fs.readFile(
  path.join(process.cwd(), "lib", "areas", "reviews.ts"),
  "utf8",
);
const slugs = [...source.matchAll(/\bslug:\s*"([a-z0-9-]+)"/g)].map(
  (match) => match[1],
);
const uniqueSlugs = [...new Set(slugs)];
const failures = [];

if (slugs.length !== uniqueSlugs.length) {
  failures.push("Duplicate city slugs exist in the source data.");
}
if (uniqueSlugs.length !== 57) {
  failures.push(`Expected 57 city slugs, found ${uniqueSlugs.length}.`);
}
const reviewMatches = [...reviewSource.matchAll(
  /^\s*\["([a-z0-9-]+)",\s*"([^"]+)",\s*"([^"]+)"/gm,
)];
const reviewSlugs = reviewMatches.map((match) => match[1]);
const reviewNames = reviewMatches.map((match) => match[2]);
if (reviewSlugs.length !== uniqueSlugs.length) {
  failures.push(`Expected ${uniqueSlugs.length} sample reviews, found ${reviewSlugs.length}.`);
}
if (new Set(reviewSlugs).size !== reviewSlugs.length) {
  failures.push("Duplicate sample-review city slugs exist.");
}
if (new Set(reviewNames).size !== reviewNames.length) {
  failures.push("Sample-review names are not unique.");
}
for (const slug of uniqueSlugs) {
  if (!reviewSlugs.includes(slug)) failures.push(`Missing sample review for ${slug}.`);
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) {
  failures.push(`/sitemap.xml returned ${sitemapResponse.status}.`);
}
const sitemapXml = await sitemapResponse.text();

const rows = [];
const internalLinks = new Set();
for (const slug of uniqueSlugs) {
  const route = `/areas/${slug}`;
  const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
  const html = await response.text();
  const title = matchOne(html, /<title>([\s\S]*?)<\/title>/i);
  const description = matchOne(
    html,
    /<meta\s+name="description"\s+content="([^"]*)"/i,
  );
  const canonical = matchOne(
    html,
    /<link\s+rel="canonical"\s+href="([^"]*)"/i,
  );
  const robots = matchOne(
    html,
    /<meta\s+name="robots"\s+content="([^"]*)"/i,
  );
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const faqCount = (html.match(/<details\b/gi) ?? []).length;
  const renderedText = pageText(html);
  const nearbyCityLinkCount = (html.match(/href="\/areas\/[a-z0-9-]+"/g) ?? []).length;
  const guideLinkCount = (html.match(/href="\/guides\/[a-z0-9-]+"/g) ?? []).length;
  const schema = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1])
    .join(" ");

  if (response.status !== 200) failures.push(`${route} returned ${response.status}.`);
  if (h1Count !== 1) failures.push(`${route} has ${h1Count} H1 elements.`);
  if (faqCount !== 3) failures.push(`${route} has ${faqCount} local FAQs.`);
  if (!renderedText.toLowerCase().includes("nationwide")) {
    failures.push(`${route} does not explain TrackFit's nationwide service.`);
  }
  if (nearbyCityLinkCount < 2) failures.push(`${route} lacks nearby city links.`);
  if (guideLinkCount < 2) failures.push(`${route} lacks two relevant guide links.`);
  if (!html.includes('href="/quote/postcode"')) {
    failures.push(`${route} does not link to the quote journey.`);
  }
  if (!title) failures.push(`${route} has no title.`);
  if (!description) failures.push(`${route} has no meta description.`);
  if (new URL(canonical || baseUrl, baseUrl).pathname !== route) {
    failures.push(`${route} canonical is ${canonical || "missing"}.`);
  }
  if (robots && !robots.includes("index")) {
    failures.push(`${route} is not explicitly indexable.`);
  }
  const sampleReviewCount = (
    renderedText.match(/Sample review — not a verified customer testimonial/g) ?? []
  ).length;
  if (reviewMode === "visible" && sampleReviewCount !== 1) {
    failures.push(`${route} has ${sampleReviewCount} visible sample reviews.`);
  }
  if (reviewMode === "hidden" && sampleReviewCount !== 0) {
    failures.push(`${route} exposes sample review content while reviews are disabled.`);
  }
  if (/Review|AggregateRating/.test(schema)) {
    failures.push(`${route} contains review schema.`);
  }
  if (!sitemapXml.includes(`/areas/${slug}</loc>`)) {
    failures.push(`${route} is missing from the sitemap.`);
  }

  for (const linkMatch of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = linkMatch[1].split("#")[0].split("?")[0];
    if (href && !href.startsWith("//")) internalLinks.add(href);
  }

  rows.push({ route, title, description, words: wordSet(renderedText) });
}

for (const key of ["title", "description"]) {
  const seen = new Map();
  for (const row of rows) {
    if (seen.has(row[key])) {
      failures.push(`Duplicate ${key}: ${seen.get(row[key])} and ${row.route}.`);
    }
    seen.set(row[key], row.route);
  }
}

const similarities = [];
for (let left = 0; left < rows.length; left += 1) {
  for (let right = left + 1; right < rows.length; right += 1) {
    similarities.push({
      routes: `${rows[left].route} ↔ ${rows[right].route}`,
      score: jaccard(rows[left].words, rows[right].words),
    });
  }
}
similarities.sort((a, b) => b.score - a.score);
if (similarities[0]?.score >= 0.72) {
  failures.push(
    `Substantial repeated text: ${similarities[0].routes} (${similarities[0].score.toFixed(3)}).`,
  );
}

const brokenLinks = [];
for (const href of internalLinks) {
  const response = await fetch(`${baseUrl}${href}`, { redirect: "manual" });
  if (response.status >= 400) brokenLinks.push(`${href} (${response.status})`);
}
if (brokenLinks.length > 0) {
  failures.push(`Broken internal links: ${brokenLinks.join(", ")}.`);
}

console.log(`City pages checked: ${rows.length}`);
console.log(`Unique internal links checked: ${internalLinks.size}`);
console.log("Highest text-similarity pairs:");
for (const result of similarities.slice(0, 5)) {
  console.log(`  ${result.score.toFixed(3)}  ${result.routes}`);
}

if (failures.length > 0) {
  console.error("\nAudit failures:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("All city crawl checks passed.");
}
