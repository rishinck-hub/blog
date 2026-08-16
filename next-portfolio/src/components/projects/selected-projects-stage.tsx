"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import { AnimatedLink } from "@/components/ui/animated-link";
import { createLocalPointerMotion } from "@/lib/local-pointer-motion";
import { motion, shouldReduceAdvancedMotion } from "@/lib/motion";
import type { Project } from "@/types/content";

export function SelectedProjectsStage({ projects }: Readonly<{ projects: readonly Project[] }>) {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage || shouldReduceAdvancedMotion()) return;
    const removers = Array.from(stage.querySelectorAll<HTMLElement>(".home-project-scene")).map((article) => {
      const area = article.querySelector<HTMLElement>(".home-project-scene__primary");
      const layer = article.querySelector<HTMLElement>(".home-project-scene__pointer-layer");
      return area && layer ? createLocalPointerMotion(area, layer, { x: motion.pointer.secondary.x, y: motion.pointer.secondary.y, rotation: 0.3 }) : () => {};
    });
    return () => removers.forEach((remove) => remove());
  }, [projects]);

  return (
    <div ref={stageRef} className="selected-projects-stage">
      <div className="selected-projects-stage__pin">
        {projects.map((project, index) => {
          const number = String(index + 1).padStart(2, "0");
          return (
            <article className={`home-project-scene home-project-scene--${project.visualTone}`} key={project.slug}>
              <div className="home-project-scene__top">
                <span className="type-metadata">{number} / {String(projects.length).padStart(2, "0")}</span>
                <span className="type-label">{project.category}</span>
                <span className="type-metadata">{project.isConfidential ? "Public summary / neutral visual" : "Selected project"}</span>
              </div>

              <div className="home-project-scene__layout">
                <div className="home-project-scene__copy">
                  <h3 className="home-project-scene__title">{project.name}</h3>
                  <p className="type-body">{project.description}</p>
                </div>

                <Link href={`/work/${project.slug}`} className="home-project-scene__primary" data-cursor-label="View project">
                  <span className="home-project-scene__pointer-layer" aria-hidden="true">
                    <span className="home-project-scene__visual-index">{number}</span>
                    <span className="home-project-scene__visual-name">{project.name}</span>
                  </span>
                  <span className="home-project-scene__visual-link type-label">View project <span aria-hidden="true">→</span></span>
                </Link>

                <div className="home-project-scene__secondary" aria-hidden="true">
                  <span className="type-label">Technology detail</span>
                  <strong>{project.technologies[0]}</strong>
                  <span>{project.technologies.slice(1).join(" / ")}</span>
                </div>
              </div>

              <div className="home-project-scene__meta">
                <dl className="type-metadata">
                  <div><dt>Role</dt><dd>{project.role}</dd></div>
                  <div><dt>Year</dt><dd>{project.year}</dd></div>
                  <div><dt>Technology</dt><dd>{project.technologies.join(" · ")}</dd></div>
                </dl>
                <AnimatedLink href={`/work/${project.slug}`} className="type-label">Read case study <span aria-hidden="true">→</span></AnimatedLink>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
