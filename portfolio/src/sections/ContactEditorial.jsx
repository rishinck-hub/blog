import Reveal from '../components/Reveal';
import { resumeUrl, siteLinks } from '../data';

const LINKS = [
  { label: 'Email', value: 'rishinkpm@gmail.com', href: siteLinks.email, external: false },
  { label: 'LinkedIn', value: 'Connect professionally', href: siteLinks.linkedin, external: true },
  { label: 'GitHub', value: 'Explore my code', href: siteLinks.github, external: true },
  { label: 'WhatsApp', value: '+966 54 640 7613', href: siteLinks.whatsapp, external: true },
];

export default function ContactEditorial() {
  return (
    <section id="contact" className="contact section-shell">
      <div className="contact__header">
        <div className="section-kicker">
          <span>06</span>
          <p>Contact</p>
        </div>
        <Reveal>
          <h2>Have something<br /><em>worth building?</em></h2>
        </Reveal>
      </div>

      <div className="contact__content">
        <Reveal>
          <div className="contact__portrait">
            <img src="/profile.png" alt="Mohammed Rishin C K" loading="lazy" />
          </div>
        </Reveal>

        <div className="contact__body">
          <p>
            I’m open to software-development opportunities, useful collaborations,
            and thoughtful conversations about digital products.
          </p>
          <div className="contact__links">
            {LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
              >
                <span>{link.label}</span>
                <strong>{link.value}</strong>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
          <a className="button" href={resumeUrl} download="Mohammed_Rishin_CK_Resume_Software_developer.pdf">
            Download résumé <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
