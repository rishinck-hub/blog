import Image from "next/image";

import { HomeMotion } from "@/components/animation/home-motion";
import { ContactModalTrigger } from "@/components/contact/contact-modal";
import { TextReveal } from "@/components/animation/text-reveal";
import { SelectedProjectsStage } from "@/components/projects/selected-projects-stage";
import { CapabilitiesAccordion } from "@/components/sections/capabilities-accordion";
import { AnimatedLink } from "@/components/ui/animated-link";
import { experience, getProject, homeContent, pageMetadata } from "@/data";
import { createPageMetadata } from "@/lib/metadata";

import "./home.css";

export const metadata = createPageMetadata(pageMetadata.home);

const selectedProjects = homeContent.featuredProjectSlugs.map(getProject).filter((project) => project !== undefined);

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
          <p className="home-status home-hero__animate"><span />{homeContent.hero.availability}</p>
          <h1 id="home-title" className="home-hero__name type-hero" aria-label="Mohammed Rishin C K">
            <span className="home-hero__line"><span>{homeContent.hero.firstNameLine}</span></span>
            <span className="home-hero__line"><span>{homeContent.hero.secondNameLine}</span></span>
          </h1>
          <p className="home-hero__role home-hero__animate type-label">{homeContent.hero.role}</p>
          <p className="home-hero__statement home-hero__animate type-body-large">{homeContent.hero.statement}</p>
          <div className="home-hero__actions home-hero__animate type-label">
            <AnimatedLink href="/work">View selected work <span aria-hidden="true">→</span></AnimatedLink>
            <ContactModalTrigger className="animated-link type-navigation">Contact me <span aria-hidden="true">→</span></ContactModalTrigger>
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
          <TextReveal as="h2" className="type-section-heading" text={homeContent.introduction.heading} />
          <div className="home-intro__image home-reveal-image">
            <Image src="/profile.png" alt="Mohammed Rishin C K" fill sizes="(max-width: 800px) 100vw, 34vw" />
          </div>
          <div className="home-intro__copy home-animate">
            <p className="type-body">{homeContent.introduction.body}</p>
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
        <CapabilitiesAccordion items={homeContent.capabilities} />
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
