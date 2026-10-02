import Reveal from '../components/Reveal';
import { services } from '../data';

export default function SkillsEditorial({ limit }) {
  const visibleServices = limit ? services.slice(0, limit) : services;

  return (
    <section id="skills" className="services section-shell">
      <div className="section-heading section-heading--split">
        <div className="section-kicker">
          <span>03</span>
          <p>Capabilities</p>
        </div>
        <Reveal>
          <h2>From first idea to<br /><em>working product.</em></h2>
        </Reveal>
        <p className="section-heading__note">
          I connect backend logic, third-party APIs, data, interfaces, and deployment
          to build dependable product workflows.
        </p>
      </div>

      <div className="services__list">
        {visibleServices.map((service, index) => (
          <Reveal key={service.name} delay={index * 45}>
            <article className="services__item">
              <span className="services__number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <ul aria-label={`${service.name} technologies`}>
                {service.tags.map(tag => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
