import Link from "next/link";

import { PageIntro } from "@/components/ui/page-intro";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <PageIntro
        eyebrow="Portfolio migration shell"
        title={siteConfig.name}
        description={siteConfig.description}
      />
      <section className="mx-auto max-w-6xl border-t border-rule px-6 py-12 md:px-10">
        <p className="max-w-2xl text-muted-ink">
          The Next.js foundation is active. Existing portfolio content is being
          migrated route by route before visual redesign begins.
        </p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm underline underline-offset-4">
          <Link href="/work">Review {projects.length} preserved projects</Link>
          <Link href="/experience">Review experience data</Link>
          <Link href="/contact">Review contact details</Link>
        </div>
      </section>
    </>
  );
}
