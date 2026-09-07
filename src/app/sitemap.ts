import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://colorvexa.com";
  const currentDate = new Date().toISOString();

  const routes = [
    "",
    "/tools/image-color-picker",
    "/tools/dominant-color-extractor",
    "/tools/image-color-palette-generator",
    "/tools/color-converter",
    "/tools/color-shades-generator",
    "/tools/color-contrast-checker",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/tools/") ? 0.8 : 0.5,
  }));
}
