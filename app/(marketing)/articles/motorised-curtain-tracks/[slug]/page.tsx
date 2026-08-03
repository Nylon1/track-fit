import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import { motorisedArticles } from "@/lib/motorised/data";
import { createMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/site-config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return motorisedArticles.map(([slug]) => ({ slug }));
}

export const dynamicParams = false;

function getArticle(slug: string) {
  return motorisedArticles.find(([item]) => item === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const [, title, summary] = article;
  return createMetadata({
    title: `${title} | TrackFit Guide`,
    description: summary,
    path: `/articles/motorised-curtain-tracks/${slug}`,
    type: "article",
  });
}

const articleDetails: Record<string, { intro: string; sections: { title: string; text: string }[]; related: string[] }> = {
  "how-to-choose-a-motorised-curtain-track": { intro: "A reliable motorised curtain system starts with the curtain and room—not the motor name. Work through weight, track route, power, controls and fixing before choosing hardware.", sections: [
    { title: "Start with the finished curtain", text: "Confirm track width, finished drop, fullness, face-fabric GSM, lining, interlining and heading. The motor moves the complete finished curtain, not just the face fabric." },
    { title: "Map the track route", text: "Record overall length, one-way or centre opening, stack position and every bend. TrackFit uses a preliminary 10% additional motor-load allowance per bend." },
    { title: "Choose power and controls", text: "Decide whether the project needs a wired motor, rechargeable battery, remote, app, voice control, home automation or BMS integration." },
    { title: "Check fixing and access", text: "The ceiling or wall must support the complete system. Keep the motor and control components accessible for commissioning and future service." },
  ], related: ["/motorised-curtain-tracks/motors", "/motorised-curtain-tracks/track-systems", "/motorised-curtain-tracks/controls"] },
  "how-much-do-curtains-weigh": { intro: "Curtain weight is calculated from fabric area and material weight, then adjusted for construction. Guessing from appearance can understate the real moving load.", sections: [
    { title: "Calculate fabric area", text: "Multiply track width by fullness and finished drop. A five-metre track at two-times fullness and a 2.6-metre drop uses approximately 26 square metres for each full layer." },
    { title: "Add every material layer", text: "Combine the GSM of face fabric, lining and interlining. Blackout and thermal constructions can substantially increase the total." },
    { title: "Allow for construction", text: "Hems, headings, seams, overlaps, hooks and workroom construction add weight beyond the flat material calculation." },
    { title: "Add motor planning headroom", text: "Use a sensible margin and account for bends before comparing the planning load with the motor limits." },
  ], related: ["/tools/curtain-weight-motor-selector", "/motorised-curtain-tracks/heavy-curtains", "/motorised-curtain-tracks/motors"] },
  "motorised-tracks-for-bay-windows": { intro: "Bay windows are achievable, but each angle and bend adds friction and affects where the curtain stacks, where the motor sits and how the track is fixed.", sections: [
    { title: "Template the bay", text: "Measure every wall section and angle. For irregular bays, a physical template may be safer than relying on a few dimensions." },
    { title: "Count and assess bends", text: "Each bend needs a suitable radius and adds motor demand. TrackFit applies a preliminary 10% load allowance per bend." },
    { title: "Plan the curtain stack", text: "A centre-opening pair creates two stacks; a one-way curtain creates one larger stack. Both affect usable glass and motor position." },
    { title: "Confirm the fixing structure", text: "Bay ceilings frequently change construction around lintels and window zones, so the fixing route must be checked before production." },
  ], related: ["/motorised-curtain-tracks/bay-windows", "/motorised-curtain-tracks/curved-tracks", "/motorised-curtain-tracks/shuttle-ion"] },
  "battery-vs-mains-powered-curtains": { intro: "Battery and mains-powered tracks solve different problems. The right choice depends on load, track length, bends, charging access and the desired controls.", sections: [
    { title: "When battery makes sense", text: "A rechargeable motor can avoid opening walls or ceilings where no power point exists near the track." },
    { title: "Battery limits matter", text: "Shuttle iOn is published for curtains up to 25 kg, straight tracks up to eight metres and suitable curved tracks with up to two bends." },
    { title: "When mains is stronger", text: "Wired systems are often better for heavier curtains, more demanding tracks, frequent operation and advanced building integration." },
    { title: "Think about long-term use", text: "Battery systems need charging access. Wired systems need correct power provision and isolation at the installation stage." },
  ], related: ["/motorised-curtain-tracks/battery-powered", "/motorised-curtain-tracks/shuttle-ion", "/motorised-curtain-tracks/installation"] },
  "motorised-tracks-for-heavy-curtains": { intro: "Heavy curtains can be motorised, but the project must be designed around the actual finished load, bends, motor headroom and structural fixing.", sections: [
    { title: "Why heavy curtains are underestimated", text: "Velvet may be combined with blackout lining, interlining, deep hems and high fullness. All layers move together." },
    { title: "Use the strongest suitable motor", text: "Shuttle M has the highest published straight-track capacity in the Shuttle range at up to 70 kg." },
    { title: "Do not ignore bends", text: "Curves add resistance. Apply the bend allowance and confirm the final system with the manufacturer or supplier." },
    { title: "The track fixing is equally important", text: "A powerful motor cannot compensate for weak ceiling support, poor bracket spacing or unsuitable fixings." },
  ], related: ["/motorised-curtain-tracks/heavy-curtains", "/motorised-curtain-tracks/shuttle-m", "/tools/curtain-weight-motor-selector"] },
  "alexa-google-home-and-homekit-curtains": { intro: "Smart-curtain compatibility is not a single yes-or-no feature. It depends on the motor, connector, dongle, smart plug and automation platform.", sections: [
    { title: "Shuttle Go is the simple connected route", text: "Built-in Wi-Fi and Bluetooth support Forest Connect without a separate Wi-Fi dongle." },
    { title: "Other motors may need accessories", text: "A Wi-Fi dongle, Wireless Connector, smart plug or third-party controller may be needed depending on the chosen motor and platform." },
    { title: "Voice control follows the platform", text: "Alexa, Google Home and Apple ecosystems use different integration pathways. Confirm the intended platform before ordering." },
    { title: "Complex homes need coordination", text: "For Control4, Crestron, KNX, Loxone or similar projects, involve the automation engineer during specification." },
  ], related: ["/motorised-curtain-tracks/smart-home", "/motorised-curtain-tracks/controls", "/motorised-curtain-tracks/shuttle-go"] },
  "recessed-tracks-for-new-builds": { intro: "A recessed motorised track can look exceptional, but the recess, support, motor position, power and access must be coordinated before ceilings are closed.", sections: [
    { title: "Choose the track before forming the recess", text: "The profile dimensions and fixing method determine the recess detail. Do not leave the decision until after plastering." },
    { title: "Provide continuous support", text: "The track needs reliable structure along the full route, not isolated plasterboard fixings." },
    { title: "Place power at the motor", text: "Agree the motor side, cable route, isolation and control wiring with the electrician." },
    { title: "Retain service access", text: "The motor and control components need to remain accessible after decoration and curtain installation." },
  ], related: ["/motorised-curtain-tracks/recessed-tracks", "/motorised-curtain-tracks/new-builds", "/motorised-curtain-tracks/fms-plus"] },
  "hotel-motorised-curtain-systems": { intro: "Hotels need quiet movement, repeatable room details, reliable blackout and controls that work for guests and operations teams.", sections: [
    { title: "Blackout is a system", text: "Track position, curtain width, side returns, overlaps and fabric all affect light leakage." },
    { title: "FMS Dual", text: "The dual-channel system uses one motor to operate both channels and creates an adjustable overlap for improved blackout." },
    { title: "Standardise room types", text: "Schedules by room type improve procurement, production, installation and maintenance across the project." },
    { title: "Coordinate controls", text: "Decide whether curtains use local remote control, wall controls, room-management integration or central building controls." },
  ], related: ["/motorised-curtain-tracks/hotels", "/motorised-curtain-tracks/hotel-blackout", "/motorised-curtain-tracks/commercial"] },
  "centre-opening-vs-one-way-curtains": { intro: "Opening direction changes curtain stack, motor position, symmetry and how much glass remains clear when curtains are open.", sections: [
    { title: "Centre opening", text: "A pair meets in the centre and stacks at both ends. This often looks balanced and reduces the stack at each side." },
    { title: "One-way draw", text: "A single curtain stacks to one side. It can keep one side clear but creates a larger single stack." },
    { title: "Motor and power position", text: "The selected draw direction influences where the motor is placed and where power should be provided." },
    { title: "Room use decides", text: "Doors, furniture, views, controls and access may matter more than visual symmetry." },
  ], related: ["/motorised-curtain-tracks/fms", "/motorised-curtain-tracks/installation", "/motorised-curtain-tracks/track-systems"] },
  "motorised-curtains-during-a-power-cut": { intro: "A power interruption does not necessarily leave curtains permanently stuck. Many Shuttle systems include emergency manual operation, but the exact behaviour depends on the motor.", sections: [
    { title: "Emergency manual control", text: "Selected Shuttle motors use an automatic declutch or emergency-control function so the curtain can be moved manually during a power failure." },
    { title: "Touch Control is different", text: "Touch Control starts powered movement after a gentle pull. It is not the same as manual emergency operation." },
    { title: "Battery systems", text: "A charged Shuttle iOn can continue operating independently of a household mains outage, subject to battery state." },
    { title: "Confirm critical applications", text: "For hotels, healthcare or essential access routes, confirm the failure behaviour and operating procedure during specification." },
  ], related: ["/motorised-curtain-tracks/controls", "/motorised-curtain-tracks/shuttle-ion", "/motorised-curtain-tracks/installation"] },
};

export default async function MotorisedArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  const details = articleDetails[slug];
  if (!article || !details) notFound();
  const [, title, summary] = article;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: title, description: summary, datePublished: "2026-09-01", dateModified: "2026-09-01", author: { "@type": "Organization", name: "TrackFit" }, publisher: { "@type": "Organization", name: "TrackFit" }, mainEntityOfPage: absoluteUrl(`/articles/motorised-curtain-tracks/${slug}`) };

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Motorised curtain tracks", path: "/motorised-curtain-tracks" }, { name: title, path: `/articles/motorised-curtain-tracks/${slug}` }]} />
      <SiteHeader />
      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <article>
          <header className="border-b border-white/10"><div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">TrackFit motorised curtain guide · September 2026</p><h1 className="mt-5 text-5xl font-semibold leading-[0.97] tracking-[-0.05em] sm:text-6xl lg:text-7xl">{title}</h1><p className="mt-7 text-lg leading-8 text-[#C8C8C1] sm:text-xl">{summary}</p></div></header>
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24"><p className="text-xl leading-9 text-[#D8D8D0]">{details.intro}</p><div className="mt-12 grid gap-6">{details.sections.map((section, index) => <section key={section.title} className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7 sm:p-9"><p className="text-sm font-bold text-[#B8F23D]">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{section.title}</h2><p className="mt-5 text-lg leading-8 text-[#AAACA4]">{section.text}</p></section>)}</div>
            <section className="mt-12 rounded-[32px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.08] p-7 sm:p-9"><h2 className="text-3xl font-semibold">Turn the guide into a project specification.</h2><p className="mt-4 leading-8 text-[#C8C8C1]">Use TrackFit’s separate weight calculator for a preliminary load, then send the dimensions, photos, fixing details and control requirements for review.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/tools/curtain-weight-motor-selector" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">Calculate curtain weight</Link><Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold">Request a survey</Link></div></section>
            <section className="mt-12"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B8F23D]">Related system pages</p><div className="mt-6 grid gap-4 sm:grid-cols-3">{details.related.map((href) => <Link key={href} href={href} className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5 font-semibold text-[#C8C8C1] transition hover:border-[#B8F23D]/35 hover:text-[#B8F23D]">Continue reading →</Link>)}</div></section>
            <p className="mt-12 text-sm leading-7 text-white/45">This guide provides preliminary planning information. Final motor, track, controls, electrical provision and installation details must be confirmed for the exact project and current manufacturer specification.</p>
          </div>
        </article>
      </main>
    </>
  );
}
