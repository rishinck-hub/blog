import Reveal from '../components/Reveal';
import { services } from '../data';

export default function Skills() {
  return (
    <section id="skills" className="services">
      <div className="services__header">
        <Reveal>
          <h2 className="services__title">What I<br />Do Best</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="services__sub">
            Full-stack engineering from mobile to web, backed by strong
            database and infrastructure knowledge.
          </p>
        </Reveal>
      </div>

      <div className="services__list">
        {services.map((s, i) => (
          <Reveal key={s.name} delay={i * 80}>
            <div className="services__item" data-cursor>
              <span className="services__item-n">0{i + 1}</span>
              <span className="services__item-name">{s.name}</span>
              <div className="services__item-tags">
                {s.tags.map(t => (
                  <span key={t} className="services__item-tag">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
