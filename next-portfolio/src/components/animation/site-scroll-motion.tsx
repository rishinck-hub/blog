"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { getMotionLevel, motion } from "@/lib/motion";

export function SiteScrollMotion({ children }: Readonly<{ children: ReactNode }>) {
  const frameRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const level = getMotionLevel();
    if (!frame || level === "off" || level === "essential") return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-entry").forEach((entry) => {
        const reverse = entry.classList.contains("work-entry--reverse");
        gsap.timeline({ scrollTrigger: { trigger: entry, start: "top 78%", once: true } })
          .from(entry.querySelector(".work-entry__number"), { x: reverse ? motion.distance.medium : -motion.distance.medium, autoAlpha: 0, duration: motion.duration.normal, ease: motion.ease.reveal })
          .from(entry.querySelector(".work-entry__visual"), { clipPath: reverse ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)", scale: 1.035, duration: motion.timing.image.duration, ease: motion.ease.reveal }, 0.08)
          .from(entry.querySelectorAll(".work-entry__description, .work-entry__meta, .work-entry__copy .animated-link"), { y: motion.distance.small, autoAlpha: 0, stagger: motion.stagger.normal, duration: motion.duration.normal, ease: motion.ease.reveal }, 0.2);
      });

      gsap.utils.toArray<HTMLElement>(".experience-group").forEach((group) => {
        gsap.timeline({ scrollTrigger: { trigger: group, start: "top 82%", once: true } })
          .from(group.querySelector(".experience-group__heading > .type-label"), { x: -motion.distance.medium, autoAlpha: 0, duration: motion.duration.normal, ease: motion.ease.reveal })
          .from(group.querySelector(".experience-group__heading > .type-metadata"), { x: motion.distance.medium, autoAlpha: 0, duration: motion.duration.normal, ease: motion.ease.reveal }, 0)
          .from(group.querySelectorAll(".experience-row__number"), { y: motion.distance.small, autoAlpha: 0, stagger: motion.stagger.tight, duration: motion.duration.normal, ease: motion.ease.reveal }, 0.18);
      });

      gsap.utils.toArray<HTMLElement>(".about-section-label").forEach((label) => {
        gsap.from(label, { clipPath: "inset(0 100% 0 0)", duration: motion.timing.divider, ease: motion.ease.editorial, scrollTrigger: { trigger: label, start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".case-section").forEach((section) => {
        gsap.timeline({ scrollTrigger: { trigger: section, start: "top 84%", once: true } })
          .from(section.querySelector(".case-section__label"), { x: -motion.distance.medium, autoAlpha: 0, duration: motion.duration.normal, ease: motion.ease.reveal })
          .from(section.querySelector(".case-section__content"), { x: motion.distance.medium, autoAlpha: 0, duration: motion.timing.text.duration, ease: motion.ease.reveal }, 0.08);
      });

      const contactContent = frame.querySelector<HTMLElement>(".contact-content");
      if (contactContent) {
        gsap.timeline({ scrollTrigger: { trigger: contactContent, start: "top 82%", once: true } })
          .from(".contact-details", { x: -motion.distance.medium, autoAlpha: 0, duration: motion.timing.text.duration, ease: motion.ease.reveal })
          .from(".contact-form-wrap", { x: motion.distance.medium, autoAlpha: 0, duration: motion.timing.text.duration, ease: motion.ease.reveal }, 0.1);
      }

      ScrollTrigger.batch(".creative-gallery__item", {
        start: "top 86%",
        once: true,
        onEnter: (items) => gsap.from(items, { y: motion.distance.medium, autoAlpha: 0, stagger: motion.stagger.normal, duration: motion.timing.image.duration, ease: motion.ease.reveal, overwrite: true }),
      });

      if (level === "full") {
        gsap.utils.toArray<HTMLElement>(".about-creative__words, .creative-close h2, .case-next__title").forEach((words, index) => {
          gsap.fromTo(words, { xPercent: index % 2 ? 2.5 : -2.5 }, { xPercent: index % 2 ? -2.5 : 2.5, ease: "none", scrollTrigger: { trigger: words, start: "top bottom", end: "bottom top", scrub: motion.timing.scroll.scrub } });
        });
      }

      gsap.utils.toArray<HTMLElement>(".about-close, .experience-close, .creative-close, .contact-close").forEach((section) => {
        gsap.timeline({ scrollTrigger: { trigger: section, start: "top 90%", once: true } })
          .from(section, { clipPath: "inset(0 0 10% 0)", y: motion.distance.medium, duration: motion.duration.slow, ease: motion.ease.reveal })
          .from(section.querySelectorAll(":scope .type-label"), { y: motion.distance.small, autoAlpha: 0, stagger: motion.stagger.normal, duration: motion.duration.normal, ease: motion.ease.reveal }, 0.24);
      });

      const footer = document.querySelector<HTMLElement>(".editorial-footer");
      if (footer) {
        const header = document.querySelector<HTMLElement>(".editorial-header");
        if (header) ScrollTrigger.create({ trigger: footer, start: "top 4rem", end: "bottom top", toggleClass: { targets: header, className: "on-inverse" } });
        gsap.timeline({ scrollTrigger: { trigger: footer, start: "top 88%", once: true } })
          .from(footer.querySelectorAll(".editorial-footer__divider"), { scaleX: 0, duration: motion.timing.divider, ease: motion.ease.editorial, stagger: 0.16 })
          .from(footer.querySelectorAll(".editorial-footer__statement-line > span"), { yPercent: 112, duration: motion.timing.text.duration, stagger: 0.08, ease: motion.ease.reveal }, 0.08)
          .from(footer.querySelector(".editorial-footer__cta"), { y: motion.distance.small, autoAlpha: 0, duration: motion.duration.normal, ease: motion.ease.reveal }, 0.34)
          .from(footer.querySelectorAll(".editorial-footer__details > *"), { y: motion.distance.small, autoAlpha: 0, duration: motion.duration.normal, stagger: motion.stagger.normal, ease: motion.ease.reveal }, 0.42)
          .from(footer.querySelector(".editorial-footer__wordmark"), { yPercent: 24, autoAlpha: 0, duration: motion.duration.slow, ease: motion.ease.reveal }, 0.48);
      }
    }, frame);

    return () => context.revert();
  }, []);

  return <div ref={frameRef} className="route-frame">{children}</div>;
}
