import { useEffect, useState } from 'react';
import { useGreeting } from '../hooks/useGreeting';

const NAV_LINKS = ['Index', 'About', 'Work', 'Skills', 'Reels', 'Contact'];

export default function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const greeting = useGreeting();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      {/* Left: greeting / logo */}
      <div>
        <div className="nav__greeting">{greeting}</div>
      </div>

      {/* Center: socials + logo */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
        <div className="nav__logo">
          Mohammed<span> Rishin C K</span>
        </div>
        <div className="nav__socials">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">li</a>
          <span className="nav__sep">/</span>
          <a href="https://github.com/rishinck-hub" target="_blank" rel="noreferrer">gh</a>
          <span className="nav__sep">/</span>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">tw</a>
        </div>
      </div>

      {/* Right: nav links + CTA */}
      <div className="nav__right">
        <ul className="nav__links">
          {NAV_LINKS.map(l => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={active === l.toLowerCase() ? 'nav__link--active' : ''}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="nav__cta">Let's talk!</a>
      </div>
    </nav>
  );
}
