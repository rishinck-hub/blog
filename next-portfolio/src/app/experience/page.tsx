import Link from "next/link";

import { getProject } from "@/data/projects";
import { developmentExperience, educationExperience, professionalExperience } from "@/data/experience";
import type { ExperienceEntry } from "@/types/content";
import { createPageMetadata } from "@/lib/metadata";

import "./experience.css";

export const metadata = createPageMetadata({ title: "Experience", description: "Professional experience, education, training, leadership, and workshops from Mohammed Rishin C K.", path: "/experience" });

function ExperienceGroup({ label, title, entries, startIndex }: Readonly<{ label: string; title: string; entries: readonly ExperienceEntry[]; startIndex: number }>) {
  return (
    <section className="experience-group editorial-container" aria-labelledby={`${label}-title`}>
      <div className="experience-group__heading">
        <p className="type-label">{label}</p>
        <h2 id={`${label}-title`}>{title}</h2>
        <span className="type-metadata">{String(entries.length).padStart(2, "0")} entries</span>
      </div>
      <div className="experience-list">
        {entries.map((entry, index) => {
          const number = String(startIndex + index).padStart(2, "0");
          const relatedProjects = entry.relatedProjects?.map(getProject).filter((project) => project !== undefined) ?? [];
          return (
            <details className="experience-row" key={`${entry.period}-${entry.role}`}>
              <summary>
                <span className="experience-row__number type-metadata">{number}</span>
                <time className="experience-row__date type-metadata">{entry.period}</time>
                <h3>{entry.role}</h3>
                <p>{entry.organization}</p>
                <span className="experience-row__toggle" aria-hidden="true">+</span>
              </summary>
              <div className="experience-row__details">
                <div className="experience-row__summary">
                  <span className="type-label">Summary</span>
                  <p className="type-body-large">{entry.description}</p>
                </div>
                <div className="experience-row__responsibilities">
                  <span className="type-label">Responsibilities</span>
                  <ul>{entry.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
                </div>
                <div className="experience-row__technologies">
                  <span className="type-label">Technologies / focus</span>
                  <p className="type-metadata">{entry.technologies.join(" · ")}</p>
                </div>
                {relatedProjects.length ? (
                  <div className="experience-row__projects">
                    <span className="type-label">Related projects</span>
                    <div>{relatedProjects.map((project) => <Link className="animated-link type-label" href={`/work/${project.slug}`} key={project.slug}>{project.name} <span aria-hidden="true">→</span></Link>)}</div>
                  </div>
                ) : null}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

export default function ExperiencePage() {
  const educationStart = professionalExperience.length + 1;
  const developmentStart = educationStart + educationExperience.length;

  return (
    <div className="experience-page">
      <header className="experience-hero editorial-container">
        <div className="experience-hero__top type-label"><span>Experience</span><span>Professional / education / practice</span></div>
        <h1 className="type-page-title">Learning through real products, <em>production systems and continuous practice.</em></h1>
        <p className="type-body">A record of professional contribution, application development, formal education, leadership, and technical workshops.</p>
        <span className="experience-hero__count type-metadata">{String(professionalExperience.length).padStart(2, "0")} professional entries</span>
      </header>

      <ExperienceGroup label="01 — Professional" title="Professional experience" entries={professionalExperience} startIndex={1} />
      <ExperienceGroup label="02 — Education" title="Formal education" entries={educationExperience} startIndex={educationStart} />
      <ExperienceGroup label="03 — Development" title="Leadership and workshops" entries={developmentExperience} startIndex={developmentStart} />

      <section className="experience-close">
        <div className="editorial-container experience-close__inner">
          <p className="type-label">Continue exploring</p>
          <h2>Experience becomes useful<br />when it shapes the next build.</h2>
          <div><Link className="animated-link type-label" href="/work">View selected work <span aria-hidden="true">→</span></Link><Link className="animated-link type-label" href="/contact">Start a conversation <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>
    </div>
  );
}
