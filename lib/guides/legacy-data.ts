import type {
  Guide,
  GuideCategoryDefinition,
} from "./types";

export const guideCategories: GuideCategoryDefinition[] = [
  {
    slug: "choosing",
    title: "Choosing a Track",
    description:
      "Compare track types, materials, headings and mounting options before you buy.",
  },
  {
    slug: "measuring",
    title: "Measuring & Planning",
    description:
      "Plan track width, curtain stack, projection and clearances before installation.",
  },
  {
    slug: "installation",
    title: "Installation",
    description:
      "Understand fixings, surfaces, track joins and the details that make a secure fit.",
  },
  {
    slug: "windows",
    title: "Window Types",
    description:
      "Practical advice for bays, corners, bifold doors, sliding doors and unusual glazing.",
  },
  {
    slug: "rooms",
    title: "Rooms & Spaces",
    description:
      "Choose tracks around how each room is used, furnished and heated.",
  },
  {
    slug: "commercial",
    title: "Commercial",
    description:
      "Track planning for hotels, offices, schools, clinics and other commercial settings.",
  },
  {
    slug: "repairs",
    title: "Repairs & Problems",
    description:
      "Diagnose sticking gliders, loose fixings, sagging tracks and failed installations.",
  },
];

export const guides: Guide[] = [
  {
    slug: "what-type-of-curtain-track-do-i-need",
    title: "What Type of Curtain Track Do I Need?",
    eyebrow: "Choosing a track",
    summary:
      "A practical guide to choosing the right curtain track for your window, curtain weight, heading style and fixing surface.",
    metaTitle:
      "What Type of Curtain Track Do I Need? | TrackFit",
    metaDescription:
      "Choose the right curtain track for heavy curtains, wave headings, bay windows, bifold doors and ceiling or wall mounting.",
    category: "choosing",
    readTime: "9 min read",
    updatedAt: "25 July 2026",
    quickAnswer:
      "The right curtain track depends on five things: curtain weight, window shape, heading style, fixing surface and how far the curtains must project from the wall. Aluminium tracks are usually the best all-round option because they are stronger, smoother and available in straight, curved, wall-mounted and ceiling-mounted systems.",
    sections: [
      {
        id: "start-with-the-window",
        title: "Start with the window, not the track",
        paragraphs: [
          "Before comparing brands or profiles, look at the shape and surroundings of the window. A straight bedroom window has very different requirements from a bay, a full wall of glazing or bifold doors.",
          "Check whether the curtains need to clear handles, radiators, deep sills, blinds or furniture. These details determine the track position and bracket projection.",
        ],
        bullets: [
          "Straight windows usually suit a standard aluminium track.",
          "Bay and corner windows may need a bendable or custom-curved track.",
          "Bifold and sliding doors often need a longer ceiling-mounted track.",
          "Floor-to-ceiling glazing needs careful stack-back planning.",
        ],
      },
      {
        id: "curtain-weight",
        title: "Match the track to the curtain weight",
        paragraphs: [
          "Light voiles place very little load on a track. Interlined curtains, velvet, blackout linings and extra-wide drops can be much heavier.",
          "A stronger track will not compensate for weak fixings. The track, brackets, screws and fixing surface must work together as one system.",
        ],
        callout: {
          title: "Installer advice",
          text: "For heavy curtains, prioritise a strong aluminium profile, closer bracket spacing and a secure fixing into timber, masonry or a suitable ceiling support.",
        },
      },
      {
        id: "ceiling-or-wall",
        title: "Choose between ceiling and wall mounting",
        paragraphs: [
          "Ceiling-mounted tracks create a clean, full-height finish and work particularly well across wide glazing, in new-build homes and where there is little space above the window.",
          "Wall-mounted tracks are useful when the ceiling is unsuitable or when extra projection is needed to clear blinds, handles or deep sills.",
        ],
        bullets: [
          "Choose ceiling mounting for a minimal, hotel-style finish.",
          "Choose wall mounting when you need adjustable projection.",
          "Inspect what sits behind plasterboard before deciding.",
          "Avoid positioning the track so close that curtains rub against the wall.",
        ],
      },
      {
        id: "heading-style",
        title: "Check the curtain heading",
        paragraphs: [
          "The heading affects how the curtain hangs and how much space it needs. Wave curtains need a compatible wave glider system and predictable spacing. Pencil pleat and pinch pleat curtains can work on many standard tracks, provided suitable gliders and hooks are used.",
        ],
        bullets: [
          "Wave curtains need a dedicated wave track or wave glider cord.",
          "Pinch pleat curtains need enough projection to hold their shape.",
          "Pencil pleat curtains are flexible but can become bulky when stacked.",
          "Voiles and main curtains usually need separate tracks.",
        ],
      },
      {
        id: "material",
        title: "Plastic or aluminium?",
        paragraphs: [
          "Plastic tracks can be suitable for light curtains and simple windows, but aluminium is normally the better long-term choice for professional installations.",
          "Aluminium profiles are generally more rigid, glide more smoothly and cope better with longer spans, heavier curtains and custom bends.",
        ],
      },
      {
        id: "common-scenarios",
        title: "Common situations and suitable track types",
        bullets: [
          "Standard bedroom window: straight aluminium track.",
          "Heavy lined living-room curtains: heavy-duty aluminium track.",
          "Bay window: bendable or made-to-measure curved track.",
          "Curtains and voiles: double track or two separately spaced tracks.",
          "Bifold doors: long ceiling-mounted track with enough stack-back.",
          "Hotel or commercial space: durable contract-grade track.",
        ],
      },
      {
        id: "mistakes",
        title: "Common mistakes to avoid",
        bullets: [
          "Buying a track before checking the fixing surface.",
          "Ignoring the total weight of both curtains.",
          "Leaving too little room for curtain stack-back.",
          "Mounting too close to handles, blinds or a window sill.",
          "Using a standard track with wave curtains.",
          "Assuming plasterboard plugs are suitable for every ceiling.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are aluminium curtain tracks better than plastic tracks?",
        answer:
          "For most permanent installations, aluminium is the stronger and more versatile option. Plastic can work for lightweight curtains, but aluminium is usually better for long spans, heavier curtains and curved systems.",
      },
      {
        question: "Can the same track hold curtains and voiles?",
        answer:
          "Not usually on the same channel. Curtains and voiles need to move independently, so a double track or two separately mounted tracks is normally required.",
      },
      {
        question: "Do wave curtains need a special track?",
        answer:
          "Yes. Wave curtains need compatible gliders connected at fixed intervals so the folds remain even when the curtains are open or closed.",
      },
      {
        question: "Can a curtain track be fitted to plasterboard?",
        answer:
          "It can, but the correct method depends on what sits behind the plasterboard and the curtain weight. Heavy curtains may require fixing into joists, noggins or another structural support.",
      },
      {
        question: "What is the best track for heavy curtains?",
        answer:
          "A heavy-duty aluminium track with suitable brackets and secure structural fixings is usually best. Bracket spacing and the substrate matter as much as the track profile.",
      },
      {
        question: "Should a curtain track be wider than the window?",
        answer:
          "Usually, yes. Extending beyond the window allows the curtains to stack away from the glass and helps reduce light gaps. The exact allowance depends on curtain fullness and available wall space.",
      },
    ],
    relatedGuides: [
      "ceiling-vs-wall-mounted-curtain-tracks",
      "best-curtain-tracks-for-heavy-curtains",
      "how-to-measure-for-a-curtain-track",
      "curtain-tracks-for-bay-windows",
    ],
    serviceLink: {
      label: "Residential track installation",
      href: "/services/residential-curtain-track-installation",
    },
  },
  {
    slug: "ceiling-vs-wall-mounted-curtain-tracks",
    title: "Ceiling-Mounted vs Wall-Mounted Curtain Tracks",
    eyebrow: "Choosing a track",
    summary:
      "Compare appearance, projection, fixing strength and suitability before choosing where to mount your track.",
    metaTitle:
      "Ceiling vs Wall-Mounted Curtain Tracks | TrackFit",
    metaDescription:
      "Compare ceiling-mounted and wall-mounted curtain tracks, including appearance, projection, fixings and suitability.",
    category: "choosing",
    readTime: "7 min read",
    updatedAt: "25 July 2026",
    quickAnswer:
      "Ceiling-mounted tracks create a cleaner, full-height finish and are ideal for wide glazing. Wall-mounted tracks are better when adjustable projection is needed or the ceiling cannot provide a secure fixing.",
    sections: [
      {
        id: "ceiling-mounted",
        title: "When ceiling mounting works best",
        paragraphs: [
          "Ceiling mounting keeps the track visually discreet and can make a room feel taller. It is especially useful for curtains that run across a large section of wall.",
        ],
        bullets: [
          "Clean, minimal appearance",
          "Useful above bifold or sliding doors",
          "Good for full-height curtains",
          "Can reduce visible gaps above the curtain",
        ],
      },
      {
        id: "wall-mounted",
        title: "When wall mounting works best",
        paragraphs: [
          "Wall brackets allow the track to project forward. This is useful when curtains must clear blinds, handles, radiators or deep window sills.",
        ],
      },
      {
        id: "fixing-surface",
        title: "The fixing surface decides what is safe",
        paragraphs: [
          "A visually attractive position is not always a structurally suitable one. Check for timber, masonry, concrete, steel or unsupported plasterboard before finalising the mounting position.",
        ],
      },
      {
        id: "decision",
        title: "A simple way to decide",
        bullets: [
          "Choose ceiling mounting for a seamless, full-height finish.",
          "Choose wall mounting for greater projection control.",
          "Choose the surface that provides the safest fixing.",
          "Plan around curtain weight and stack-back, not appearance alone.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do ceiling-mounted curtains make a room look taller?",
        answer:
          "They often do because the curtains begin at ceiling level and create an uninterrupted vertical line.",
      },
      {
        question: "Can a wall-mounted track hold heavy curtains?",
        answer:
          "Yes, provided the track, brackets and wall fixings are suitable for the load.",
      },
      {
        question: "Can a ceiling track be fitted over blinds?",
        answer:
          "Yes, but enough projection must be allowed so the curtains clear the blind and its controls.",
      },
      {
        question: "Which option is better for bifold doors?",
        answer:
          "Ceiling mounting is often the neatest solution because it can span the full opening without relying on limited wall space above the frame.",
      },
    ],
    relatedGuides: [
      "what-type-of-curtain-track-do-i-need",
      "how-to-measure-for-a-curtain-track",
      "fitting-curtain-tracks-to-plasterboard",
      "curtain-tracks-for-bifold-doors",
    ],
    serviceLink: {
      label: "Explore residential installation",
      href: "/services/residential-curtain-track-installation",
    },
  },
  {
    slug: "best-curtain-tracks-for-heavy-curtains",
    title: "Best Curtain Tracks for Heavy Curtains",
    eyebrow: "Choosing a track",
    summary:
      "How to choose a track, bracket spacing and fixing method for lined, interlined and heavyweight curtains.",
    metaTitle:
      "Best Curtain Tracks for Heavy Curtains | TrackFit",
    metaDescription:
      "Choose a strong curtain track for velvet, blackout and interlined curtains, with advice on fixings and bracket spacing.",
    category: "choosing",
    readTime: "7 min read",
    updatedAt: "25 July 2026",
    quickAnswer:
      "Heavy curtains normally need a rigid aluminium track, closer support spacing and secure structural fixings. The strongest track can still fail if it is attached to an unsuitable surface.",
    sections: [
      {
        id: "what-makes-curtains-heavy",
        title: "What makes curtains heavy?",
        bullets: [
          "Interlining",
          "Blackout lining",
          "Velvet or dense upholstery fabrics",
          "Extra-wide windows",
          "Long drops",
          "High fullness",
        ],
      },
      {
        id: "track-profile",
        title: "Choose a rigid track profile",
        paragraphs: [
          "A heavy-duty aluminium profile resists twisting and sagging better than lightweight plastic systems. Long tracks may also need additional brackets or suspension points.",
        ],
      },
      {
        id: "fixings",
        title: "Fixings are part of the system",
        paragraphs: [
          "Track strength, bracket spacing and substrate must be considered together. For very heavy curtains, structural timber, masonry or concrete is preferable to unsupported board.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can plastic tracks hold heavy curtains?",
        answer:
          "Some are rated for moderate loads, but aluminium is usually the safer choice for heavy, wide or interlined curtains.",
      },
      {
        question: "How close should brackets be for heavy curtains?",
        answer:
          "Spacing depends on the track system and substrate. Heavy curtains generally need closer support than lightweight curtains, following the manufacturer's loading guidance.",
      },
      {
        question: "Can heavy curtains be ceiling mounted?",
        answer:
          "Yes, if the ceiling provides a suitable structural fixing and the track is designed for the load.",
      },
    ],
    relatedGuides: [
      "what-type-of-curtain-track-do-i-need",
      "fitting-curtain-tracks-to-plasterboard",
      "curtain-track-keeps-falling-down",
      "ceiling-vs-wall-mounted-curtain-tracks",
    ],
    serviceLink: {
      label: "Get installation advice",
      href: "/quote/postcode",
    },
  },
  {
    slug: "how-to-measure-for-a-curtain-track",
    title: "How to Measure for a Curtain Track",
    eyebrow: "Measuring & planning",
    summary:
      "Measure track width, overlap, projection and stack-back before ordering or arranging installation.",
    metaTitle:
      "How to Measure for a Curtain Track | TrackFit",
    metaDescription:
      "Learn how to measure curtain track width, overlap, projection and stack-back for a professional installation.",
    category: "measuring",
    readTime: "8 min read",
    updatedAt: "25 July 2026",
    quickAnswer:
      "Measure the window width, then add enough track beyond each side for light control and curtain stack-back. Also measure the required projection so the curtains clear handles, blinds, radiators and sills.",
    sections: [
      {
        id: "width",
        title: "Measure the window width",
        paragraphs: [
          "Measure the full opening and note any wall restrictions on either side. Do not assume both sides have equal space.",
        ],
      },
      {
        id: "overlap",
        title: "Add side overlap",
        paragraphs: [
          "Extending the track beyond the window helps reduce light gaps and allows the curtains to stack away from the glass.",
        ],
      },
      {
        id: "projection",
        title: "Measure projection",
        bullets: [
          "Window handles",
          "Blinds",
          "Radiators",
          "Deep sills",
          "Existing poles or pelmets",
        ],
      },
      {
        id: "photos",
        title: "Take useful photos",
        paragraphs: [
          "Photograph the full wall, ceiling, window head and any obstructions. Wider context is often more useful than a close-up alone.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much wider should a track be than the window?",
        answer:
          "It depends on curtain fullness and available space. The goal is to provide adequate overlap and stack-back without colliding with adjacent walls or furniture.",
      },
      {
        question: "Do I measure the track or the window?",
        answer:
          "Start with the window, then calculate the finished track width after adding the required overlap on both sides.",
      },
      {
        question: "Should I measure at ceiling height?",
        answer:
          "Yes, when planning a ceiling-mounted track. Wall widths and obstructions can differ at ceiling level.",
      },
    ],
    relatedGuides: [
      "what-type-of-curtain-track-do-i-need",
      "ceiling-vs-wall-mounted-curtain-tracks",
      "curtain-tracks-for-bay-windows",
      "curtain-track-installation-cost",
    ],
    serviceLink: {
      label: "Start your quote",
      href: "/quote/postcode",
    },
  },
  {
    slug: "curtain-tracks-for-bay-windows",
    title: "Curtain Tracks for Bay Windows",
    eyebrow: "Window types",
    summary:
      "Choose, measure and position a track for angled, curved and multi-sided bay windows.",
    metaTitle:
      "Curtain Tracks for Bay Windows | TrackFit",
    metaDescription:
      "A practical guide to curtain tracks for angled and curved bay windows, including measuring, bends and fixing options.",
    category: "windows",
    readTime: "9 min read",
    updatedAt: "25 July 2026",
    quickAnswer:
      "Bay windows usually need either a bendable aluminium track or a made-to-measure curved track. The right choice depends on the bay shape, curtain weight, fixing surface and whether the curtains must pass smoothly around the corners.",
    sections: [
      {
        id: "bay-shape",
        title: "Identify the bay shape",
        bullets: [
          "Three-sided angled bay",
          "Five-sided bay",
          "Shallow curved bay",
          "Square bay",
          "Asymmetrical bay",
        ],
      },
      {
        id: "track-choice",
        title: "Bendable or custom curved?",
        paragraphs: [
          "Bendable tracks suit many domestic bays, while factory-curved tracks can give a more controlled radius and smoother finish for demanding installations.",
        ],
      },
      {
        id: "mounting",
        title: "Ceiling or wall mounting",
        paragraphs: [
          "Ceiling mounting often follows the bay more neatly. Wall mounting may be required when the ceiling is unsuitable or additional projection is needed.",
        ],
      },
      {
        id: "mistakes",
        title: "Bay-window mistakes to avoid",
        bullets: [
          "Measuring only the front width",
          "Ignoring corner angles",
          "Forgetting curtain stack-back",
          "Using too few brackets",
          "Creating bends that are too tight",
        ],
      },
    ],
    faqs: [
      {
        question: "Can one curtain track go around a bay window?",
        answer:
          "Yes, many tracks can be bent or manufactured to follow the full bay, allowing the curtains to travel around the corners.",
      },
      {
        question: "Do bay-window tracks need special gliders?",
        answer:
          "They need gliders that move smoothly through bends. Compatibility depends on the chosen track system.",
      },
      {
        question: "Can heavy curtains be used in a bay window?",
        answer:
          "Yes, but the track profile, bend radius, bracket spacing and fixing surface must all be suitable for the load.",
      },
    ],
    relatedGuides: [
      "how-to-measure-for-a-curtain-track",
      "what-type-of-curtain-track-do-i-need",
      "best-curtain-tracks-for-heavy-curtains",
      "ceiling-vs-wall-mounted-curtain-tracks",
    ],
    serviceLink: {
      label: "Residential bay track fitting",
      href: "/services/residential-curtain-track-installation",
    },
  },
  {
    slug: "fitting-curtain-tracks-to-plasterboard",
    title: "Can Curtain Tracks Be Fitted to Plasterboard?",
    eyebrow: "Installation",
    summary:
      "Understand when plasterboard fixings are suitable and when structural support is required.",
    metaTitle:
      "Can Curtain Tracks Be Fitted to Plasterboard? | TrackFit",
    metaDescription:
      "Advice on fitting curtain tracks to plasterboard walls and ceilings, including fixings, joists and heavy curtains.",
    category: "installation",
    readTime: "8 min read",
    updatedAt: "25 July 2026",
    quickAnswer:
      "Curtain tracks can be fitted to plasterboard, but the safe method depends on curtain weight, board condition and what sits behind it. Heavy curtains should ideally be fixed into timber, masonry or another structural support rather than relying on the board alone.",
    sections: [
      {
        id: "behind-board",
        title: "Find out what is behind the plasterboard",
        paragraphs: [
          "The visible board is only part of the fixing. There may be timber joists, metal framing, masonry, a void or a reinforced pattress behind it.",
        ],
      },
      {
        id: "weight",
        title: "Curtain weight changes the answer",
        paragraphs: [
          "A lightweight voile and a pair of interlined velvet curtains place very different loads on the fixing points.",
        ],
      },
      {
        id: "warning-signs",
        title: "Warning signs",
        bullets: [
          "Track pulling away from the ceiling",
          "Cracked plaster around screws",
          "Loose brackets",
          "Track sagging between supports",
          "Fixings spinning without tightening",
        ],
      },
    ],
    faqs: [
      {
        question: "Are plasterboard plugs strong enough for curtain tracks?",
        answer:
          "They may be suitable for some lightweight installations, but suitability depends on the specific fixing, board, track and curtain load.",
      },
      {
        question: "Should curtain tracks be fixed into joists?",
        answer:
          "For heavy curtains or high-load installations, fixing into structural timber is often preferable where accessible.",
      },
      {
        question: "Can a failed plasterboard fixing be repaired?",
        answer:
          "Often, yes. The track may need to be repositioned, fixed into structure or installed using a more appropriate support method.",
      },
    ],
    relatedGuides: [
      "best-curtain-tracks-for-heavy-curtains",
      "curtain-track-keeps-falling-down",
      "ceiling-vs-wall-mounted-curtain-tracks",
      "what-type-of-curtain-track-do-i-need",
    ],
    serviceLink: {
      label: "Ask about professional fitting",
      href: "/quote/postcode",
    },
  },
  {
    slug: "curtain-tracks-for-bifold-doors",
    title: "Curtain Tracks for Bifold Doors",
    eyebrow: "Window types",
    summary:
      "Plan a long, clear-running track for bifold doors without obstructing handles or the opening mechanism.",
    metaTitle:
      "Curtain Tracks for Bifold Doors | TrackFit",
    metaDescription:
      "Choose and position curtain tracks for bifold doors, including ceiling mounting, projection and stack-back.",
    category: "windows",
    readTime: "7 min read",
    updatedAt: "25 July 2026",
    quickAnswer:
      "Bifold doors usually work best with a ceiling-mounted aluminium track spanning the full opening. The key issues are projection, handle clearance and enough side space for the curtains to stack away from the doors.",
    sections: [
      {
        id: "span",
        title: "Plan the full span",
        paragraphs: [
          "The track often needs to cover the complete door opening rather than only the glazed section.",
        ],
      },
      {
        id: "clearance",
        title: "Allow for handles and door movement",
        bullets: [
          "Check handle projection",
          "Check blind cassettes",
          "Check door folding direction",
          "Check ceiling features and lighting",
        ],
      },
      {
        id: "stack",
        title: "Protect the opening with proper stack-back",
        paragraphs: [
          "Without enough side space, the curtains may cover part of the opening even when fully drawn.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can curtains cover the full width of bifold doors?",
        answer:
          "Yes. A correctly sized track can span the complete opening and allow the curtains to close across it.",
      },
      {
        question: "Are ceiling tracks best for bifold doors?",
        answer:
          "They are often the neatest option, particularly where there is little wall above the frame.",
      },
      {
        question: "Can wave curtains be used with bifold doors?",
        answer:
          "Yes, provided a compatible wave track is used and enough stack-back is available.",
      },
    ],
    relatedGuides: [
      "ceiling-vs-wall-mounted-curtain-tracks",
      "how-to-measure-for-a-curtain-track",
      "what-type-of-curtain-track-do-i-need",
      "best-curtain-tracks-for-heavy-curtains",
    ],
    serviceLink: {
      label: "Get a bifold-door track quote",
      href: "/quote/postcode",
    },
  },
  {
    slug: "curtain-track-installation-cost",
    title: "How Much Does Curtain Track Installation Cost?",
    eyebrow: "Measuring & planning",
    summary:
      "Understand the main factors that affect professional curtain track fitting costs.",
    metaTitle:
      "Curtain Track Installation Cost Guide | TrackFit",
    metaDescription:
      "Learn what affects curtain track installation costs, including track type, length, fixing surface and access.",
    category: "measuring",
    readTime: "6 min read",
    updatedAt: "25 July 2026",
    quickAnswer:
      "Curtain track installation cost depends on track length, number of windows, track type, fixing surface, curtain weight, access height and whether the track needs bending, joining or supplying. Photos and measurements usually allow a more accurate quotation.",
    sections: [
      {
        id: "factors",
        title: "What affects the price?",
        bullets: [
          "Number and length of tracks",
          "Ceiling or wall mounting",
          "Straight, bay or curved tracks",
          "Fixing surface",
          "Access height",
          "Track supply",
          "Removal of existing fittings",
        ],
      },
      {
        id: "quote",
        title: "What to provide for an accurate quote",
        bullets: [
          "Postcode",
          "Approximate track lengths",
          "Room and window photos",
          "Track type, if already purchased",
          "Ceiling height",
          "Any access restrictions",
        ],
      },
    ],
    faqs: [
      {
        question: "Is track supply included in installation?",
        answer:
          "It depends on the quotation. Some customers provide their own tracks, while others need a supply-and-fit service.",
      },
      {
        question: "Do bay-window tracks cost more to fit?",
        answer:
          "They often do because measuring, bending, joining and supporting the track can take more time than a simple straight installation.",
      },
      {
        question: "Can I get a quote from photos?",
        answer:
          "In many cases, clear photos and approximate measurements provide enough information for an initial quotation.",
      },
    ],
    relatedGuides: [
      "how-to-measure-for-a-curtain-track",
      "what-type-of-curtain-track-do-i-need",
      "curtain-tracks-for-bay-windows",
      "fitting-curtain-tracks-to-plasterboard",
    ],
    serviceLink: {
      label: "Request an installation quote",
      href: "/quote/postcode",
    },
  },
  {
    slug: "curtain-track-keeps-falling-down",
    title: "Why Does My Curtain Track Keep Falling Down?",
    eyebrow: "Repairs & problems",
    summary:
      "The most common reasons curtain tracks pull away from walls or ceilings and how to fix the underlying cause.",
    metaTitle:
      "Why Does My Curtain Track Keep Falling Down? | TrackFit",
    metaDescription:
      "Find out why curtain tracks pull away from ceilings or walls, including weak fixings, heavy curtains and poor bracket spacing.",
    category: "repairs",
    readTime: "7 min read",
    updatedAt: "25 July 2026",
    quickAnswer:
      "Curtain tracks usually fall because the fixing surface, screws, plugs or bracket spacing are unsuitable for the curtain load. Reusing the same damaged holes rarely solves the problem.",
    sections: [
      {
        id: "causes",
        title: "The most common causes",
        bullets: [
          "Fixings used in unsupported plasterboard",
          "Curtains heavier than the system was designed for",
          "Too few brackets",
          "Damaged or enlarged screw holes",
          "Track mounted too far from the wall",
          "Repeated pulling or snagging",
        ],
      },
      {
        id: "repair",
        title: "Repair the cause, not just the hole",
        paragraphs: [
          "A lasting repair may require repositioning the brackets, fixing into structure, adding supports or replacing an undersized track.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I screw the track back into the same holes?",
        answer:
          "Not if the holes or surrounding material have failed. The repair needs a sound fixing point or a different support method.",
      },
      {
        question: "Does a falling track mean the curtains are too heavy?",
        answer:
          "Possibly, but failure can also come from poor fixings, wide bracket spacing or a weak substrate.",
      },
      {
        question: "Can the existing track be reused?",
        answer:
          "Sometimes. If the profile and brackets are undamaged and correctly rated, the main issue may be the fixing method.",
      },
    ],
    relatedGuides: [
      "fitting-curtain-tracks-to-plasterboard",
      "best-curtain-tracks-for-heavy-curtains",
      "what-type-of-curtain-track-do-i-need",
      "ceiling-vs-wall-mounted-curtain-tracks",
    ],
    serviceLink: {
      label: "Request a repair quote",
      href: "/quote/postcode",
    },
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getRelatedGuides(slugs: string[]) {
  return slugs
    .map((slug) => getGuide(slug))
    .filter((guide): guide is Guide => Boolean(guide));
}
