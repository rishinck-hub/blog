import Link from "next/link";

import { siteConfig } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-6 py-5 md:px-10"
      >
        <Link className="font-medium" href="/">
          {siteConfig.shortName}
        </Link>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {siteConfig.navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
