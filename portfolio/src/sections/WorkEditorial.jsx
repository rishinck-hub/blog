import Reveal from '../components/Reveal';
import { projects } from '../data';

function ProjectRow({ project, index }) {
  const liveProject = project.links?.find(link => link.label === 'Live demo');

  return (
    <article className="work__project">
      <div className="work__item">
        <div className="work__number">{String(index + 1).padStart(2, '0')}</div>
        <div className="work__identity">
          <p>{project.category}{project.year ? ` / ${project.year}` : ''}</p>
          <h3>{project.name}</h3>
        </div>
        <p className="work__description">{project.desc}</p>
        <div className="work__meta">
          <span>{project.tag}</span>
          <small>{project.context}</small>
        </div>
      </div>

      <details className="project-details">
        <summary>
          <span className="project-details__label">
            <span>View full description</span>
            <span>Close description</span>
          </span>
          <span className="project-details__toggle" aria-hidden="true">+</span>
        </summary>
        <div className="project-details__body">
          {project.image && (
            <a
              className="project-preview"
              href={liveProject?.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open the ${project.name} live demo`}
            >
              <span className="project-preview__image">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  width="1024"
                  height="1536"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="project-preview__caption">
                <span>Project preview</span>
                <span>Open live project <span aria-hidden="true">↗</span></span>
              </span>
            </a>
          )}
          <p className="eyebrow">What I built</p>
          <ul>
            {project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
          </ul>
          {project.links?.length > 0 && (
            <div className="project-details__links">
              {project.links.map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </details>
    </article>
  );
}

export default function WorkEditorial({ limit, showHeader = true }) {
  const visibleProjects = limit
    ? projects.filter(project => project.featured).slice(0, limit)
    : projects;

  return (
    <section id="work" className="work section-shell section-shell--dark">
      {showHeader && (
        <div className="section-heading">
          <div className="section-kicker section-kicker--light">
            <span>02</span>
            <p>Selected work</p>
          </div>
          <Reveal>
            <h2>Products shaped for<br /><em>real-world use.</em></h2>
          </Reveal>
          <p className="section-heading__note">
            Full-stack, backend, mobile, and cloud projects—from production team
            contributions to independent builds.
          </p>
        </div>
      )}

      <div className="work__list">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.name} delay={index * 45}>
            <ProjectRow project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
