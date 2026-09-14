export type PricingGuide = {
  slug: string;
  eyebrow: string;
  title: string;
  price: string;
  unit: string;
  description: string;
  includes: string[];
  bestFor: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const pricingGuides: PricingGuide[] = [
  {
    slug: "installation-only",
    eyebrow: "Installation only",
    title: "Single straight track",
    price: "£145 to £275",
    unit: "typical project range",
    description:
      "Professional fitting of one suitable customer-supplied straight track in a standard-height room.",
    includes: [
      "Track position and fixing-line check",
      "Wall or ceiling installation",
      "Final alignment and movement test",
    ],
    bestFor: "A straightforward bedroom, lounge or home-office window.",
    image: "/images/hero/trackfit-entry-poster.jpeg",
    imageAlt: "Neatly installed ceiling curtain tracks above a window",
  },
  {
    slug: "forest-ks-supply-fit",
    eyebrow: "Supply and installation",
    title: "Forest KS straight track",
    price: "£295 to £575",
    unit: "typical project range",
    description:
      "A made-to-measure Forest KS aluminium track supplied, prepared and installed for light to medium curtains.",
    includes: [
      "Forest KS track and standard components",
      "Cutting and preparation",
      "Professional wall or ceiling fitting",
    ],
    bestFor: "Customers who want the complete track supplied and fitted.",
    image: "/images/showcase/forest/ks-profile.webp",
    imageAlt: "Forest KS white aluminium curtain track and gliders",
    featured: true,
  },
  {
    slug: "bay-curved",
    eyebrow: "Specialist shaping",
    title: "Bay or curved track",
    price: "£475 to £950",
    unit: "typical project range",
    description:
      "A shaped manual aluminium track planned around the bay angles, fixing line and curtain stack.",
    includes: [
      "Bay measurements and route review",
      "Track bending or shaped preparation",
      "Installation and full travel test",
    ],
    bestFor: "Three-sided bays, continuous curves and corner windows.",
    image: "/images/gallery/forest/curved-office-divider.webp",
    imageAlt: "Curved Forest curtain track creating a bright room divider",
  },
  {
    slug: "double-track",
    eyebrow: "Layered curtains",
    title: "Double track system",
    price: "£575 to £1,150",
    unit: "typical project range",
    description:
      "Two coordinated tracks for independently operating voile and main curtains, with suitable spacing and projection.",
    includes: [
      "Front and rear track planning",
      "Projection and heading clearance",
      "Supply, installation and testing",
    ],
    bestFor: "Voile with blackout, lined or decorative front curtains.",
    image: "/images/showcase/forest/hotel-curtains.webp",
    imageAlt: "Layered curtains in a contemporary dining and hospitality setting",
    featured: true,
  },
  {
    slug: "high-wide",
    eyebrow: "Complex access",
    title: "High or extra-wide installation",
    price: "£650 to £1,800+",
    unit: "typical project range",
    description:
      "Specialist fitting for tall rooms, long spans, heavy curtains or projects requiring access equipment and additional support.",
    includes: [
      "Access and fixing strategy",
      "Load, join and support planning",
      "Specialist installation and testing",
    ],
    bestFor: "Double-height rooms, wide glazing and heavier curtain packages.",
    image: "/images/showcase/forest/dsxl-hotel.webp",
    imageAlt: "Full-height curtains fitted in a contemporary hotel room",
  },
  {
    slug: "motorised",
    eyebrow: "Motorised system",
    title: "Forest motorised track",
    price: "£1,450 to £4,500+",
    unit: "typical project range",
    description:
      "A professionally specified Forest motor, track and control package supplied, installed and commissioned.",
    includes: [
      "Curtain-weight and track review",
      "Motor, controls and power planning",
      "Supply, fitting and commissioning",
    ],
    bestFor: "Large curtains, smart homes, recessed details and premium projects.",
    image: "/images/motorised/forest/shuttle-motor-range.png",
    imageAlt: "Forest Shuttle motorised curtain track motor range",
  },
];

export const priceFactors = [
  {
    title: "Track and curtain load",
    text: "The profile, carrier type, curtain weight and number of layers determine the system required.",
  },
  {
    title: "Shape and total length",
    text: "Bays, reverse bends, corners, long spans and joins need more planning and preparation.",
  },
  {
    title: "Fixing surface",
    text: "Concrete, timber, steel, plasterboard and uncertain substrates require different fixing strategies.",
  },
  {
    title: "Height and access",
    text: "Tall rooms, restricted sites, parking, permits and specialist access equipment affect labour and logistics.",
  },
];
