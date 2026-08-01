"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/data/site";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Good night!";
  if (hour < 12) return "Good morning!";
  if (hour < 17) return "Good afternoon!";
  if (hour < 21) return "Good evening!";
  return "Good night!";
}

export function SiteNavigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("Hello!");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setGreeting(getGreeting()));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`} aria-label="Primary navigation">
        <div className="nav__left">
          <div className="nav__greeting">{greeting}</div>
        </div>
        <div className="nav__center">
          <Link href="/" className="nav__logo" onClick={closeMenu}>
            Mohammed<span> Rishin C K</span>
          </Link>
          <div className="nav__socials">
            <a href={siteConfig.socials[1].href} target="_blank" rel="noreferrer">li</a>
            <span className="nav__sep">/</span>
            <a href={siteConfig.socials[2].href} target="_blank" rel="noreferrer">gh</a>
            <span className="nav__sep">/</span>
            <a href={siteConfig.socials[3].href} target="_blank" rel="noreferrer">ig</a>
          </div>
        </div>
        <div className="nav__right">
          <div className="nav__quick-links">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? "nav__quick-link nav__quick-link--active" : "nav__quick-link"}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            ref={menuButtonRef}
            className={`nav__hamburger ${menuOpen ? "nav__hamburger--open" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="navigation-sidebar"
            type="button"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <button
        className={`nav__overlay ${menuOpen ? "nav__overlay--visible" : ""}`}
        onClick={closeMenu}
        aria-label="Close navigation menu"
        tabIndex={menuOpen ? 0 : -1}
        type="button"
      />

      <aside
        id="navigation-sidebar"
        className={`nav__sidebar ${menuOpen ? "nav__sidebar--open" : ""}`}
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : true}
      >
        <div className="nav__sidebar-header">
          <span className="nav__sidebar-label">Navigation</span>
          <button ref={closeButtonRef} className="nav__sidebar-close" onClick={closeMenu} aria-label="Close menu" type="button">×</button>
        </div>
        <ul className="nav__sidebar-links">
          {siteConfig.navigation.map((item, index) => (
            <li key={item.href} style={{ transitionDelay: menuOpen ? `${index * 60}ms` : "0ms" }}>
              <Link
                href={item.href}
                className={`nav__sidebar-link ${pathname === item.href ? "nav__sidebar-link--active" : ""}`}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={closeMenu}
              >
                <span className="nav__sidebar-link-n">0{index + 1}</span>
                <span className="nav__sidebar-link-name">{item.label}</span>
                <span className="nav__sidebar-link-arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav__sidebar-footer">
          <Link href="/contact" className="nav__sidebar-cta" onClick={closeMenu}>Let&apos;s talk!</Link>
          <a href={siteConfig.resumeUrl} download="Rishin_CK_Resume.pdf" className="nav__sidebar-resume" onClick={closeMenu}>
            <span>Download CV</span><span aria-hidden="true">↓</span>
          </a>
          <div className="nav__sidebar-socials">
            {siteConfig.socials.slice(1, 4).map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}</a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
