import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { resumeUrl } from '../data';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Experience', href: '/experience' },
  { label: 'Creative', href: '/creative' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('a')?.focus();

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = panelRef.current?.querySelectorAll('a, button');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
        <Link className="site-nav__brand" to="/" aria-label="Mohammed Rishin C K — Home">
          <span>Rishin</span>
          <small>Software developer</small>
        </Link>

        <nav className="site-nav__links" aria-label="Primary navigation">
          {NAV_LINKS.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={pathname === item.href ? 'is-active' : ''}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-nav__actions">
          <Link className="button button--small" to="/contact">Let’s talk <span aria-hidden="true">↗</span></Link>
          <button
            ref={triggerRef}
            className="menu-trigger"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMenuOpen(open => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <button
        className={`menu-backdrop ${menuOpen ? 'is-visible' : ''}`}
        type="button"
        aria-label="Close navigation"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
      <aside
        ref={panelRef}
        id="mobile-navigation"
        className={`menu-panel ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className="menu-panel__top">
          <span>Navigate</span>
          <button type="button" onClick={closeMenu} aria-label="Close navigation">Close</button>
        </div>
        <nav className="menu-panel__links">
          {NAV_LINKS.map((item, index) => (
            <Link key={item.href} to={item.href} onClick={closeMenu}>
              <small>0{index + 1}</small>
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link to="/contact" onClick={closeMenu}>
            <small>06</small>
            <span>Contact</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <a className="menu-panel__resume" href={resumeUrl} download="Mohammed_Rishin_CK_Resume_Software_developer.pdf">
          Download résumé <span aria-hidden="true">↓</span>
        </a>
      </aside>
    </>
  );
}
