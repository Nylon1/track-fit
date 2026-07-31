import type { Metadata } from "next";
import Link from "next/link";

import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import SiteHeader from "@/components/site/SiteHeader";
import { createMetadata } from "@/lib/seo/metadata";

const pagePath = "/motorised-curtain-tracks/faqs";

export const metadata: Metadata = createMetadata({
  title: "Motorised Curtain Track FAQs | Motors, Controls & Installation",
  description: "Answers about motorised curtain motors, weight limits, bends, battery power, app control, recessed tracks, installation and maintenance.",
  path: pagePath,
  keywords: ["motorised curtain track FAQs", "electric curtain questions", "smart curtain installation"],
});

const groups = [
  { title: "Choosing a motor", items: [
    ["Which motorised curtain motor do I need?", "The choice depends on the finished moving curtain weight, track length, bends, opening direction, power and control requirements. The motor should retain practical headroom below its stated limit."],
    ["How much weight can Forest Shuttle motors carry?", "The published straight-track limits used in this hub are Shuttle iOn 25 kg, Shuttle Go 35 kg, Shuttle L 40 kg, Shuttle AC 40 kg and Shuttle M 70 kg."],
    ["Can heavy velvet curtains be motorised?", "Yes, where the finished curtain load and track arrangement remain within a suitable motor and fixing specification. Velvet, blackout lining and interlining must all be included in the calculation."],
    ["Does curtain fullness affect the motor?", "Yes. Greater fullness increases fabric area and weight, so it directly affects the moving load."],
    ["Should I choose a motor at its maximum limit?", "No. A system should retain planning headroom for construction variation, resistance and operating conditions."],
  ]},
  { title: "Curves and bay windows", items: [
    ["Can motorised tracks go around bends?", "Suitable Forest FMS and FMS Plus systems can be curved. The exact bend geometry and motor suitability must be confirmed before manufacture."],
    ["How do bends affect motor selection?", "TrackFit applies a preliminary 10% additional motor-load allowance per bend based on supplier guidance."],
    ["Can Shuttle iOn be used on a curved track?", "Forest publishes Shuttle iOn for suitable curved tracks with up to two bends."],
    ["Does bend radius matter?", "Yes. Radius affects track production and carrier movement. A tight or complex curve requires project-specific checking."],
    ["Can a motorised track fit a bay window?", "Yes, but the bay should be measured or templated accurately and the stack, motor position, fixing and power route planned together."],
  ]},
  { title: "Power and controls", items: [
    ["Do motorised curtains require mains power?", "Most wired motors require power near the motor position. Shuttle iOn provides a rechargeable option for suitable installations."],
    ["Can motorised curtains work with Alexa or Google Home?", "Selected configurations support voice-control pathways. The exact connector, dongle or smart plug depends on the motor and platform."],
    ["Does Shuttle Go include Wi-Fi?", "Yes. Shuttle Go includes Wi-Fi and Bluetooth and can connect to the Forest Connect app without the separate Wi-Fi dongle."],
    ["Can the curtains connect to a building-management system?", "Suitable relay and hard-wired configurations can be coordinated with building or hotel automation systems."],
    ["Can curtains open on a schedule?", "Compatible app and automation arrangements can create timed scenes and scheduled opening or closing."],
  ]},
  { title: "Installation and reliability", items: [
    ["Can motorised tracks be ceiling fixed?", "Yes, where the ceiling provides suitable continuous support and the selected bracket arrangement is appropriate."],
    ["Can the motor be hidden?", "FMS Plus Recess and inverted motor arrangements can create a cleaner detail, subject to access, ceiling and power planning."],
    ["What happens during a power cut?", "Many Shuttle systems provide emergency manual operation. The exact feature set should be confirmed for the selected motor."],
    ["Are motorised curtains noisy?", "Forest publishes quiet operating figures for the Shuttle range, but perceived sound also depends on the curtain, track, room and installation."],
    ["What maintenance is required?", "Keep the curtain travel clear, avoid pulling against obstructions and arrange inspection if operation becomes noisy, uneven or slow."],
    ["Does TrackFit install across the UK?", "TrackFit reviews projects across the UK, with final availability depending on location, scope and programme."],
  ]},
] as const;

export default function MotorisedFaqPage() {
  const allFaqs = groups.flatMap((group) => group.items.map(([question, answer]) => ({ question, answer })));
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: allFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };

  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Motorised curtain tracks", path: "/motorised-curtain-tracks" }, { name: "FAQs", path: pagePath }]} />
      <SiteHeader />
      <main className="min-h-screen bg-[#080A09] text-[#F4F1E8]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <section className="border-b border-white/10"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8F23D]">Complete answer centre</p><h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[0.97] tracking-[-0.05em] sm:text-6xl lg:text-7xl">Motorised curtain track FAQs.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-[#C8C8C1]">Straight answers about motors, curtain loads, bends, power, controls, smart homes, recessed tracks and professional installation.</p></div></section>
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="grid gap-10">{groups.map((group) => <section key={group.title}><h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{group.title}</h2><div className="mt-6 divide-y divide-white/10 rounded-[30px] border border-white/10 bg-white/[0.035] px-6">{group.items.map(([question, answer]) => <details key={question} className="py-5"><summary className="cursor-pointer text-lg font-semibold">{question}</summary><p className="pt-4 leading-7 text-[#AAACA4]">{answer}</p></details>)}</div></section>)}</div></section>
        <section className="border-t border-white/10"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10"><div className="rounded-[34px] border border-[#B8F23D]/25 bg-[#B8F23D]/[0.08] p-8 text-center"><h2 className="text-4xl font-semibold">Still unsure which system fits?</h2><p className="mx-auto mt-4 max-w-2xl leading-8 text-[#C8C8C1]">Use the weight calculator for an early load estimate or send the project details for a full system review.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/tools/curtain-weight-motor-selector" className="inline-flex min-h-12 items-center rounded-full bg-[#B8F23D] px-7 font-bold text-[#080A09]">Calculate curtain weight</Link><Link href="/quote/postcode" className="inline-flex min-h-12 items-center rounded-full border border-white/15 px-7 font-semibold">Request a survey</Link></div></div></div></section>
      </main>
    </>
  );
}
