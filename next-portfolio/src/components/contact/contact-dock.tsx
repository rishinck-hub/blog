"use client";

import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/data";
import { modalStateEvent } from "@/lib/motion";

const email = siteConfig.socials.find((item) => item.label === "Email");
const instagram = siteConfig.socials.find((item) => item.label === "Instagram");
const phone = siteConfig.socials.find((item) => item.label === "WhatsApp");

export function ContactDock() {
  const [open, setOpen] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!dockRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    const onModalState = (event: Event) => {
      if ((event as CustomEvent<{ open?: boolean }>).detail?.open) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(modalStateEvent, onModalState);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(modalStateEvent, onModalState);
    };
  }, [open]);

  const telephoneHref = phone ? `tel:${phone.value.replace(/[^+\d]/g, "")}` : undefined;

  return (
    <div ref={dockRef} className={`contact-dock ${open ? "is-open" : ""}`}>
      <div id="contact-dock-panel" className="contact-dock__panel" aria-hidden={!open}>
        <div className="contact-dock__heading">
          <span className="type-label">Quick contact</span>
          <span aria-hidden="true">↗</span>
        </div>
        <nav aria-label="Quick contact options">
          <a href={siteConfig.resumeUrl} download data-cursor-label="Open">
            <span>Résumé</span><small>Download PDF</small><b aria-hidden="true">↓</b>
          </a>
          {telephoneHref && phone ? (
            <a href={telephoneHref} data-cursor-label="Open">
              <span>Phone</span><small>{phone.value}</small><b aria-hidden="true">↗</b>
            </a>
          ) : null}
          {email ? (
            <a href={email.href} data-cursor-label="Open">
              <span>Email</span><small>{email.value}</small><b aria-hidden="true">↗</b>
            </a>
          ) : null}
          {instagram ? (
            <a href={instagram.href} target="_blank" rel="noreferrer" data-cursor-label="Open">
              <span>Instagram</span><small>@{instagram.value}</small><b aria-hidden="true">↗</b>
            </a>
          ) : null}
        </nav>
      </div>

      <button
        ref={triggerRef}
        className="contact-dock__trigger type-label"
        type="button"
        aria-expanded={open}
        aria-controls="contact-dock-panel"
        onClick={() => setOpen((value) => !value)}
        data-cursor-label={open ? "Close" : "Open"}
      >
        <span>Contact</span><i aria-hidden="true">{open ? "−" : "+"}</i>
      </button>
    </div>
  );
}
