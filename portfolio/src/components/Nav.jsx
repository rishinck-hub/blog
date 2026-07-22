import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGreeting } from '../hooks/useGreeting';
import { resumeUrl } from '../data';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Experience', href: '/experience' },
  { label: 'Creative', href: '/creative' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const greeting = useGreeting();
  const { pathname } = useLocation();

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

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = event => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
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
          <Link to="/" className="nav__logo" onClick={closeMenu}>
            Mohammed<span> Rishin C K</span>
          </Link>
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
          <div className="nav__quick-links" aria-label="Primary navigation">
            {NAV_LINKS.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={pathname === item.href ? 'nav__quick-link nav__quick-link--active' : 'nav__quick-link'}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            className={`nav__hamburger ${menuOpen ? 'nav__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="navigation-sidebar"
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
      <aside id="navigation-sidebar" className={`nav__sidebar ${menuOpen ? 'nav__sidebar--open' : ''}`} aria-hidden={!menuOpen} inert={menuOpen ? undefined : ''}>
        {/* Sidebar header */}
        <div className="nav__sidebar-header">
          <span className="nav__sidebar-label">Navigation</span>
          <button className="nav__sidebar-close" onClick={closeMenu} aria-label="Close menu">✕</button>
        </div>

        {/* Nav links — vertical */}
        <ul className="nav__sidebar-links">
          {NAV_LINKS.map((item, i) => (
            <li key={item.href} style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}>
              <Link
                to={item.href}
                className={`nav__sidebar-link ${pathname === item.href ? 'nav__sidebar-link--active' : ''}`}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={closeMenu}
              >
                <span className="nav__sidebar-link-n">0{i + 1}</span>
                <span className="nav__sidebar-link-name">{item.label}</span>
                <span className="nav__sidebar-link-arrow">↗</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom actions */}
        <div className="nav__sidebar-footer">
          <Link to="/contact" className="nav__sidebar-cta" onClick={closeMenu}>
            Let's talk!
          </Link>
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
