import Link from "next/link";

import { Reveal } from "@/components/animation/reveal";
import { projects } from "@/data/projects";

export function WorkSection({ limit, showHeader = true }: Readonly<{ limit?: number; showHeader?: boolean }>) {
  const visibleProjects = limit ? projects.slice(0, limit) : projects;
  return (
    <section id="work" className="work">
      {showHeader ? (
        <div className="work__header">
          <Reveal><h2 className="work__title">Selected<br />Work</h2></Reveal>
          <Reveal delay={100}><span className="work__count">{visibleProjects.length} {limit ? "Featured" : "Projects"}</span></Reveal>
        </div>
      ) : null}
      <div className="work__grid">
        {visibleProjects.map((project, index) => {
          const large = index === 0 || project.slug === "cash-splitter";
          return (
            <Reveal key={project.slug} delay={index * 60} className={`work__cell ${large ? "work__cell--large" : ""}`}>
              <Link className={`work__item ${large ? "work__item--large" : ""}`} href={`/work/${project.slug}`} data-cursor>
                <div className="work__item-inner">
                  <div className="work__item-meta"><span>0{index + 1}</span><span>Project details</span></div>
                  <h3 className="work__item-name">{project.name}</h3>
                  <p className="work__item-tag">{project.technologies.join(" · ")}</p>
                  {project.description ? <p className="work__item-desc">{project.description}</p> : null}
                  <span className="work__item-link">View Project ↗</span>
                  <div className="work__item-dot" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
