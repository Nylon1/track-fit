import type { Area, AreaServicePage } from "./types";

export const areas: Area[] = [
  {
    slug: "blackburn",
    name: "Blackburn",
    region: "Lancashire",
    intro: "TrackFit provides curtain-track installation across Blackburn and the surrounding Lancashire area for homes, landlords, developers and commercial properties.",
    propertyFocus: [
    "Victorian and Edwardian terraces",
    "Modern housing estates and new-build homes",
    "Large family homes with bay windows and glazed extensions"
  ],
    challenges: [
    "Uneven older plaster and mixed wall construction",
    "Bay windows that need careful section-by-section planning",
    "Ceiling fixing where joist positions do not align with the preferred track line"
  ],
    commercial: [
    "Care homes and supported-living properties",
    "Offices and community venues",
    "Hotels, restaurants and serviced accommodation"
  ],
    areas: [
    "Darwen",
    "Rishton",
    "Great Harwood",
    "Accrington",
    "Rawtenstall"
  ],
    localNote: "Because TrackFit is based in Blackburn, this is one of our strongest service areas for surveys, repeat visits and multi-room installations.",
    faqs: [
      { question: "Do you fit curtain tracks across Blackburn and Darwen?", answer: "Yes. We cover Blackburn, Darwen and nearby East Lancashire towns for residential and commercial track fitting." },
      { question: "Can you fit tracks in older terraced properties?", answer: "Yes. Older walls and ceilings often need careful fixing checks, particularly where plaster condition or hidden timber is uncertain." },
      { question: "Do you install bay-window tracks in Blackburn?", answer: "Yes. We can assess bay sections, returns, mounting position and support before installation." }
    ],
  },
  {
    slug: "manchester",
    name: "Manchester",
    region: "Greater Manchester",
    intro: "TrackFit installs curtain tracks across Manchester for city-centre apartments, family homes, hotels, offices and large glazed spaces.",
    propertyFocus: [
    "City-centre apartments with full-height glazing",
    "Victorian terraces and converted townhouses",
    "New-build homes with bifold and patio doors"
  ],
    challenges: [
    "Limited fixing zones above large windows",
    "Concrete ceilings in apartment developments",
    "Access, parking and phased installation in busy buildings"
  ],
    commercial: [
    "Hotels and serviced apartments",
    "Offices and co-working spaces",
    "Restaurants, healthcare and education settings"
  ],
    areas: [
    "Salford",
    "Stockport",
    "Didsbury",
    "Chorlton",
    "Trafford"
  ],
    localNote: "Manchester projects often need careful coordination around access, concierge rules, loading times and concrete or steel construction.",
    faqs: [
      { question: "Do you fit curtain tracks in Manchester city-centre apartments?", answer: "Yes. We regularly plan ceiling and wall-mounted tracks for apartments, including full-height glazing and concrete ceilings." },
      { question: "Can you work around restricted building access?", answer: "Yes. We can plan visits around concierge access, loading restrictions and agreed installation windows." },
      { question: "Do you provide commercial curtain-track installation in Manchester?", answer: "Yes. We work with hotels, offices, healthcare settings and other commercial properties." }
    ],
  },
  {
    slug: "birmingham",
    name: "Birmingham",
    region: "West Midlands",
    intro: "TrackFit provides residential and commercial curtain-track installation across Birmingham and the wider West Midlands.",
    propertyFocus: [
    "Suburban family homes and extensions",
    "City apartments and mixed-use developments",
    "Period properties with bays and high ceilings"
  ],
    challenges: [
    "Long track runs across wide windows and doors",
    "Mixed wall and ceiling substrates",
    "Commercial projects requiring phased or out-of-hours work"
  ],
    commercial: [
    "Hotels and aparthotels",
    "Care homes and healthcare environments",
    "Offices, schools and student accommodation"
  ],
    areas: [
    "Solihull",
    "Sutton Coldfield",
    "Edgbaston",
    "Harborne",
    "Wolverhampton"
  ],
    localNote: "Birmingham's mix of large residential developments and commercial properties makes track specification, access planning and repeatable installation standards especially important.",
    faqs: [
      { question: "Do you cover Birmingham and Solihull?", answer: "Yes. We cover Birmingham, Solihull and the wider West Midlands for domestic and commercial projects." },
      { question: "Can you install tracks across large bifold doors?", answer: "Yes. We can plan track length, projection, bracket spacing and stack-back for wide glazed openings." },
      { question: "Do you handle multi-room commercial installations?", answer: "Yes. We can plan phased installation for hotels, care settings, offices and similar properties." }
    ],
  },
  {
    slug: "leeds",
    name: "Leeds",
    region: "West Yorkshire",
    intro: "TrackFit installs curtain tracks across Leeds for apartments, period homes, new developments and commercial interiors.",
    propertyFocus: [
    "Victorian terraces and stone-built homes",
    "Modern apartments and city developments",
    "Large detached homes with bays and extensions"
  ],
    challenges: [
    "Stone, masonry and older plaster substrates",
    "Deep bays and uneven reveals",
    "Wide windows requiring joined or reinforced track systems"
  ],
    commercial: [
    "Hotels and serviced accommodation",
    "Offices and professional practices",
    "Healthcare, education and residential developments"
  ],
    areas: [
    "Headingley",
    "Roundhay",
    "Horsforth",
    "Morley",
    "Wakefield"
  ],
    localNote: "Leeds properties often combine older masonry with modern refurbishments, so the visible finish does not always reveal the true fixing structure.",
    faqs: [
      { question: "Do you fit curtain tracks in stone-built homes?", answer: "Yes. We assess the actual fixing surface and select an installation method suited to the wall or ceiling structure." },
      { question: "Can you fit tracks to bay windows in Leeds?", answer: "Yes. We can plan flexible or custom-bent bay tracks and check support around bends and joins." },
      { question: "Do you cover Wakefield and nearby areas?", answer: "Yes. We cover Leeds, Wakefield and surrounding West Yorkshire locations." }
    ],
  },
  {
    slug: "liverpool",
    name: "Liverpool",
    region: "Merseyside",
    intro: "TrackFit provides curtain-track installation across Liverpool for terraces, apartments, family homes and commercial venues.",
    propertyFocus: [
    "Victorian and Edwardian terraces",
    "Waterfront and city apartments",
    "Suburban homes with bays and large rear extensions"
  ],
    challenges: [
    "Older plaster and uncertain lintel construction",
    "Concrete or steel in apartment buildings",
    "Long track runs over patio and bifold doors"
  ],
    commercial: [
    "Hotels and hospitality venues",
    "Student accommodation",
    "Offices and healthcare properties"
  ],
    areas: [
    "Wirral",
    "Bootle",
    "Crosby",
    "Woolton",
    "St Helens"
  ],
    localNote: "Liverpool installations often range from older bay-window homes to modern apartment blocks, requiring very different fixing and access strategies.",
    faqs: [
      { question: "Do you cover the Wirral as well as Liverpool?", answer: "Yes. We cover Liverpool, the Wirral and nearby Merseyside areas." },
      { question: "Can you fit tracks in city apartments?", answer: "Yes. We can assess concrete ceilings, restricted fixing zones and building access requirements." },
      { question: "Do you install tracks over bifold doors?", answer: "Yes. We plan projection, stack-back, bracket spacing and fixing strength for wide glazed openings." }
    ],
  },
  {
    slug: "sheffield",
    name: "Sheffield",
    region: "South Yorkshire",
    intro: "TrackFit installs curtain tracks throughout Sheffield for stone homes, modern apartments, family properties and commercial spaces.",
    propertyFocus: [
    "Stone-built terraces and semis",
    "Modern apartments and converted buildings",
    "Family homes with bays and wide extensions"
  ],
    challenges: [
    "Hard masonry and variable plaster condition",
    "Uneven walls and ceilings in older homes",
    "Large windows requiring carefully distributed support"
  ],
    commercial: [
    "Offices and education settings",
    "Hotels and serviced accommodation",
    "Healthcare and supported-living properties"
  ],
    areas: [
    "Ecclesall",
    "Hillsborough",
    "Dore",
    "Rotherham",
    "Chesterfield"
  ],
    localNote: "Sheffield's varied building stock means a track may need to transition from straightforward masonry fixing to more complex plasterboard or steel-supported areas.",
    faqs: [
      { question: "Do you fit curtain tracks into stone walls?", answer: "Yes. We assess the substrate and use a fixing approach suited to the actual stone, masonry or internal lining." },
      { question: "Can you cover Chesterfield and Rotherham?", answer: "Yes. We work across Sheffield and surrounding South Yorkshire and north Derbyshire areas." },
      { question: "Can you install heavy-duty tracks?", answer: "Yes. We can plan stronger profiles, closer support and appropriate structural fixings for heavier curtains." }
    ],
  },
  {
    slug: "nottingham",
    name: "Nottingham",
    region: "Nottinghamshire",
    intro: "TrackFit provides curtain-track fitting across Nottingham for homes, apartments, landlords and commercial properties.",
    propertyFocus: [
    "Period terraces and semis",
    "New-build developments and apartments",
    "Large suburban homes with glazed extensions"
  ],
    challenges: [
    "Plasterboard ceilings with limited structural support",
    "Wide patio and bifold door openings",
    "Mixed substrates following renovation work"
  ],
    commercial: [
    "Student accommodation",
    "Hotels and serviced apartments",
    "Offices, clinics and care properties"
  ],
    areas: [
    "West Bridgford",
    "Beeston",
    "Arnold",
    "Mansfield",
    "Derby"
  ],
    localNote: "Nottingham projects often involve renovated properties where new plasterboard conceals older masonry, timber or steel construction.",
    faqs: [
      { question: "Do you cover West Bridgford and Beeston?", answer: "Yes. We cover Nottingham and surrounding towns and suburbs." },
      { question: "Can you fit tracks in renovated properties?", answer: "Yes. We check the hidden fixing structure rather than relying only on the visible surface." },
      { question: "Do you work with landlords and developers?", answer: "Yes. We can support repeat, multi-room and development installations." }
    ],
  },
  {
    slug: "leicester",
    name: "Leicester",
    region: "Leicestershire",
    intro: "TrackFit installs curtain tracks across Leicester and Leicestershire for domestic, rental and commercial properties.",
    propertyFocus: [
    "Terraced and semi-detached homes",
    "Modern developments and apartment blocks",
    "Large family homes with bays and extensions"
  ],
    challenges: [
    "Long track runs in open-plan extensions",
    "Mixed masonry and plasterboard fixing zones",
    "Double-track spacing for voile and main curtains"
  ],
    commercial: [
    "Hotels and restaurants",
    "Care homes and healthcare settings",
    "Offices and education properties"
  ],
    areas: [
    "Oadby",
    "Wigston",
    "Loughborough",
    "Hinckley",
    "Market Harborough"
  ],
    localNote: "Leicester installations frequently combine large modern glazing with traditional construction, so track projection and fixing strength both matter.",
    faqs: [
      { question: "Do you cover Oadby, Wigston and Loughborough?", answer: "Yes. We cover Leicester and the wider Leicestershire area." },
      { question: "Can you install double curtain tracks?", answer: "Yes. We can plan spacing for voile and main-curtain layers so they move independently." },
      { question: "Do you fit tracks in commercial buildings?", answer: "Yes. We work with hospitality, care, office and education properties." }
    ],
  },
  {
    slug: "newcastle",
    name: "Newcastle",
    region: "Tyne and Wear",
    intro: "TrackFit provides curtain-track installation across Newcastle and Tyneside for period homes, apartments and commercial interiors.",
    propertyFocus: [
    "Victorian terraces and Tyneside flats",
    "Modern riverside and city apartments",
    "Detached homes with bays and large windows"
  ],
    challenges: [
    "Older plaster over masonry",
    "Concrete ceilings in modern developments",
    "Access and parking constraints in central locations"
  ],
    commercial: [
    "Hotels and serviced accommodation",
    "Offices and leisure venues",
    "Healthcare and education settings"
  ],
    areas: [
    "Gateshead",
    "Jesmond",
    "Gosforth",
    "Sunderland",
    "Durham"
  ],
    localNote: "Newcastle projects can involve everything from compact Tyneside flats to large modern glazed apartments, so installation planning needs to remain property-specific.",
    faqs: [
      { question: "Do you cover Gateshead and Sunderland?", answer: "Yes. We cover Newcastle, Gateshead, Sunderland and surrounding areas." },
      { question: "Can you fit tracks in Tyneside flats?", answer: "Yes. We assess the available wall or ceiling structure and plan the most practical mounting route." },
      { question: "Do you work in city-centre apartment buildings?", answer: "Yes. We can coordinate access and assess concrete or restricted fixing zones." }
    ],
  },
  {
    slug: "bristol",
    name: "Bristol",
    region: "South West England",
    intro: "TrackFit installs curtain tracks across Bristol for period homes, apartments, extensions and commercial spaces.",
    propertyFocus: [
    "Victorian and Georgian terraces",
    "Harbourside and city apartments",
    "Contemporary homes with large glazed openings"
  ],
    challenges: [
    "High ceilings and decorative plaster",
    "Full-height glazing with limited wall space",
    "Access constraints in central and hillside locations"
  ],
    commercial: [
    "Hotels and hospitality",
    "Creative offices and studios",
    "Healthcare and education properties"
  ],
    areas: [
    "Clifton",
    "Redland",
    "Bedminster",
    "Bath",
    "Weston-super-Mare"
  ],
    localNote: "Bristol projects often require a balance between discreet modern track systems and the character of older interiors.",
    faqs: [
      { question: "Do you fit tracks in period properties?", answer: "Yes. We plan fixing positions carefully around decorative plaster, high ceilings and older construction." },
      { question: "Can you install tracks for full-height glazing?", answer: "Yes. Ceiling mounting is often considered where wall space is limited." },
      { question: "Do you cover Bath as well as Bristol?", answer: "Yes. We cover Bristol, Bath and surrounding areas." }
    ],
  },
  {
    slug: "london",
    name: "London",
    region: "Greater London",
    intro: "TrackFit provides specialist curtain-track installation across London for apartments, townhouses, hotels, offices and high-end residential interiors.",
    propertyFocus: [
    "High-rise and luxury apartments",
    "Victorian and Georgian townhouses",
    "Large contemporary homes with full-height glazing"
  ],
    challenges: [
    "Strict access, parking and loading arrangements",
    "Concrete ceilings and concealed services",
    "High-value interiors requiring careful protection and coordination"
  ],
    commercial: [
    "Hotels and serviced residences",
    "Offices and corporate interiors",
    "Healthcare, education and premium residential developments"
  ],
    areas: [
    "Central London",
    "North London",
    "East London",
    "South London",
    "West London"
  ],
    localNote: "London work often depends as much on access planning, building rules and coordination as it does on the physical installation.",
    faqs: [
      { question: "Do you work in managed apartment buildings?", answer: "Yes. We can coordinate with concierge teams, access rules and agreed delivery or installation windows." },
      { question: "Can you install tracks in concrete ceilings?", answer: "Yes, subject to checking the structure, services and suitable fixing method." },
      { question: "Do you provide commercial curtain-track installation in London?", answer: "Yes. We support hotels, offices, healthcare, education and multi-unit developments." }
    ],
  },
  {
    slug: "york",
    name: "York",
    region: "North Yorkshire",
    intro: "TrackFit installs curtain tracks across York for period homes, modern developments, hotels and commercial properties.",
    propertyFocus: [
    "Georgian, Victorian and period homes",
    "Stone and brick properties with sash windows",
    "Modern suburban developments and apartments"
  ],
    challenges: [
    "Uneven walls and ceilings",
    "Older plaster and concealed timber",
    "Sensitivity around original architectural details"
  ],
    commercial: [
    "Hotels and guest accommodation",
    "Restaurants and hospitality",
    "Offices, education and care properties"
  ],
    areas: [
    "Harrogate",
    "Selby",
    "Malton",
    "Tadcaster",
    "Northallerton"
  ],
    localNote: "York projects often benefit from discreet track profiles and careful installation around cornices, sash windows and older plaster.",
    faqs: [
      { question: "Can you fit tracks without damaging period features?", answer: "We plan fixing positions carefully and work around cornices, mouldings and original details wherever practical." },
      { question: "Do you install tracks for sash windows?", answer: "Yes. We can plan projection and stack-back around deep reveals and window furniture." },
      { question: "Do you cover Harrogate and nearby towns?", answer: "Yes. We cover York and surrounding North Yorkshire areas." }
    ],
  },
  {
    slug: "oxford",
    name: "Oxford",
    region: "Oxfordshire",
    intro: "TrackFit provides curtain-track installation across Oxford for period homes, modern apartments, colleges, offices and hospitality properties.",
    propertyFocus: [
    "Period terraces and townhouses",
    "Modern apartments and developments",
    "Large homes with extensions and glazed doors"
  ],
    challenges: [
    "Older plaster and high ceilings",
    "Restricted access and parking",
    "Sensitive or high-value interiors"
  ],
    commercial: [
    "Education and institutional buildings",
    "Hotels and serviced accommodation",
    "Offices, clinics and residential developments"
  ],
    areas: [
    "Headington",
    "Summertown",
    "Abingdon",
    "Bicester",
    "Witney"
  ],
    localNote: "Oxford projects often require careful scheduling, discreet working and extra attention to older finishes or managed-building access.",
    faqs: [
      { question: "Do you work in high-value or sensitive interiors?", answer: "Yes. We plan protection, access and installation carefully around finished interiors." },
      { question: "Can you install tracks in older properties?", answer: "Yes. We assess the fixing structure and avoid assuming that older plaster is suitable on its own." },
      { question: "Do you cover Abingdon and Bicester?", answer: "Yes. We cover Oxford and surrounding Oxfordshire towns." }
    ],
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    region: "Cambridgeshire",
    intro: "TrackFit installs curtain tracks across Cambridge for new developments, period homes, education properties and commercial interiors.",
    propertyFocus: [
    "Modern apartments and new-build homes",
    "Victorian terraces and converted properties",
    "Large glazed extensions and garden rooms"
  ],
    challenges: [
    "Concrete and steel in modern developments",
    "Limited wall space above full-height glazing",
    "Managed access in apartments and institutional buildings"
  ],
    commercial: [
    "Education and research settings",
    "Hotels and serviced accommodation",
    "Offices, clinics and residential developments"
  ],
    areas: [
    "Trumpington",
    "Chesterton",
    "Ely",
    "Newmarket",
    "Huntingdon"
  ],
    localNote: "Cambridge installations often combine modern glazing with strict building access or carefully finished interiors.",
    faqs: [
      { question: "Can you fit tracks in new-build apartments?", answer: "Yes. We can assess concrete ceilings, plasterboard linings and restricted fixing zones." },
      { question: "Do you work with education and research properties?", answer: "Yes. We can support planned commercial and institutional installations." },
      { question: "Do you cover Ely and Newmarket?", answer: "Yes. We cover Cambridge and surrounding areas." }
    ],
  },
  {
    slug: "reading",
    name: "Reading",
    region: "Berkshire",
    intro: "TrackFit provides curtain-track installation across Reading for homes, apartments, offices and commercial properties.",
    propertyFocus: [
    "Modern apartments and commuter developments",
    "Suburban family homes",
    "Large extensions with bifold and sliding doors"
  ],
    challenges: [
    "Wide glazed openings",
    "Concrete or steel in apartment buildings",
    "Double-track planning for voile and blackout layers"
  ],
    commercial: [
    "Offices and corporate interiors",
    "Hotels and serviced apartments",
    "Healthcare and residential developments"
  ],
    areas: [
    "Wokingham",
    "Bracknell",
    "Maidenhead",
    "Henley-on-Thames",
    "Newbury"
  ],
    localNote: "Reading projects frequently involve modern developments and wide rear glazing where projection, stack-back and track strength all need to be planned together.",
    faqs: [
      { question: "Do you fit tracks across wide bifold doors?", answer: "Yes. We plan track length, bracket spacing, projection and curtain stack-back." },
      { question: "Can you install double tracks for voile and blackout curtains?", answer: "Yes. We can plan the spacing so both layers move properly." },
      { question: "Do you cover Wokingham and Bracknell?", answer: "Yes. We cover Reading and surrounding Berkshire areas." }
    ],
  }
];

