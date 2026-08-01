import Link from "next/link";

import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-ink md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 {siteConfig.name}</p>
        <div className="flex flex-wrap gap-5">
          {siteConfig.socials.slice(0, 3).map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
