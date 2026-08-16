import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TextReveal } from "@/components/animation/text-reveal";
import { ProjectVisual } from "@/components/projects/project-visual";
import { getNextProject, getProject, projects, siteConfig } from "@/data";
import { createPageMetadata } from "@/lib/metadata";

import "../work.css";
import "./case-study.css";

type ProjectPageProps = Readonly<{ params: Promise<{ slug: string }> }>;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project
    ? createPageMetadata({ title: project.name, description: project.description, path: `/work/${project.slug}` })
    : { title: "Project not found", robots: { index: false, follow: false } };
}

function StudySection({ index, title, children }: Readonly<{ index: string; title: string; children: React.ReactNode }>) {
  return (
    <section className="case-section">
      <div className="case-section__label type-label"><span>{index}</span><h2>{title}</h2></div>
      <div className="case-section__content type-body">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const number = String(index + 1).padStart(2, "0");
  const nextProject = getNextProject(project.slug);
  const nextNumber = String(projects.findIndex((entry) => entry.slug === nextProject.slug) + 1).padStart(2, "0");
  const studySections = [
    { title: "Overview", content: <p>{project.description}</p> },
    ...(project.challenge ? [{ title: "Problem", content: <p>{project.challenge}</p> }] : []),
    ...(project.approach ? [{ title: "Approach", content: <p>{project.approach}</p> }] : []),
    ...(project.process ? [{ title: "Development process", content: <p>{project.process}</p> }] : []),
    ...(project.features?.length ? [{ title: "Features", content: <ul className="case-features">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul> }] : []),
    { title: "Technology", content: <p>The documented stack for this project is {project.technologies.join(", ")}.</p> },
    ...(project.outcome ? [{ title: "Outcome", content: <p>{project.outcome}</p> }] : []),
  ];
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: `${siteConfig.url}/work/${project.slug}`,
    creator: { "@id": `${siteConfig.url}/#person` },
    genre: project.category,
    keywords: project.technologies.join(", "),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  };

  return (
    <div className="case-study">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c") }} />
      <header className="case-hero editorial-container">
        <div className="case-hero__top type-label"><Link href="/work">← Work index</Link><span>Project {number} / {String(projects.length).padStart(2, "0")}</span></div>
        <p className="case-hero__category type-label">{project.category}</p>
        <TextReveal as="h1" className="type-page-title" text={project.name} mode="line" trigger="load" />
        <p className="case-hero__subtitle type-body-large">{project.subtitle}</p>
      </header>

      <div className="case-cover editorial-container">
        <ProjectVisual project={project} number={number} compact />
      </div>

      <div className="case-body editorial-container">
        <dl className="case-meta type-metadata">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Year</dt><dd>{project.year}</dd></div>
          <div><dt>Category</dt><dd>{project.category}</dd></div>
          <div><dt>Technology</dt><dd>{project.technologies.join(" · ")}</dd></div>
        </dl>

        {project.isConfidential ? (
          <aside className="case-confidential" aria-label="Confidentiality note">
            <span className="type-label">Public summary</span>
            <p>Some details are omitted because this work was completed in an employer context. Private screenshots, URLs, customer information, and internal implementation details are not shown.</p>
          </aside>
        ) : null}

        {studySections.map((section, sectionIndex) => (
          <StudySection index={String(sectionIndex + 1).padStart(2, "0")} title={section.title} key={section.title}>{section.content}</StudySection>
        ))}

        <section className="case-links" aria-labelledby="case-links-title">
          <div><span className="type-label">{String(studySections.length + 1).padStart(2, "0")}</span><h2 id="case-links-title" className="type-label">External links</h2></div>
          <div className="case-links__items">
            {project.liveUrl ? <a className="animated-link type-label" href={project.liveUrl} target="_blank" rel="noreferrer">Visit live project <span aria-hidden="true">↗</span></a> : null}
            {project.repositoryUrl ? <a className="animated-link type-label" href={project.repositoryUrl} target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a> : null}
            {!project.liveUrl && !project.repositoryUrl ? <p className="type-metadata">No public project or repository URL is available.</p> : null}
          </div>
        </section>
      </div>

      <nav className="case-next" aria-label="Next project">
        <Link href={`/work/${nextProject.slug}`} className="editorial-container case-next__inner" data-cursor-label="Next">
          <span className="type-label">Next project — {nextNumber}</span>
          <strong>{nextProject.name}</strong>
          <span className="case-next__arrow" aria-hidden="true">→</span>
        </Link>
      </nav>
    </div>
  );
}
