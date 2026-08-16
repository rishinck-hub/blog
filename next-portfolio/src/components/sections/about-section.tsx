import { Reveal } from "@/components/animation/reveal";
import { technologies } from "@/data";

export function AboutSection({ compact = false }: Readonly<{ compact?: boolean }>) {
  const visibleTechnologies = compact ? technologies.slice(0, 8) : technologies;
  return (
    <section id="about" className="intro">
      <div className="intro__photo-bg" />
      <div className="intro__left">
        <Reveal><span className="intro__left-label">Technologies I use</span></Reveal>
        <div>
          <Reveal delay={80}><p className="intro__clients-title">Stack &amp; Tools</p></Reveal>
          <div className="intro__clients-grid">
            {visibleTechnologies.map((technology, index) => (
              <Reveal key={technology} delay={index * 50}>
                <div className="intro__client"><span className="intro__client-dot" />{technology}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <div className="intro__right">
        <Reveal><div className="intro__label-tag">Intro</div></Reveal>
        <Reveal delay={100}>
          <p className="intro__text">Apps should be fast, elegant, and built to last. I design and engineer experiences that feel effortless to use.</p>
        </Reveal>
        <Reveal delay={180}>
          <p className="intro__text2">By combining <strong>Laravel and React full-stack engineering</strong> with a strong foundation in MySQL and databases, I&apos;ve built apps that are production-ready and maintainable.</p>
        </Reveal>
        {!compact ? (
          <Reveal delay={240}>
            <p className="intro__text3">My goal is to write code that is not only functional but elegant — solving real problems with clean architecture. I believe great software is a positive force in people&apos;s lives.</p>
          </Reveal>
        ) : null}
        <Reveal delay={300}><a href="#work" className="intro__cta" data-cursor aria-label="Continue to selected work">↓</a></Reveal>
      </div>
    </section>
  );
}
