import { Link } from 'react-router-dom';

export default function HeroEditorial() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__meta">
        <span>Kerala, India · Riyadh, Saudi Arabia</span>
        <span>Portfolio / 2026</span>
      </div>

      <div className="hero__copy">
        <p className="eyebrow">Software developer · PHP · Laravel · React.js · Python · Django</p>
        <h1 id="hero-title">
          I build dependable<br />
          <em>digital products.</em>
        </h1>
        <div className="hero__intro">
          <p>
            I’m Mohammed Rishin C K, a software developer with backend, API, and
            fintech-integration experience using PHP, Laravel, React.js, Python,
            Django REST Framework, MySQL, and PostgreSQL.
          </p>
          <div className="hero__actions">
            <Link className="button" to="/work">Explore my work <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="mailto:rishinkpm@gmail.com">rishinkpm@gmail.com</a>
          </div>
        </div>
      </div>

      <figure className="hero__portrait">
        <img src="/profile.png" alt="Portrait of Mohammed Rishin C K" fetchPriority="high" />
        <figcaption>
          <span><i /> Available for opportunities</span>
          <span>Software developer</span>
        </figcaption>
      </figure>

      <a className="hero__scroll" href="#about">
        Scroll to discover <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
