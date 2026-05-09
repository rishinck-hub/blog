import { useEffect, useState } from 'react';
import { useGreeting } from '../hooks/useGreeting';
import { resumeUrl } from '../data';

const NAV_LINKS = ['Index', 'About', 'Work', 'Skills', 'Reels', 'Contact'];

export default function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const greeting = useGreeting();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        {/* Left: greeting */}
        <div className="nav__left">
          <div className="nav__greeting">{greeting}</div>
        </div>

        {/* Center: name + socials */}
        <div className="nav__center">
          <div className="nav__logo">
            Mohammed<span> Rishin C K</span>
          </div>
          <div className="nav__socials">
            <a href="https://www.linkedin.com/in/mohammed-rishin-c-k-a00525240/" target="_blank" rel="noreferrer">li</a>
            <span className="nav__sep">/</span>
            <a href="https://github.com/rishinck-hub" target="_blank" rel="noreferrer">gh</a>
            <span className="nav__sep">/</span>
            <a href="https://www.instagram.com/_rishin___ck" target="_blank" rel="noreferrer">ig</a>
          </div>
        </div>

        {/* Right: hamburger only */}
        <div className="nav__right">
          <button
            className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`nav__overlay ${menuOpen ? 'nav__overlay--visible' : ''}`}
        onClick={closeMenu}
      />

      {/* Sidebar */}
      <aside className={`nav__sidebar ${menuOpen ? 'nav__sidebar--open' : ''}`}>
        {/* Sidebar header */}
        <div className="nav__sidebar-header">
          <span className="nav__sidebar-label">Navigation</span>
          <button className="nav__sidebar-close" onClick={closeMenu} aria-label="Close menu">✕</button>
        </div>

        {/* Nav links — vertical */}
        <ul className="nav__sidebar-links">
          {NAV_LINKS.map((l, i) => (
            <li key={l} style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}>
              <a
                href={`#${l.toLowerCase()}`}
                className={`nav__sidebar-link ${active === l.toLowerCase() ? 'nav__sidebar-link--active' : ''}`}
                onClick={closeMenu}
              >
                <span className="nav__sidebar-link-n">0{i + 1}</span>
                <span className="nav__sidebar-link-name">{l}</span>
                <span className="nav__sidebar-link-arrow">↗</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom actions */}
        <div className="nav__sidebar-footer">
          <a href="#contact" className="nav__sidebar-cta" onClick={closeMenu}>
            Let's talk!
          </a>
          <a
            href={resumeUrl}
            download="Rishin_CK_Resume.pdf"
            className="nav__sidebar-resume"
            onClick={closeMenu}
          >
            <span>Download CV</span>
            <span>↓</span>
          </a>

          {/* Socials repeated at bottom */}
          <div className="nav__sidebar-socials">
            <a href="https://www.linkedin.com/in/mohammed-rishin-c-k-a00525240/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/rishinck-hub" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.instagram.com/_rishin___ck" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </aside>
    </>
  );
}
