import type { Guide, GuideCategoryDefinition } from "./types";
import {
  guides as starterGuides,
  guideCategories
} from "./legacy-data";
import { PlasticVsAluminiumCurtainTracksGuide } from "./content/plastic-vs-aluminium-curtain-tracks";
import { DoubleCurtainTracksForCurtainsAndVoilesGuide } from "./content/double-curtain-tracks-for-curtains-and-voiles";
import { WaveCurtainTrackGuideGuide } from "./content/wave-curtain-track-guide";
import { RecessedCurtainTracksGuide } from "./content/recessed-curtain-tracks";
import { CurtainPoleVsCurtainTrackGuide } from "./content/curtain-pole-vs-curtain-track";
import { HowFarShouldCurtainTrackExtendPastWindowGuide } from "./content/how-far-should-curtain-track-extend-past-window";
import { HowFarFromWallShouldCurtainTrackBeGuide } from "./content/how-far-from-wall-should-curtain-track-be";
import { HowHighShouldCurtainTrackBeGuide } from "./content/how-high-should-curtain-track-be";
import { HowToMeasureBayWindowForCurtainTrackGuide } from "./content/how-to-measure-bay-window-for-curtain-track";
import { CurtainStackBackGuideGuide } from "./content/curtain-stack-back-guide";
import { WhatInformationNeededForCurtainTrackQuoteGuide } from "./content/what-information-needed-for-curtain-track-quote";
import { FittingCurtainTracksToConcreteCeilingsGuide } from "./content/fitting-curtain-tracks-to-concrete-ceilings";
import { FittingCurtainTracksUnderSteelLintelsGuide } from "./content/fitting-curtain-tracks-under-steel-lintels";
import { FittingCurtainTracksIntoTimberJoistsGuide } from "./content/fitting-curtain-tracks-into-timber-joists";
import { JoiningCurtainTracksGuide } from "./content/joining-curtain-tracks";
import { HowToFitCurtainTrackOverBlindsGuide } from "./content/how-to-fit-curtain-track-over-blinds";
import { ReplacingAnOldCurtainTrackGuide } from "./content/replacing-an-old-curtain-track";
import { CurtainTrackInstallationOnUnevenWallsGuide } from "./content/curtain-track-installation-on-uneven-walls";
import { CanCurtainTracksBeFittedWithoutDrillingGuide } from "./content/can-curtain-tracks-be-fitted-without-drilling";
import { CurtainTracksForSlidingDoorsGuide } from "./content/curtain-tracks-for-sliding-doors";
import { CurtainTracksForFrenchDoorsGuide } from "./content/curtain-tracks-for-french-doors";
import { CurtainTracksForFloorToCeilingWindowsGuide } from "./content/curtain-tracks-for-floor-to-ceiling-windows";
import { CurtainTracksForCornerWindowsGuide } from "./content/curtain-tracks-for-corner-windows";
import { CurtainTracksForApexWindowsGuide } from "./content/curtain-tracks-for-apex-windows";
import { CurtainTracksForCurvedWindowsGuide } from "./content/curtain-tracks-for-curved-windows";
import { CurtainTracksForWideWindowsGuide } from "./content/curtain-tracks-for-wide-windows";
import { CurtainTracksForSmallWindowsGuide } from "./content/curtain-tracks-for-small-windows";
import { CurtainTracksForLivingRoomsGuide } from "./content/curtain-tracks-for-living-rooms";
import { CurtainTracksForBedroomsGuide } from "./content/curtain-tracks-for-bedrooms";
import { CurtainTracksForKitchensGuide } from "./content/curtain-tracks-for-kitchens";
import { CurtainTracksForDiningRoomsGuide } from "./content/curtain-tracks-for-dining-rooms";
import { CurtainTracksForHomeOfficesGuide } from "./content/curtain-tracks-for-home-offices";
import { CurtainTracksForConservatoriesGuide } from "./content/curtain-tracks-for-conservatories";
import { CurtainTracksForChildrensBedroomsGuide } from "./content/curtain-tracks-for-childrens-bedrooms";
import { CurtainTracksForHighCeilingsGuide } from "./content/curtain-tracks-for-high-ceilings";
import { HotelCurtainTrackInstallationGuide } from "./content/hotel-curtain-track-installation";
import { OfficeCurtainTrackInstallationGuide } from "./content/office-curtain-track-installation";
import { SchoolCurtainTrackInstallationGuide } from "./content/school-curtain-track-installation";
import { HealthcareCurtainTrackInstallationGuide } from "./content/healthcare-curtain-track-installation";
import { CareHomeCurtainTrackInstallationGuide } from "./content/care-home-curtain-track-installation";
import { RestaurantCurtainTrackInstallationGuide } from "./content/restaurant-curtain-track-installation";
import { StageAndTheatreCurtainTracksGuide } from "./content/stage-and-theatre-curtain-tracks";
import { WhyCurtainsDoNotGlideSmoothlyGuide } from "./content/why-curtains-do-not-glide-smoothly";
import { HowMuchWeightCanCurtainTrackHoldGuide } from "./content/how-much-weight-can-curtain-track-hold";
import { CanABrokenCurtainTrackBeRepairedGuide } from "./content/can-a-broken-curtain-track-be-repaired";
import { WhyCurtainsNotClosingProperlyGuide } from "./content/why-curtains-not-closing-properly";
import { CurtainTrackComingAwayFromCeilingGuide } from "./content/curtain-track-coming-away-from-ceiling";
import { CurtainGliderReplacementGuideGuide } from "./content/curtain-glider-replacement-guide";

