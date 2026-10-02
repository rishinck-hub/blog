import Reveal from '../components/Reveal';
import { experience } from '../data';

export default function ExperienceEditorial({ limit }) {
  const visibleExperience = limit ? experience.slice(0, limit) : experience;

  return (
    <section id="experience" className="xp section-shell">
      <div className="section-heading section-heading--split">
        <div className="section-kicker">
          <span>04</span>
          <p>Experience</p>
        </div>
        <Reveal>
          <h2>Learning through<br /><em>building.</em></h2>
        </Reveal>
        <p className="section-heading__note">
          Professional work, focused training, education, and community leadership.
        </p>
      </div>

      <div className="xp__list">
        {visibleExperience.map((item, index) => (
          <Reveal key={`${item.role}-${item.period}`} delay={index * 45}>
            <article className="xp__item">
              <span className="xp__period">{item.period}</span>
              <div>
                <h3>{item.role}</h3>
                <p className="xp__org">{item.org}</p>
              </div>
              <p className="xp__description">{item.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
