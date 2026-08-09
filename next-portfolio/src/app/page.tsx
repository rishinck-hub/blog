import Image from "next/image";

import { HomeMotion } from "@/components/animation/home-motion";
import { TextReveal } from "@/components/animation/text-reveal";
import { SelectedProjectsStage } from "@/components/projects/selected-projects-stage";
import { CapabilitiesAccordion } from "@/components/sections/capabilities-accordion";
import { AnimatedLink } from "@/components/ui/animated-link";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { createPageMetadata } from "@/lib/metadata";

import "./home.css";

export const metadata = createPageMetadata({ title: "Software Developer", description: "Mohammed Rishin C K builds dependable full-stack applications, backend systems, and refined web experiences.", path: "/" });

const selectedProjects = [projects[0], projects[2], projects[3]] as const;

const capabilities = [
  { number: "01", name: "Backend engineering", description: "Maintainable server-side systems and application logic grounded in hands-on Laravel, Django, Flask, and Python work.", technologies: "Laravel · Django REST · Flask · Python", project: "OnlineCheckWriter.com backend" },
  { number: "02", name: "Frontend development", description: "Responsive interfaces that make operational workflows clear, usable, and dependable across devices.", technologies: "React · Next.js · Tailwind CSS", project: "Cash Splitter" },
  { number: "03", name: "Databases", description: "Structured data models and practical persistence layers for full-stack products.", technologies: "MySQL · PostgreSQL · MongoDB · Firebase", project: "Clinic Management App" },
  { number: "04", name: "API development", description: "RESTful services, JWT authentication, role-based access, and frontend integration.", technologies: "Django REST · Laravel · REST API", project: "Clinic Management App" },
  { number: "05", name: "Delivery and DevOps", description: "Deployment and delivery workflows developed through portfolio applications and technical training.", technologies: "Vercel · Render · Azure · Docker · CI/CD", project: "File Management System" },
] as const;

export default function HomePage() {
  return (
    <div className="editorial-home">
      <HomeMotion />

      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__portrait home-reveal-image">
          <Image src="/profile.png" alt="Portrait of Mohammed Rishin C K" fill priority sizes="(max-width: 800px) 100vw, 58vw" />
        </div>
        <div className="home-hero__shade" aria-hidden="true" />
        <div className="home-hero__content editorial-container">
          <p className="home-status home-hero__animate"><span />Available for opportunities</p>
          <h1 id="home-title" className="home-hero__name type-hero" aria-label="Mohammed Rishin C K">
            <span className="home-hero__line"><span>Mohammed</span></span>
            <span className="home-hero__line"><span>Rishin C K</span></span>
          </h1>
          <p className="home-hero__role home-hero__animate type-label">Software developer — India</p>
          <p className="home-hero__statement home-hero__animate type-body-large">I build reliable digital systems<br />and refined web experiences.</p>
          <div className="home-hero__actions home-hero__animate type-label">
            <AnimatedLink href="/work">View selected work <span aria-hidden="true">→</span></AnimatedLink>
            <AnimatedLink href="/contact">Contact me <span aria-hidden="true">→</span></AnimatedLink>
          </div>
          <span className="home-hero__counter type-metadata" aria-hidden="true">00 / 05</span>
          <a className="home-hero__scroll type-label" href="#introduction">Scroll <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section id="introduction" className="home-intro editorial-section editorial-container">
        <div className="home-section-head home-animate">
          <p className="type-label">01 — Meet Rishin</p><span className="type-metadata">Developer / problem solver</span>
        </div>
        <div className="home-divider home-animate" />
        <div className="home-intro__grid">
          <TextReveal as="h2" className="type-section-heading" text="A developer focused on making complex digital products feel clear." />
          <div className="home-intro__image home-reveal-image">
            <Image src="/profile.png" alt="Mohammed Rishin C K" fill sizes="(max-width: 800px) 100vw, 34vw" />
          </div>
          <div className="home-intro__copy home-animate">
            <p className="type-body">I work across frontend and backend development, turning practical requirements into maintainable applications. My experience spans Laravel, React, Django REST, databases, and deployment workflows.</p>
            <AnimatedLink href="/about" className="type-label">More about me <span aria-hidden="true">→</span></AnimatedLink>
          </div>
        </div>
      </section>

      <section className="home-work editorial-section" aria-labelledby="selected-work-title">
        <div className="editorial-container">
          <div className="home-section-head home-animate"><p className="type-label">02 — Selected projects</p><span className="type-metadata">Public summaries only</span></div>
          <div className="home-divider home-animate" />
          <TextReveal as="h2" id="selected-work-title" className="type-section-heading home-work__heading" text="Selected systems, built with purpose." mode="line" lines={["Selected systems,", "built with purpose."]} />
        </div>
        <SelectedProjectsStage projects={selectedProjects} />
        <div className="editorial-container home-work__all"><AnimatedLink href="/work" className="type-label">Explore all projects <span aria-hidden="true">→</span></AnimatedLink></div>
      </section>

      <section className="home-capabilities editorial-section editorial-container" aria-labelledby="capabilities-title">
        <div className="home-section-head home-animate"><p className="type-label">03 — Capabilities</p><span className="type-metadata">What I work with</span></div>
        <div className="home-divider home-animate" />
        <TextReveal as="h2" id="capabilities-title" className="type-section-heading home-capabilities__heading" text="From application logic to the final interface." mode="line" lines={["From application logic", "to the final interface."]} />
        <CapabilitiesAccordion items={capabilities} />
      </section>

      <section className="home-experience editorial-section editorial-container" aria-labelledby="experience-title">
        <div className="home-section-head home-animate"><p className="type-label">04 — Experience</p><span className="type-metadata">Selected timeline</span></div>
        <div className="home-divider home-animate" />
        <TextReveal as="h2" id="experience-title" className="type-section-heading home-experience__heading" text="Learning through building, contributing, and shipping." mode="line" lines={["Learning through building,", "contributing, and shipping."]} />
        <div className="home-experience__list">
          {experience.slice(0, 2).map((item, index) => (
            <article className="home-experience__row home-animate" key={item.role}>
              <span className="type-metadata">0{index + 1}</span><h3>{item.role}</h3><p className="type-body">{item.organization}</p><time className="type-metadata">{item.period}</time>
            </article>
          ))}
        </div>
        <AnimatedLink href="/experience" className="type-label">View full experience <span aria-hidden="true">→</span></AnimatedLink>
      </section>

    </div>
  );
}
