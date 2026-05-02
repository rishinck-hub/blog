import Reveal from '../components/Reveal';
import { experience } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="xp">
      <Reveal>
        <h2 className="xp__title">Journey &<br />Experience</h2>
      </Reveal>
      <div className="xp__list">
        {experience.map((e, i) => (
          <Reveal key={e.role} delay={i * 80}>
            <div className="xp__item" data-cursor>
              <span className="xp__period">{e.period}</span>
              <div>
                <h3 className="xp__role">{e.role}</h3>
                <p className="xp__org">{e.org}</p>
                <p className="xp__desc">{e.desc}</p>
              </div>
              <span className="xp__arrow">↗</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
