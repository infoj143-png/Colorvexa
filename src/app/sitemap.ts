import { MetadataRoute } from "next";
import { PUBLIC_ROUTES, getAbsoluteUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  return PUBLIC_ROUTES.map((route) => ({
    url: getAbsoluteUrl(route.path),
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