const expandedGuides: Guide[] = [
  PlasticVsAluminiumCurtainTracksGuide, DoubleCurtainTracksForCurtainsAndVoilesGuide, WaveCurtainTrackGuideGuide, RecessedCurtainTracksGuide, CurtainPoleVsCurtainTrackGuide, HowFarShouldCurtainTrackExtendPastWindowGuide, HowFarFromWallShouldCurtainTrackBeGuide, HowHighShouldCurtainTrackBeGuide, HowToMeasureBayWindowForCurtainTrackGuide, CurtainStackBackGuideGuide, WhatInformationNeededForCurtainTrackQuoteGuide, FittingCurtainTracksToConcreteCeilingsGuide, FittingCurtainTracksUnderSteelLintelsGuide, FittingCurtainTracksIntoTimberJoistsGuide, JoiningCurtainTracksGuide, HowToFitCurtainTrackOverBlindsGuide, ReplacingAnOldCurtainTrackGuide, CurtainTrackInstallationOnUnevenWallsGuide, CanCurtainTracksBeFittedWithoutDrillingGuide, CurtainTracksForSlidingDoorsGuide, CurtainTracksForFrenchDoorsGuide, CurtainTracksForFloorToCeilingWindowsGuide, CurtainTracksForCornerWindowsGuide, CurtainTracksForApexWindowsGuide, CurtainTracksForCurvedWindowsGuide, CurtainTracksForWideWindowsGuide, CurtainTracksForSmallWindowsGuide, CurtainTracksForLivingRoomsGuide, CurtainTracksForBedroomsGuide, CurtainTracksForKitchensGuide, CurtainTracksForDiningRoomsGuide, CurtainTracksForHomeOfficesGuide, CurtainTracksForConservatoriesGuide, CurtainTracksForChildrensBedroomsGuide, CurtainTracksForHighCeilingsGuide, HotelCurtainTrackInstallationGuide, OfficeCurtainTrackInstallationGuide, SchoolCurtainTrackInstallationGuide, HealthcareCurtainTrackInstallationGuide, CareHomeCurtainTrackInstallationGuide, RestaurantCurtainTrackInstallationGuide, StageAndTheatreCurtainTracksGuide, WhyCurtainsDoNotGlideSmoothlyGuide, HowMuchWeightCanCurtainTrackHoldGuide, CanABrokenCurtainTrackBeRepairedGuide, WhyCurtainsNotClosingProperlyGuide, CurtainTrackComingAwayFromCeilingGuide, CurtainGliderReplacementGuideGuide
];

const allGuidesWithoutLinks: Guide[] = [...starterGuides, ...expandedGuides];

function buildRelated(guide: Guide): string[] {
  const sameCategory = allGuidesWithoutLinks
    .filter((candidate) =>
      candidate.slug !== guide.slug &&
      candidate.category === guide.category
    )
    .slice(0, 3)
    .map((candidate) => candidate.slug);

  const pillar = [
    "what-type-of-curtain-track-do-i-need",
    "how-to-measure-for-a-curtain-track",
    "ceiling-vs-wall-mounted-curtain-tracks",
    "curtain-track-installation-cost",
  ].filter((slug) => slug !== guide.slug && !sameCategory.includes(slug));

  return [...sameCategory, ...pillar].slice(0, 4);
}

export { guideCategories };

export const guides: Guide[] = allGuidesWithoutLinks.map((guide) => ({
  ...guide,
  relatedGuides:
    guide.relatedGuides.length > 0
      ? guide.relatedGuides
      : buildRelated(guide),
}));

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getRelatedGuides(slugs: string[]) {
  return slugs
    .map((slug) => getGuide(slug))
    .filter((guide): guide is Guide => Boolean(guide));
}