export const areaServicePages: AreaServicePage[] = [
  {
    citySlug: "manchester",
    serviceSlug: "curtain-track-installation",
    title: "Curtain Track Installation in Manchester",
    description: "Professional curtain-track fitting for apartments, houses, hotels and offices across Manchester.",
    suitableFor: [
    "Concrete-ceiling apartment installations",
    "Wide patio and bifold-door tracks",
    "Multi-room residential fitting"
  ],
    localConsiderations: [
    "City-centre access and concierge coordination",
    "Ceiling and wall fixing assessment",
    "Track projection around handles and radiators"
  ],
  },
  {
    citySlug: "manchester",
    serviceSlug: "bay-window-curtain-tracks",
    title: "Bay Window Curtain Tracks in Manchester",
    description: "Planning and installation of bay-window curtain tracks across Greater Manchester.",
    suitableFor: [
    "Three-section and five-section bays",
    "Ceiling-mounted bay tracks",
    "Joined and custom-bent aluminium systems"
  ],
    localConsiderations: [
    "Accurate section measurements",
    "Support near bends and joins",
    "Curtain stack-back at bay returns"
  ],
  },
  {
    citySlug: "birmingham",
    serviceSlug: "commercial-curtain-track-installation",
    title: "Commercial Curtain Track Installation in Birmingham",
    description: "Commercial track fitting for hotels, care settings, offices, education and residential developments.",
    suitableFor: [
    "Phased and multi-room programmes",
    "Heavy-duty and repeatable track systems",
    "Voile and blackout double-track layouts"
  ],
    localConsiderations: [
    "Access and programme coordination",
    "Consistent bracket spacing and fixing standards",
    "Clear handover and snagging"
  ],
  },
  {
    citySlug: "london",
    serviceSlug: "commercial-curtain-track-installation",
    title: "Commercial Curtain Track Installation in London",
    description: "Planned commercial curtain-track installation for London hotels, offices, healthcare and managed developments.",
    suitableFor: [
    "Managed-building coordination",
    "High-volume room schedules",
    "Premium and high-value interiors"
  ],
    localConsiderations: [
    "Loading, parking and access rules",
    "Protection of finished interiors",
    "Concrete ceilings and concealed services"
  ],
  },
  {
    citySlug: "leeds",
    serviceSlug: "bay-window-curtain-tracks",
    title: "Bay Window Curtain Tracks in Leeds",
    description: "Bay-window track planning for stone homes, period properties and modern extensions across Leeds.",
    suitableFor: [
    "Deep stone bays",
    "Three and five-section windows",
    "Flexible and custom-bent track systems"
  ],
    localConsiderations: [
    "Uneven walls and ceilings",
    "Older plaster over masonry",
    "Support around each change of direction"
  ],
  },
  {
    citySlug: "liverpool",
    serviceSlug: "curtain-track-installation",
    title: "Curtain Track Installation in Liverpool",
    description: "Residential curtain-track fitting across Liverpool, Wirral and Merseyside.",
    suitableFor: [
    "Victorian bay windows",
    "Apartment ceiling tracks",
    "Patio and bifold-door installations"
  ],
    localConsiderations: [
    "Older plaster and lintels",
    "Concrete ceilings in apartments",
    "Long runs and track joins"
  ],
  },
  {
    citySlug: "bristol",
    serviceSlug: "curtain-track-installation",
    title: "Curtain Track Installation in Bristol",
    description: "Curtain-track fitting for period homes, apartments and contemporary glazed spaces across Bristol.",
    suitableFor: [
    "High-ceiling period rooms",
    "Ceiling-mounted tracks for full-height glazing",
    "Wide extension and door openings"
  ],
    localConsiderations: [
    "Decorative plaster and cornices",
    "Restricted access in central areas",
    "Discreet track selection"
  ],
  },
  {
    citySlug: "blackburn",
    serviceSlug: "curtain-track-installation",
    title: "Curtain Track Installation in Blackburn",
    description: "Local curtain-track fitting across Blackburn, Darwen and East Lancashire.",
    suitableFor: [
    "Single-room and whole-house fitting",
    "Bay-window tracks",
    "Ceiling and wall-mounted systems"
  ],
    localConsiderations: [
    "Older plaster and mixed construction",
    "Joist and fixing-point alignment",
    "Fast local follow-up where needed"
  ],
  },
  {
    citySlug: "reading",
    serviceSlug: "curtain-track-installation",
    title: "Curtain Track Installation in Reading",
    description: "Track fitting for apartments, family homes and wide glazed extensions across Reading and Berkshire.",
    suitableFor: [
    "Bifold and sliding-door tracks",
    "Double tracks for voile and blackout",
    "Apartment ceiling installations"
  ],
    localConsiderations: [
    "Concrete and steel construction",
    "Track projection over radiators",
    "Curtain stack-back beside doors"
  ],
  }
];

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug);
}

export function getAreaServicePage(
  citySlug: string,
  serviceSlug: string,
) {
  return areaServicePages.find(
    (page) =>
      page.citySlug === citySlug &&
      page.serviceSlug === serviceSlug,
  );
}
