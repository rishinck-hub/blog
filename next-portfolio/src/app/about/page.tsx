import Image from "next/image";
import Link from "next/link";

import { RevealImage } from "@/components/animation/reveal-image";
import { TextReveal } from "@/components/animation/text-reveal";
import { AnimatedLink } from "@/components/ui/animated-link";
import { DraggableStrip } from "@/components/ui/draggable-strip";
import { aboutContent, pageMetadata, siteConfig, technologies } from "@/data";
import { createPageMetadata } from "@/lib/metadata";

import "./about.css";

export const metadata = createPageMetadata(pageMetadata.about);

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-hero editorial-container">
        <div className="about-hero__top type-label"><span>About — Rishin</span><span>Software developer / India</span></div>
        <TextReveal as="h1" className="about-hero__title type-page-title" text={aboutContent.hero.heading} mode="line" trigger="load" />
        <p className="about-hero__intro type-body-large">{aboutContent.hero.introduction}</p>
        <span className="about-hero__counter type-metadata">01 / 05</span>
      </header>

      <section className="about-portrait editorial-container" aria-label="Portrait and biography">
        <RevealImage className="about-portrait__image">
          <Image src="/profile.png" alt="Portrait of Mohammed Rishin C K" fill sizes="(max-width: 700px) 100vw, 70vw" />
        </RevealImage>
        <div className="about-portrait__caption type-metadata"><span>Mohammed Rishin C K</span><span>Software developer</span></div>
      </section>

      <section className="about-bio editorial-section editorial-container">
        <div className="about-section-label type-label">01 — Biography</div>
        <div className="about-bio__content">
          <TextReveal as="h2" className="type-section-heading" text={aboutContent.biography.heading} />
          <div className="about-bio__copy type-body">
            {aboutContent.biography.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
          <DraggableStrip label="Development philosophy steps" viewportClassName="about-principles">
            {aboutContent.principles.map((principle) => (
              <article className="about-principle" key={principle.number}>
                <span className="type-metadata">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p className="type-body">{principle.text}</p>
              </article>
            ))}
          </DraggableStrip>
        </div>
      </section>

      <section className="about-focus editorial-section editorial-container">
        <div className="about-section-label type-label">03 — Current focus</div>
        <div className="about-focus__grid">
          <TextReveal as="h2" className="type-section-heading" text={aboutContent.focus.heading} />
          <div className="about-focus__copy type-body">
            {aboutContent.focus.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="about-stack" aria-label="Technologies in the existing portfolio">
            {technologies.map((technology, index) => <span key={technology}><small>{String(index + 1).padStart(2, "0")}</small>{technology}</span>)}
          </div>
        </div>
      </section>

      <section className="about-creative editorial-section">
        <div className="editorial-container about-creative__grid">
          <div className="about-section-label type-label">04 — Creative interests</div>
          <TextReveal as="h2" className="about-creative__title" text={aboutContent.creative.heading} />
          <div className="about-creative__copy">
            <p className="type-body-large">{aboutContent.creative.paragraphs[0]}</p>
            <p className="type-body">{aboutContent.creative.paragraphs[1]}</p>
            <AnimatedLink href="/creative" className="type-label">Explore creative work <span aria-hidden="true">→</span></AnimatedLink>
          </div>
          <div className="about-creative__words" aria-hidden="true"><span>EDIT</span><span>RHYTHM</span><span>STORY</span></div>
        </div>
      </section>

      <section className="about-close">
        <div className="editorial-container about-close__inner">
          <p className="type-label">05 — Let&apos;s talk</p>
          <TextReveal as="h2" text="Have a problem worth understanding?" mode="line" lines={["Have a problem", "worth understanding?"]} />
          <div><AnimatedLink href="/contact" className="type-label">Start a conversation <span aria-hidden="true">→</span></AnimatedLink><Link href="/work" className="type-label">View selected work →</Link></div>
        </div>
      </section>
    </div>
  );
}
