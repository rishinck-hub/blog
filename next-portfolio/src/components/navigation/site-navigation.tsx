"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { Container } from "@/components/layout/primitives";
import { ContactModalTrigger } from "@/components/contact/contact-modal";
import { LocalTime } from "@/components/ui/local-time";
import { siteConfig } from "@/data/site";
import { createLocalPointerMotion } from "@/lib/local-pointer-motion";
import { motion } from "@/lib/motion";

const desktopNavigation = siteConfig.navigation.filter((item) => item.href !== "/");
const menuNavigation = [
  siteConfig.navigation[0],
  siteConfig.navigation[2],
  siteConfig.navigation[1],
  ...siteConfig.navigation.slice(3),
];

export function SiteNavigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePreview, setActivePreview] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const focusFrameRef = useRef(0);

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
    const previousOverflow = document.body.style.overflow;
    const menu = menuRef.current;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    focusFrameRef.current = requestAnimationFrame(() => focusables()[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        focusFrameRef.current = requestAnimationFrame(() => triggerRef.current?.focus());
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
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(focusFrameRef.current);
      if (previouslyFocused && document.contains(previouslyFocused)) previouslyFocused.focus();
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu || !menuOpen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let removePointerMotion = () => {};
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
      gsap.fromTo(".editorial-menu__preview", { clipPath: motion.reveal.imageClipFrom }, { clipPath: motion.reveal.imageClipTo, duration: motion.duration.slow, ease: motion.ease.reveal, delay: 0.18 });
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const preview = menu.querySelector<HTMLElement>(".editorial-menu__preview-inner");
        if (preview) removePointerMotion = createLocalPointerMotion(menu, preview, { x: 5, y: 3, rotation: 0.15 });
      }
    }, menu);
    return () => {
      removePointerMotion();
      context.revert();
    };
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
            <li><ContactModalTrigger className="editorial-nav-link editorial-nav-contact type-navigation">Let&apos;s Talk</ContactModalTrigger></li>
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
          onClick={() => {
            const currentIndex = menuNavigation.findIndex((item) => item.href === pathname);
            setActivePreview(currentIndex < 0 ? 0 : currentIndex);
            setMenuOpen((open) => !open);
          }}
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
        <button className="editorial-menu__close" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>Close</button>
        <Container className="editorial-menu__inner">
          <div>
            <p id="editorial-menu-title" className="sr-only">Site navigation</p>
            <ol className="editorial-menu__links">
              {menuNavigation.map((item, index) => (
                <li className="editorial-menu__item" key={item.href}>
                  <Link className="editorial-menu__link" href={item.href} aria-current={pathname === item.href ? "page" : undefined} onMouseEnter={() => setActivePreview(index)} onFocus={() => setActivePreview(index)} onClick={() => setMenuOpen(false)}>
                    <span className="editorial-menu__index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="editorial-menu__name">{item.label.toUpperCase()}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <aside className="editorial-menu__aside" aria-label="Contact details">
            <div className="editorial-menu__preview" aria-hidden="true">
              <div className="editorial-menu__preview-inner">
                <Image src="/profile.png" alt="" fill sizes="(max-width: 540px) 50vw, 15rem" />
                <span className="type-metadata">{String(activePreview + 1).padStart(2, "0")} / {menuNavigation[activePreview].label}</span>
              </div>
            </div>
            <div className="editorial-menu__aside-group">
              <span className="type-label">Contact</span>
              <a href={siteConfig.socials[0].href}>{siteConfig.socials[0].value}</a>
              <ContactModalTrigger className="editorial-menu__contact type-label" onClick={() => setMenuOpen(false)}>Let&apos;s Talk →</ContactModalTrigger>
            </div>
            <div className="editorial-menu__aside-group">
              <span className="type-label">Social</span>
              {[siteConfig.socials[2], siteConfig.socials[1]].map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}</a>
              ))}
            </div>
            <div className="editorial-menu__aside-group">
              <span className="type-label">Local time</span>
              <LocalTime />
            </div>
          </aside>
        </Container>
      </div>
    </header>
  );
}
