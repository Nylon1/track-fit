import { homeCountiesAreas } from "./cities/home-counties";
import { londonAreas } from "./cities/london";
import { northMidlandsAreas } from "./cities/north-midlands";
import { southEastAreas } from "./cities/south-east";
import { southWestAreas } from "./cities/south-west";
import type { Area, AreaRegionGroup, AreaServicePage } from "./types";

export const areas: Area[] = [
  ...londonAreas,
  ...southEastAreas,
  ...homeCountiesAreas,
  ...southWestAreas,
  ...northMidlandsAreas,
];

export const areaRegionOrder: AreaRegionGroup[] = [
  "London",
  "South East",
  "Home Counties",
  "South West",
  "Midlands",
  "North of England",
];

export const areaServicePages: AreaServicePage[] = [
  {
    citySlug: "manchester",
    serviceSlug: "curtain-track-installation",
    title: "Curtain Track Installation in Manchester",
    description: "Professional curtain-track fitting for apartments, houses, hotels and offices across Manchester.",
    suitableFor: ["Concrete-ceiling apartment installations", "Wide patio and bifold-door tracks", "Multi-room residential fitting"],
    localConsiderations: ["City-centre access and concierge coordination", "Ceiling and wall fixing assessment", "Track projection around handles and radiators"],
  },
  {
    citySlug: "manchester",
    serviceSlug: "bay-window-curtain-tracks",
    title: "Bay Window Curtain Tracks in Manchester",
    description: "Planning and installation of bay-window curtain tracks across Greater Manchester.",
    suitableFor: ["Three-section and five-section bays", "Ceiling-mounted bay tracks", "Joined and custom-bent aluminium systems"],
    localConsiderations: ["Accurate section measurements", "Support near bends and joins", "Curtain stack-back at bay returns"],
  },
  {
    citySlug: "birmingham",
    serviceSlug: "commercial-curtain-track-installation",
    title: "Commercial Curtain Track Installation in Birmingham",
    description: "Commercial track fitting for hotels, care settings, offices, education and residential developments.",
    suitableFor: ["Phased and multi-room programmes", "Heavy-duty and repeatable track systems", "Voile and blackout double-track layouts"],
    localConsiderations: ["Access and programme coordination", "Consistent bracket spacing and fixing standards", "Clear handover and snagging"],
  },
  {
    citySlug: "london",
    serviceSlug: "commercial-curtain-track-installation",
    title: "Commercial Curtain Track Installation in London",
    description: "Planned commercial curtain-track installation for London hotels, offices, healthcare and managed developments.",
    suitableFor: ["Managed-building coordination", "High-volume room schedules", "Premium and high-value interiors"],
    localConsiderations: ["Loading, parking and access rules", "Protection of finished interiors", "Concrete ceilings and concealed services"],
  },
  {
    citySlug: "leeds",
    serviceSlug: "bay-window-curtain-tracks",
    title: "Bay Window Curtain Tracks in Leeds",
    description: "Bay-window track planning for stone homes, period properties and modern extensions across Leeds.",
    suitableFor: ["Deep stone bays", "Three and five-section windows", "Flexible and custom-bent track systems"],
    localConsiderations: ["Uneven walls and ceilings", "Older plaster over masonry", "Support around each change of direction"],
  },
  {
    citySlug: "liverpool",
    serviceSlug: "curtain-track-installation",
    title: "Curtain Track Installation in Liverpool",
    description: "Residential curtain-track fitting across Liverpool, Wirral and Merseyside.",
    suitableFor: ["Victorian bay windows", "Apartment ceiling tracks", "Patio and bifold-door installations"],
    localConsiderations: ["Older plaster and lintels", "Concrete ceilings in apartments", "Long runs and track joins"],
  },
  {
    citySlug: "bristol",
    serviceSlug: "curtain-track-installation",
    title: "Curtain Track Installation in Bristol",
    description: "Curtain-track fitting for period homes, apartments and contemporary glazed spaces across Bristol.",
    suitableFor: ["High-ceiling period rooms", "Ceiling-mounted tracks for full-height glazing", "Wide extension and door openings"],
    localConsiderations: ["Decorative plaster and cornices", "Restricted access in central areas", "Discreet track selection"],
  },
  {
    citySlug: "blackburn",
    serviceSlug: "curtain-track-installation",
    title: "Curtain Track Installation in Blackburn",
    description: "Curtain-track fitting across Blackburn, Darwen and East Lancashire.",
    suitableFor: ["Single-room and whole-house fitting", "Bay-window tracks", "Ceiling and wall-mounted systems"],
    localConsiderations: ["Older plaster and mixed construction", "Joist and fixing-point alignment", "Access planning for occupied properties"],
  },
  {
    citySlug: "reading",
    serviceSlug: "curtain-track-installation",
    title: "Curtain Track Installation in Reading",
    description: "Track fitting for apartments, family homes and wide glazed extensions across Reading and Berkshire.",
    suitableFor: ["Bifold and sliding-door tracks", "Double tracks for voile and blackout", "Apartment ceiling installations"],
    localConsiderations: ["Concrete and steel construction", "Track projection over radiators", "Curtain stack-back beside doors"],
  },
];

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug);
}

export function getAreaServicePage(citySlug: string, serviceSlug: string) {
  return areaServicePages.find(
    (page) => page.citySlug === citySlug && page.serviceSlug === serviceSlug,
  );
}
