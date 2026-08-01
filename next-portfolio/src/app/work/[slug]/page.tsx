import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects, getProject } from "@/data/projects";

type ProjectPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  return project
    ? { title: project.name, description: project.description }
    : { title: "Project not found" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-ink">Project</p>
      <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-none md:text-7xl">
        {project.name}
      </h1>
      <p className="mt-6 text-sm text-muted-ink">
        {project.technologies.join(" · ")}
      </p>
      {project.description ? (
        <p className="mt-8 max-w-2xl text-lg leading-8">{project.description}</p>
      ) : (
        <p className="mt-8 max-w-2xl text-muted-ink">
          Detailed public case-study content is not yet available.
        </p>
      )}
      <div className="mt-10 flex gap-5 text-sm underline underline-offset-4">
        {project.liveUrl ? <Link href={project.liveUrl}>View live project</Link> : null}
        <Link href="/work">Back to work</Link>
      </div>
    </article>
  );
}
