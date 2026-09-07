export const SITE_NAME = "Colorvexa";
export const DEFAULT_SITE_URL = "https://colorvexa.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

export const SITE_DESCRIPTION =
  "Extract colors from images, generate beautiful palettes, convert color formats (HEX, RGB, HSL), and check color contrast directly in your browser with 100% privacy.";

export function getAbsoluteUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
}

export interface PublicRoute {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export const PUBLIC_ROUTES: PublicRoute[] = [
  { path: "", changeFrequency: "daily", priority: 1.0 },
  { path: "/tools/image-color-picker", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/dominant-color-extractor", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/image-color-palette-generator", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/color-converter", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/color-shades-generator", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tools/color-contrast-checker", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
  { path: "/disclaimer", changeFrequency: "monthly", priority: 0.3 },
];
