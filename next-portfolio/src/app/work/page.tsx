import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/ui/page-intro";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected full-stack, backend, mobile, and cloud projects.",
};

export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="Selected work"
        title="Products built for real problems"
        description="Existing project content is preserved here while detailed case studies and approved media are prepared."
      />
      <ol className="mx-auto max-w-6xl border-t border-rule px-6 md:px-10">
        {projects.map((project) => (
          <li className="border-b border-rule py-8" key={project.slug}>
            <Link className="text-xl font-medium" href={`/work/${project.slug}`}>
              {project.name}
            </Link>
            <p className="mt-2 text-sm text-muted-ink">
              {project.technologies.join(" · ")}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}
