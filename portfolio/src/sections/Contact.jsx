import Reveal from '../components/Reveal';

const LINKS = [
  { label: 'Email',    val: 'rishin@example.com',        href: 'mailto:rishin@example.com' },
  { label: 'LinkedIn', val: 'linkedin.com/in/rishin',     href: 'https://linkedin.com' },
  { label: 'GitHub',   val: 'github.com/rishinck-hub',   href: 'https://github.com/rishinck-hub' },
  { label: 'WhatsApp', val: '+91 XXXXX XXXXX',            href: 'https://wa.me/' },
];

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__left">
        <Reveal>
          <div className="contact__label">Got a project in mind?</div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="contact__title">
            Let's make<br />something<br /><span>happen</span>
          </h2>
        </Reveal>

        <div className="contact__links">
          {LINKS.map((l, i) => (
            <Reveal key={l.label} delay={i * 70}>
              <a className="contact__link" href={l.href} target="_blank" rel="noreferrer" data-cursor>
                <div>
                  <div className="contact__link-label">{l.label}</div>
                  <div className="contact__link-val">{l.val}</div>
                </div>
                <span className="contact__link-arrow">↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal dir="right" className="contact__right">
        <div className="contact__photo">
          <img src="https://rishinck-hub.github.io/Portfolio/images/rishin_poster.png" alt="Mohammed Rishin C K" />
        </div>
      </Reveal>
    </section>
  );
}
