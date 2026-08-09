"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";

import { motion } from "@/lib/motion";

export type CapabilityItem = Readonly<{
  number: string;
  name: string;
  description: string;
  technologies: string;
  project: string;
}>;

export function CapabilitiesAccordion({ items }: Readonly<{ items: readonly CapabilityItem[] }>) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openIndexRef = useRef<number | null>(null);
  const detailsRefs = useRef<Array<HTMLDetailsElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => () => { timelineRef.current?.kill(); }, []);

  const select = (event: MouseEvent<HTMLElement>, index: number) => {
    event.preventDefault();
    timelineRef.current?.progress(1);

    const previous = openIndexRef.current;
    const next = previous === index ? null : index;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      detailsRefs.current.forEach((details, itemIndex) => {
        if (details) details.open = itemIndex === next;
      });
      openIndexRef.current = next;
      setOpenIndex(next);
      return;
    }

    const previousDetails = previous === null ? null : detailsRefs.current[previous];
    const previousContent = previousDetails?.querySelector<HTMLElement>(".home-capability__content") ?? null;
    const nextDetails = next === null ? null : detailsRefs.current[next];
    const nextContent = nextDetails?.querySelector<HTMLElement>(".home-capability__content") ?? null;

    if (nextDetails && nextContent) {
      nextDetails.open = true;
      gsap.set(nextContent, { height: 0, autoAlpha: 0, overflow: "hidden" });
    }

    const timeline = gsap.timeline({
      defaults: { duration: motion.duration.normal, ease: motion.ease.editorial },
      onComplete: () => {
        if (previousDetails && previous !== next) previousDetails.open = false;
        [previousContent, nextContent].forEach((content) => {
          if (content) gsap.set(content, { clearProps: "height,opacity,visibility,overflow" });
        });
        openIndexRef.current = next;
        setOpenIndex(next);
        timelineRef.current = null;
      },
    });

    if (previousContent) timeline.to(previousContent, { height: 0, autoAlpha: 0 }, 0);
    if (nextContent) timeline.to(nextContent, { height: nextContent.scrollHeight, autoAlpha: 1 }, 0.06);
    timelineRef.current = timeline;
  };

  return (
    <div className="home-capability-list">
      {items.map((item, index) => (
        <details
          ref={(element) => { detailsRefs.current[index] = element; }}
          className="home-capability home-animate"
          open={openIndex === index}
          key={item.number}
        >
          <summary onClick={(event) => select(event, index)}>
            <span className="home-capability__number type-metadata">{item.number}</span>
            <strong>{item.name}</strong>
            <span className="home-capability__toggle" aria-hidden="true"><span /><span /></span>
          </summary>
          <div className="home-capability__content">
            <div className="home-capability__body">
              <p className="type-body">{item.description}</p>
              <dl className="type-metadata"><div><dt>Tools</dt><dd>{item.technologies}</dd></div><div><dt>Related work</dt><dd>{item.project}</dd></div></dl>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
