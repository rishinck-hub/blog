import Link from "next/link";

import { ProjectVisual } from "@/components/projects/project-visual";
import { AnimatedLink } from "@/components/ui/animated-link";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/metadata";

import "./work.css";

export const metadata = createPageMetadata({ title: "Work", description: "A collection of digital products, systems, and experiments by Mohammed Rishin C K.", path: "/work" });

export default function WorkPage() {
  return (
    <div className="work-index">
      <header className="work-index__hero editorial-container">
        <div className="work-index__eyebrow"><span className="type-label">Selected work</span><span className="type-metadata">{String(projects.length).padStart(2, "0")} projects</span></div>
        <h1 className="type-page-title">A collection of digital products,<br /><em>systems and experiments.</em></h1>
        <p className="type-body">Full-stack applications, backend contributions, mobile work, and cloud deployments—presented with the level of detail each project can responsibly support.</p>
      </header>

      <section className="work-index__list editorial-container" aria-label="Project index">
        {projects.map((project, index) => {
          const number = String(index + 1).padStart(2, "0");
          return (
            <article className={`work-entry${index % 2 ? " work-entry--reverse" : ""}`} key={project.slug}>
              <div className="work-entry__copy">
                <span className="work-entry__number">{number}</span>
                <p className="type-label">{project.category}</p>
                <h2 className="type-project-title">{project.name}</h2>
                <p className="work-entry__description type-body">{project.description}</p>
                <dl className="work-entry__meta type-metadata">
                  <div><dt>Role</dt><dd>{project.role}</dd></div>
                  <div><dt>Technology</dt><dd>{project.technologies.join(" · ")}</dd></div>
                  <div><dt>Year</dt><dd>{project.year}</dd></div>
                </dl>
                <AnimatedLink href={`/work/${project.slug}`} className="type-label">Read case study <span aria-hidden="true">→</span></AnimatedLink>
              </div>
              <Link href={`/work/${project.slug}`} className="work-entry__visual" data-cursor-label="View project">
                <ProjectVisual project={project} number={number} />
              </Link>
            </article>
          );
        })}
      </section>
    </div>
  );
}
