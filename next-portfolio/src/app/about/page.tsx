import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { RevealImage } from "@/components/animation/reveal-image";
import { TextReveal } from "@/components/animation/text-reveal";
import { AnimatedLink } from "@/components/ui/animated-link";
import { siteConfig, technologies } from "@/data/site";

import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: "About Mohammed Rishin C K, his development approach, current focus, and creative interests.",
};

const principles = [
  {
    number: "01",
    title: "Understand before building",
    text: "I start with the problem, the people using the product, and the constraints around it. Technology follows that understanding—not the other way around.",
  },
  {
    number: "02",
    title: "Make complexity legible",
    text: "Whether I am shaping an interface, an API, or a data model, I look for a structure that is clear to use and straightforward to maintain.",
  },
  {
    number: "03",
    title: "Build, test, refine",
    text: "My approach is practical and iterative: break the work into useful parts, connect the system carefully, and improve it through feedback and verification.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-hero editorial-container">
        <div className="about-hero__top type-label"><span>About — Rishin</span><span>Software developer / India</span></div>
        <TextReveal as="h1" className="about-hero__title type-page-title" text="I build software by understanding the problem before choosing the solution." />
        <p className="about-hero__intro type-body-large">Full-stack developer working across dependable backend systems, thoughtful interfaces, databases, and practical delivery workflows.</p>
        <span className="about-hero__counter type-metadata">01 / 05</span>
      </header>

      <section className="about-portrait editorial-container" aria-label="Portrait and biography">
        <RevealImage className="about-portrait__image">
          <Image src="/profile.png" alt="Portrait of Mohammed Rishin C K" fill priority sizes="(max-width: 700px) 100vw, 70vw" />
        </RevealImage>
        <div className="about-portrait__caption type-metadata"><span>Mohammed Rishin C K</span><span>Software developer</span></div>
      </section>

      <section className="about-bio editorial-section editorial-container">
        <div className="about-section-label type-label">01 — Biography</div>
        <div className="about-bio__content">
          <TextReveal as="h2" className="type-section-heading" text="Engineering with context, curiosity, and care." />
          <div className="about-bio__copy type-body">
            <p>I am a software developer with experience building full-stack applications using React, Laravel, Django REST, and database technologies. I currently contribute to software development work during my internship at Zil Money.</p>
            <p>My B.Tech Computer Science background and full-stack development training have given me opportunities to work across web applications, mobile development, APIs, deployment, and cloud tooling.</p>
            <div className="about-bio__actions">
              <a className="animated-link type-label" href={siteConfig.resumeUrl} download>Download résumé <span aria-hidden="true">↓</span></a>
              <AnimatedLink href="/contact" className="type-label">Contact me <span aria-hidden="true">→</span></AnimatedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="about-philosophy editorial-section">
        <div className="editorial-container">
          <div className="about-section-label type-label">02 — Development philosophy</div>
          <TextReveal as="h2" className="about-philosophy__title type-section-heading" text="Clear thinking before clean code." />
          <div className="about-principles">
            {principles.map((principle) => (
              <article className="about-principle" key={principle.number}>
                <span className="type-metadata">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p className="type-body">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-focus editorial-section editorial-container">
        <div className="about-section-label type-label">03 — Current focus</div>
        <div className="about-focus__grid">
          <TextReveal as="h2" className="type-section-heading" text="Growing across the full product stack." />
          <div className="about-focus__copy type-body">
            <p>My current professional focus is backend and full-stack development with Laravel, MySQL, React, and REST APIs. Alongside that work, I continue strengthening frontend architecture, database design, deployment, Docker, and CI/CD fundamentals.</p>
            <p>I learn most effectively by applying concepts in real applications—from clinic and file-management systems to smaller utilities and mobile experiments.</p>
          </div>
          <div className="about-stack" aria-label="Technologies in the existing portfolio">
            {technologies.map((technology, index) => <span key={technology}><small>{String(index + 1).padStart(2, "0")}</small>{technology}</span>)}
          </div>
        </div>
      </section>

      <section className="about-creative editorial-section">
        <div className="editorial-container about-creative__grid">
          <div className="about-section-label type-label">04 — Creative interests</div>
          <TextReveal as="h2" className="about-creative__title" text="Code gives ideas structure. Editing gives stories rhythm." />
          <div className="about-creative__copy">
            <p className="type-body-large">Outside software development, I explore video editing and visual storytelling through cinematic shorts, promotional edits, travel videos, event coverage, and social content.</p>
            <p className="type-body">Working with DaVinci Resolve and social media projects gives me another way to think about pacing, hierarchy, and communicating an idea clearly.</p>
            <AnimatedLink href="/creative" className="type-label">Explore creative work <span aria-hidden="true">→</span></AnimatedLink>
          </div>
          <div className="about-creative__words" aria-hidden="true"><span>EDIT</span><span>RHYTHM</span><span>STORY</span></div>
        </div>
      </section>

      <section className="about-close">
        <div className="editorial-container about-close__inner">
          <p className="type-label">05 — Let&apos;s talk</p>
          <h2>Have a problem<br />worth understanding?</h2>
          <div><AnimatedLink href="/contact" className="type-label">Start a conversation <span aria-hidden="true">→</span></AnimatedLink><Link href="/work" className="type-label">View selected work →</Link></div>
        </div>
      </section>
    </div>
  );
}
