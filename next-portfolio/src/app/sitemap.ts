import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about", "/experience", "/creative", "/contact"];
  return [
    ...routes.map((path, index) => ({ url: `${siteConfig.url}${path}`, changeFrequency: "monthly" as const, priority: index === 0 ? 1 : .8 })),
    ...projects.map((project) => ({ url: `${siteConfig.url}/work/${project.slug}`, changeFrequency: "yearly" as const, priority: .7 })),
  ];
}
