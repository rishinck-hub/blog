"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { Container } from "@/components/layout/primitives";
import { siteConfig } from "@/data/site";
import { motion, shouldReduceAdvancedMotion } from "@/lib/motion";

const desktopNavigation = siteConfig.navigation.filter((item) => item.href !== "/");
const menuNavigation = [
  siteConfig.navigation[0],
  siteConfig.navigation[2],
  siteConfig.navigation[1],
  ...siteConfig.navigation.slice(3),
];

function getLocalTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function SiteNavigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState("--:--");
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setLocalTime(getLocalTime());
    const frame = requestAnimationFrame(update);
    const timer = window.setInterval(update, 30_000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled((current) => {
        const next = window.scrollY > 32;
        return current === next ? current : next;
      }));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const menu = menuRef.current;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    requestAnimationFrame(() => focusables()[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        requestAnimationFrame(() => triggerRef.current?.focus());
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && document.contains(previouslyFocused)) previouslyFocused.focus();
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu || !menuOpen || shouldReduceAdvancedMotion()) return;
    const context = gsap.context(() => {
      gsap.fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)",
        duration: motion.timing.modal.enter,
        ease: motion.ease.editorial,
      });
      gsap.fromTo(".editorial-menu__item", { y: motion.distance.medium, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: motion.timing.text.duration,
        ease: motion.ease.reveal,
        stagger: motion.stagger.normal,
        delay: 0.12,
      });
      gsap.fromTo(".editorial-menu__aside", { opacity: 0 }, {
        opacity: 1,
        duration: motion.duration.normal,
        delay: 0.35,
      });
    }, menu);
    return () => context.revert();
  }, [menuOpen]);

  return (
    <header ref={headerRef} className={`editorial-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-is-open" : ""}`}>
      <Container className="editorial-header__inner">
        <Link className="editorial-wordmark" href="/" onClick={() => setMenuOpen(false)}>
          RISHIN<sup>®</sup>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="editorial-nav-list">
            {desktopNavigation.map((item) => (
              <li key={item.href}>
                <Link className="editorial-nav-link type-navigation" href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={triggerRef}
          className={`editorial-menu-trigger ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="editorial-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          tabIndex={menuOpen ? -1 : undefined}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="editorial-menu-trigger__lines" aria-hidden="true" />
        </button>
      </Container>

      <div
        ref={menuRef}
        id="editorial-menu"
        className={`editorial-menu ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="editorial-menu-title"
        aria-hidden={!menuOpen}
        inert={menuOpen ? undefined : true}
        data-lenis-prevent
      >
        <button className="editorial-menu__close type-label" type="button" onClick={() => setMenuOpen(false)}>Close</button>
        <Container className="editorial-menu__inner">
          <div>
            <p id="editorial-menu-title" className="sr-only">Site navigation</p>
            <ol className="editorial-menu__links">
              {menuNavigation.map((item, index) => (
                <li className="editorial-menu__item" key={item.href}>
                  <Link className="editorial-menu__link" href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                    <span className="editorial-menu__index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="editorial-menu__name">{item.label.toUpperCase()}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <aside className="editorial-menu__aside" aria-label="Contact details">
            <div className="editorial-menu__aside-group">
              <span className="type-label">Contact</span>
              <a href={siteConfig.socials[0].href}>{siteConfig.socials[0].value}</a>
            </div>
            <div className="editorial-menu__aside-group">
              <span className="type-label">Social</span>
              {[siteConfig.socials[2], siteConfig.socials[1]].map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}</a>
              ))}
            </div>
            <div className="editorial-menu__aside-group">
              <span className="type-label">Local time</span>
              <time dateTime={localTime}>{localTime} IST</time>
            </div>
          </aside>
        </Container>
      </div>
    </header>
  );
}
