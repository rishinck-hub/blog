import Reveal from '../components/Reveal';
import { projects } from '../data';

export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work__header">
        <Reveal>
          <h2 className="work__title">Selected<br />Work</h2>
        </Reveal>
        <Reveal delay={100}>
          <span className="work__count">{projects.length} Projects</span>
        </Reveal>
      </div>

      <div className="work__grid">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 60}>
            <div className={`work__item ${p.span === 'large' ? 'work__item--large' : ''}`} data-cursor>
              <div className="work__item-inner">
                <h3 className="work__item-name" style={{ whiteSpace: 'pre-line' }}>{p.name}</h3>
                <p className="work__item-tag">{p.tag}</p>
                <div className="work__item-dot" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
