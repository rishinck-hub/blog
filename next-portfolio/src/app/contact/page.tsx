import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/ui/page-intro";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mohammed Rishin C K about software development opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Let’s make it happen"
        description="Available for software development opportunities, collaborations, and thoughtful product conversations."
      />
      <ul className="mx-auto max-w-6xl border-t border-rule px-6 pb-16 md:px-10">
        {siteConfig.socials.map((item) => (
          <li className="border-b border-rule py-6" key={item.label}>
            <Link className="flex justify-between gap-6" href={item.href}>
              <span>{item.label}</span>
              <span className="text-right text-muted-ink">{item.value}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
