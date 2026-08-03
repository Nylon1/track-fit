import { ImageResponse } from "next/og";

import SocialImage from "@/components/seo/SocialImage";

export const alt = "TrackFit professional curtain track installation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<SocialImage />, size);
}
