"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { gsap } from "gsap";

import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/data";
import { getMotionLevel, modalStateEvent, motion } from "@/lib/motion";

type ContactModalContextValue = { openModal: (trigger: HTMLElement) => void };
const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalTrigger({ children, className = "", onClick }: Readonly<{ children: ReactNode; className?: string; onClick?: () => void }>) {
  const context = useContext(ContactModalContext);
  if (!context) throw new Error("ContactModalTrigger must be used inside ContactModalProvider.");
  const activate = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.();
    context.openModal(event.currentTarget);
  };
  return <button type="button" className={className} aria-haspopup="dialog" onClick={activate} data-cursor-label="Open">{children}</button>;
}

export function ContactModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const focusFrameRef = useRef(0);
  const mountedRef = useRef(true);
  const pathnameRef = useRef(pathname);

  const openModal = useCallback((trigger: HTMLElement) => {
    openerRef.current = trigger;
    setOpen(true);
  }, []);

  const requestClose = useCallback(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const level = getMotionLevel();
    if (!overlay || !panel || level === "off") {
      setOpen(false);
      return;
    }
    timelineRef.current?.kill();
    const scale = level === "full" ? 1 : level === "reduced" ? 0.72 : 0.5;
    timelineRef.current = gsap.timeline({ onComplete: () => { if (mountedRef.current) setOpen(false); } })
      .to(panel, { clipPath: "inset(0 0 100% 0)", y: level === "essential" ? 0 : -motion.distance.small, duration: motion.timing.modal.exit * scale, ease: motion.ease.exit })
      .to(overlay, { autoAlpha: 0, duration: motion.duration.fast, ease: motion.ease.exit }, 0.12);
  }, []);
  useLayoutEffect(() => {
    const level = getMotionLevel();
    if (!open || !overlayRef.current || !panelRef.current || level === "off") return;
    const scale = level === "full" ? 1 : level === "reduced" ? 0.72 : 0.5;
    const context = gsap.context(() => {
      timelineRef.current = gsap.timeline()
        .fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: motion.duration.fast, ease: motion.ease.reveal })
        .fromTo(panelRef.current, { clipPath: "inset(100% 0 0 0)", y: level === "essential" ? 0 : motion.distance.small }, { clipPath: "inset(0)", y: 0, duration: motion.timing.modal.enter * scale, ease: motion.ease.editorial }, 0.04)
        .from(".contact-modal__title span", { yPercent: level === "essential" ? 45 : 110, duration: motion.timing.text.duration * scale, ease: motion.ease.reveal }, 0.1)
        .from(".contact-modal__portrait, .contact-modal__intro, .contact-modal__direct, .contact-modal .contact-form", { y: motion.distance.small * scale, autoAlpha: 0, stagger: motion.stagger.normal * scale, duration: motion.duration.normal * scale, ease: motion.ease.reveal }, 0.14);
    }, overlayRef);
    return () => context.revert();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.classList.add("contact-modal-open");
    window.dispatchEvent(new CustomEvent(modalStateEvent, { detail: { open: true } }));
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    focusFrameRef.current = requestAnimationFrame(() => panelRef.current?.focus({ preventScroll: true }));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); requestClose(); return; }
      if (event.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (document.activeElement === panelRef.current || !panelRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(focusFrameRef.current);
      window.removeEventListener("keydown", onKeyDown);
      timelineRef.current?.kill();
      timelineRef.current = null;
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      document.documentElement.classList.remove("contact-modal-open");
      window.scrollTo({ top: scrollY, behavior: "instant" });
      window.dispatchEvent(new CustomEvent(modalStateEvent, { detail: { open: false } }));
      focusFrameRef.current = requestAnimationFrame(() => { if (openerRef.current?.isConnected) openerRef.current.focus(); });
    };
  }, [open, requestClose]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(focusFrameRef.current);
      timelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (pathnameRef.current === pathname) return;
    pathnameRef.current = pathname;
    if (!open) return;
    const frame = requestAnimationFrame(requestClose);
    return () => cancelAnimationFrame(frame);
  }, [open, pathname, requestClose]);

  return (
    <ContactModalContext.Provider value={{ openModal }}>
      {children}
      {open ? (
        <div ref={overlayRef} className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" aria-describedby="contact-modal-description" data-lenis-prevent>
          <div className="contact-modal__backdrop" data-cursor-label="Close" onClick={requestClose} aria-hidden="true" />
          <div ref={panelRef} className="contact-modal__panel" tabIndex={-1}>
            <button ref={closeRef} className="contact-modal__close type-label" type="button" onClick={requestClose} data-cursor-label="Close" aria-label="Close contact dialog">Close <span aria-hidden="true">×</span></button>
            <div className="contact-modal__identity">
              <p className="type-label">A conversation starts here</p>
              <h2 id="contact-modal-title" className="contact-modal__title"><span>Let&apos;s talk.</span></h2>
              <p id="contact-modal-description" className="contact-modal__intro type-body-large">Have a role, project, or idea in mind? Share the essentials and I&apos;ll respond as soon as I can.</p>
              <div className="contact-modal__portrait"><Image src="/profile.png" alt="Portrait of Mohammed Rishin C K" fill sizes="(max-width: 720px) 38vw, 20vw" /></div>
              <div className="contact-modal__direct type-metadata"><a href={siteConfig.socials[0].href} data-cursor-label="Open">{siteConfig.socials[0].value} ↗</a><a href={siteConfig.socials[1].href} target="_blank" rel="noreferrer" data-cursor-label="Open">LinkedIn ↗</a></div>
            </div>
            <div className="contact-modal__form">
              <ContactForm recipient={siteConfig.socials[0].value} endpoint={process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT} idPrefix="contact-modal" onSuccess={requestClose} />
            </div>
          </div>
        </div>
      ) : null}
    </ContactModalContext.Provider>
  );
}
