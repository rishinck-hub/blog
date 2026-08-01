import { Reveal } from "@/components/animation/reveal";
import { experience } from "@/data/experience";

export function ExperienceSection({ limit }: Readonly<{ limit?: number }>) {
  const visibleExperience = limit ? experience.slice(0, limit) : experience;
  return (
    <section id="experience" className="xp">
      <Reveal><h2 className="xp__title">Journey &amp;<br />Experience</h2></Reveal>
      <div className="xp__list">
        {visibleExperience.map((entry, index) => (
          <Reveal key={`${entry.period}-${entry.role}`} delay={index * 80}>
            <div className="xp__item" data-cursor>
              <span className="xp__period">{entry.period}</span>
              <div><h3 className="xp__role">{entry.role}</h3><p className="xp__org">{entry.organization}</p><p className="xp__desc">{entry.description}</p></div>
              <span className="xp__arrow" aria-hidden="true">↗</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
