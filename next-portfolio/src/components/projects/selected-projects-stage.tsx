"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { AnimatedLink } from "@/components/ui/animated-link";
import { createLocalPointerMotion } from "@/lib/local-pointer-motion";
import { motion, shouldReduceAdvancedMotion } from "@/lib/motion";
import type { Project } from "@/types/content";

const stageTones = [
  { background: "#faf9f6", foreground: "#111111" },
  { background: "#080808", foreground: "#f4f2ed" },
  { background: "#d9d6cf", foreground: "#111111" },
] as const;

export function SelectedProjectsStage({ projects }: Readonly<{ projects: readonly Project[] }>) {
  const stageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const counter = counterRef.current;
    if (!stage || !counter || projects.length < 2 || shouldReduceAdvancedMotion()) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(hover: hover) and (pointer: fine) and (min-width: 901px) and (min-height: 650px)", () => {
        const pin = stage.querySelector<HTMLElement>(".selected-projects-stage__pin");
        const articles = gsap.utils.toArray<HTMLElement>(".home-project-scene");
        if (!pin || articles.length !== projects.length) return;

        stage.classList.add("is-enhanced");
        gsap.set(articles, { zIndex: (index) => index + 1 });
        gsap.set(articles.slice(1), { autoAlpha: 0 });

        const removePointerMotion = articles.map((article) => {
          const area = article.querySelector<HTMLElement>(".home-project-scene__primary");
          const layer = article.querySelector<HTMLElement>(".home-project-scene__pointer-layer");
          return area && layer
            ? createLocalPointerMotion(area, layer, { x: motion.pointer.secondary.x, y: motion.pointer.secondary.y, rotation: 0.3 })
            : () => {};
        });

        const timeline = gsap.timeline();
        articles.slice(1).forEach((next, index) => {
          const current = articles[index];
          const at = index;
          const tone = stageTones[(index + 1) % stageTones.length];
          timeline
            .to(current.querySelector(".home-project-scene__primary"), { xPercent: -3, scale: 0.99, autoAlpha: 0.38, duration: 1, ease: "none" }, at)
            .to(current.querySelector(".home-project-scene__title"), { x: -motion.distance.medium, autoAlpha: 0, duration: 0.65, ease: motion.ease.exit }, at)
            .to(current.querySelector(".home-project-scene__meta"), { y: -motion.distance.small, autoAlpha: 0, duration: 0.5, ease: motion.ease.exit }, at)
            .to(current, { autoAlpha: 0, duration: 0.75, ease: motion.ease.exit }, at + 0.2)
            .fromTo(next, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55, ease: motion.ease.reveal }, at + 0.2)
            .fromTo(next.querySelector(".home-project-scene__primary"), { clipPath: "inset(0 0 0 100%)", scale: 1.035, xPercent: 4 }, { clipPath: "inset(0)", scale: 1, xPercent: 0, duration: motion.timing.image.duration, ease: motion.ease.reveal }, at + 0.15)
            .fromTo(next.querySelector(".home-project-scene__secondary"), { xPercent: 6, yPercent: 4 }, { xPercent: 0, yPercent: -2, duration: 1, ease: "none" }, at + 0.2)
            .fromTo(next.querySelector(".home-project-scene__title"), { x: motion.distance.medium, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: motion.timing.text.duration, ease: motion.ease.reveal }, at + 0.28)
            .fromTo(next.querySelector(".home-project-scene__meta"), { y: motion.distance.small, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: motion.duration.normal, ease: motion.ease.reveal }, at + 0.4)
            .to(pin, { backgroundColor: tone.background, color: tone.foreground, duration: 0.75, ease: "none" }, at);
        });

        const scrollTrigger = ScrollTrigger.create({
          trigger: stage,
          start: "top top",
          end: () => `+=${window.innerHeight * (projects.length - 1) * 0.78}`,
          animation: timeline,
          pin,
          scrub: motion.timing.scroll.scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const activeIndex = Math.min(projects.length - 1, Math.round(self.progress * (projects.length - 1)));
            counter.textContent = String(activeIndex + 1).padStart(2, "0");
            stage.dataset.activeIndex = String(activeIndex);
          },
        });

        return () => {
          removePointerMotion.forEach((remove) => remove());
          scrollTrigger.kill();
          stage.classList.remove("is-enhanced");
          delete stage.dataset.activeIndex;
        };
      });
    }, stage);

    return () => {
      media.revert();
      context.revert();
    };
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

        <div className="selected-projects-stage__progress type-metadata" aria-hidden="true">
          <span ref={counterRef}>01</span><span> / {String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}
