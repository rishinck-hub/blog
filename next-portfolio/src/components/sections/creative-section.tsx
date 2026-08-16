"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";

import { Reveal } from "@/components/animation/reveal";
import { creativeEntries } from "@/data";
import type { CreativeEntry } from "@/types/content";

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } };
  }
}

export function CreativeSection({ limit }: Readonly<{ limit?: number }>) {
  const [filter, setFilter] = useState("All");
  const [activeEntry, setActiveEntry] = useState<CreativeEntry | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const entries = limit ? creativeEntries.slice(0, limit) : creativeEntries;
  const categories = useMemo(() => ["All", ...new Set(entries.map((entry) => entry.category))], [entries]);
  const filtered = filter === "All" ? entries : entries.filter((entry) => entry.category === filter);
  const backgroundEntry = activeEntry ?? filtered[0] ?? creativeEntries[0];

  useEffect(() => {
    if (!activeEntry) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveEntry(null);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeEntry]);

  useEffect(() => {
    if (activeEntry) window.instgrm?.Embeds?.process();
  }, [activeEntry]);

  return (
    <section id="reels" className="reels">
      <Image className="reels__bg-image" src={backgroundEntry.thumbnailUrl} alt="" fill sizes="100vw" aria-hidden="true" />
      <div className="reels__bg-overlay" aria-hidden="true" />
      <div className="reels__header">
        <Reveal><h2 className="reels__title">Video<br /><span>Edits</span></h2></Reveal>
        <Reveal delay={100}>
          <div className="reels__filters" aria-label="Filter creative work">
            {(limit ? ["All"] : categories).map((category) => (
              <button key={category} className={`reels__filter ${filter === category ? "reels__filter--active" : ""}`} onClick={() => setFilter(category)} type="button">
                {category}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="reels__grid">
        {filtered.map((entry, index) => (
          <Reveal key={entry.id} delay={index * 60}>
            <button className="reel" type="button" onClick={() => setActiveEntry(entry)} data-cursor>
              <div className="reel__thumb">
                <Image src={entry.thumbnailUrl} alt={entry.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="reel__overlay"><div className="reel__play" aria-hidden="true">▶</div></div>
                <span className="reel__duration">{entry.duration}</span>
              </div>
              <div className="reel__info"><span className="reel__cat">{entry.category}</span><h3 className="reel__name">{entry.name}</h3></div>
            </button>
          </Reveal>
        ))}
      </div>
      {activeEntry ? (
        <div className="reel-modal" role="dialog" aria-modal="true" aria-label={`${activeEntry.name} video player`}>
          <button className="reel-modal__backdrop" type="button" aria-label="Close reel viewer" onClick={() => setActiveEntry(null)} />
          <div className="reel-modal__panel">
            <button ref={closeButtonRef} className="reel-modal__close" type="button" onClick={() => setActiveEntry(null)} data-cursor>Close</button>
            <div className="reel-modal__video-wrap">
              <blockquote key={activeEntry.instagramUrl} className="instagram-media reel-modal__embed" data-instgrm-permalink={activeEntry.instagramUrl} data-instgrm-version="14">
                <a href={activeEntry.instagramUrl} target="_blank" rel="noreferrer">View {activeEntry.name} on Instagram</a>
              </blockquote>
            </div>
            <div className="reel-modal__meta">
              <span>{activeEntry.category}</span><h3>{activeEntry.name}</h3>
              <p>{activeEntry.duration} vertical Instagram reel preview. If Instagram blocks embedded playback, use the source link instead.</p>
              <a href={activeEntry.instagramUrl} target="_blank" rel="noreferrer" data-cursor>Open on Instagram ↗</a>
            </div>
          </div>
          <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" onLoad={() => window.instgrm?.Embeds?.process()} />
        </div>
      ) : null}
    </section>
  );
}
