import { Reveal } from "@/components/animation/reveal";
import { services } from "@/data/site";

export function SkillsSection({ limit }: Readonly<{ limit?: number }>) {
  const visibleServices = limit ? services.slice(0, limit) : services;
  return (
    <section id="skills" className="services">
      <div className="services__header">
        <Reveal><h2 className="services__title">What I<br />Do Best</h2></Reveal>
        <Reveal delay={100}><p className="services__sub">Full-stack engineering from mobile to web, backed by strong database and infrastructure knowledge.</p></Reveal>
      </div>
      <div className="services__list">
        {visibleServices.map((service, index) => (
          <Reveal key={service.name} delay={index * 80}>
            <div className="services__item" data-cursor>
              <span className="services__item-n">0{index + 1}</span>
              <span className="services__item-name">{service.name}</span>
              <div className="services__item-tags">
                {service.tags.map((tag) => <span key={tag} className="services__item-tag">{tag}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
