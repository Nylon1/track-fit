import manifest from "./image-manifest.json";
export type AreaImage = { src: string; alt: string; place: string; author: string; license: string; licenseUrl: string; sourceUrl: string; };
export const areaImages = manifest as Record<string, AreaImage>;
