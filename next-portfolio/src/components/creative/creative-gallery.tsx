"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { motion, shouldReduceAdvancedMotion } from "@/lib/motion";
import { createLocalPointerMotion } from "@/lib/local-pointer-motion";
import type { CreativeEntry } from "@/types/content";

function GalleryImage({ entry, sizes }: Readonly<{ entry: CreativeEntry; sizes: string }>) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className="creative-image-placeholder" role="img" aria-label={`${entry.name} thumbnail unavailable`}>
      <span className="type-label">Image unavailable</span><strong>{entry.name}</strong><small>Replace with verified creative asset</small>
    </div>
  ) : (
    <Image src={entry.thumbnailUrl} alt={`${entry.name} video frame`} fill sizes={sizes} loading="lazy" onError={() => setFailed(true)} />
  );
}

export function CreativeGallery({ entries }: Readonly<{ entries: readonly CreativeEntry[] }>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const activeEntry = activeIndex === null ? null : entries[activeIndex];
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const move = useCallback((direction: number) => setActiveIndex((current) => current === null ? 0 : (current + direction + entries.length) % entries.length), [entries.length]);

  useLayoutEffect(() => {
    if (!galleryRef.current || shouldReduceAdvancedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".creative-gallery__media").forEach((media, index) => {
        const layer = media.querySelector<HTMLElement>(".creative-gallery__motion-layer");
        if (!layer) return;
        gsap.to(layer, { yPercent: index % 2 ? -3 : 3, ease: "none", scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: motion.timing.scroll.scrub } });
      });
    }, galleryRef);
    const removePointerMotion = gsap.utils.toArray<HTMLElement>(".creative-gallery__media", galleryRef.current).map((media) => {
      const layer = media.querySelector<HTMLElement>(".creative-gallery__motion-layer");
      return layer ? createLocalPointerMotion(media, layer, { x: 6, y: 4, rotation: 0.25 }) : () => {};
    });
    return () => {
      removePointerMotion.forEach((remove) => remove());
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); return; }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); return; }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); return; }
      if (event.key !== "Tab") return;
      const dialog = document.querySelector<HTMLElement>(".creative-preview__panel");
      const focusable = dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [close, isOpen, move]);

  return (
    <section ref={galleryRef} className="creative-gallery editorial-container" aria-labelledby="creative-gallery-title">
      <div className="creative-gallery__intro"><h2 id="creative-gallery-title" className="type-label">01 — Selected frames</h2><p className="type-metadata">Grayscale by default / color on hover</p></div>
      <div className="creative-gallery__grid">
        {entries.map((entry, index) => (
          <article className={`creative-gallery__item creative-gallery__item--${index + 1}`} key={entry.id}>
            <button type="button" className="creative-gallery__open" data-cursor-label="Open" onClick={(event) => { openerRef.current = event.currentTarget; setActiveIndex(index); }}>
              <span className="creative-gallery__media">
                <span className="creative-gallery__motion-layer">
                  <GalleryImage entry={entry} sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 45vw" />
                </span>
                <span className="creative-gallery__view type-label">View frame</span>
              </span>
              <span className="creative-gallery__caption">
                <span className="type-metadata">{String(index + 1).padStart(2, "0")} / {entry.category}</span>
                <strong>{entry.name}</strong>
                <span className="type-metadata">{entry.duration}</span>
              </span>
            </button>
          </article>
        ))}
      </div>

      {activeEntry && activeIndex !== null ? (
        <div className="creative-preview" role="dialog" aria-modal="true" aria-labelledby="creative-preview-title">
          <button className="creative-preview__backdrop" data-cursor-label="Close" type="button" onClick={close} aria-label="Close preview" />
          <div className="creative-preview__panel">
            <div className="creative-preview__bar">
              <span className="type-label">{String(activeIndex + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}</span>
              <button ref={closeRef} type="button" data-cursor-label="Close" onClick={close} className="type-label">Close <span aria-hidden="true">×</span></button>
            </div>
            <div className="creative-preview__image"><GalleryImage key={activeEntry.id} entry={activeEntry} sizes="90vw" /></div>
            <div className="creative-preview__meta">
              <div><span className="type-metadata">{activeEntry.category} · {activeEntry.duration}</span><h2 id="creative-preview-title">{activeEntry.name}</h2></div>
              <div className="creative-preview__controls"><button type="button" data-cursor-label="Previous" onClick={() => move(-1)} aria-label="Previous creative work">←</button><button type="button" data-cursor-label="Next" onClick={() => move(1)} aria-label="Next creative work">→</button><a href={activeEntry.instagramUrl} data-cursor-label="Open" target="_blank" rel="noreferrer" className="type-label">Watch on Instagram ↗</a></div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
