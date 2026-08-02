import type { Metadata } from "next";

import { siteConfig } from "@/data/site";

export function createPageMetadata({ title, description, path }: Readonly<{ title: string; description: string; path: string }>): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: `${siteConfig.name} Portfolio`,
      title,
      description,
      url: canonical,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} — Software Developer` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
