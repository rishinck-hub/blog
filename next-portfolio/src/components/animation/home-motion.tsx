"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { motion, shouldReduceAdvancedMotion } from "@/lib/motion";

export function HomeMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>(".editorial-home");
    if (!root) return;

    const reduced = shouldReduceAdvancedMotion();
    const context = gsap.context(() => {
      if (reduced) {
        return;
      }

      const header = document.querySelector(".editorial-header");
      const opening = gsap.timeline({ defaults: { ease: motion.ease } });
      opening
        .set(header, { autoAlpha: 0 })
        .to(header, { autoAlpha: 1, duration: 0.3 })
        .from(".home-status", { y: 12, autoAlpha: 0, duration: 0.3 }, 0.08)
        .from(".home-hero__line > span", { yPercent: 110, duration: 0.55, stagger: 0.07 }, 0.12)
        .from(".home-hero__portrait", { clipPath: "inset(0 0 100% 0)", duration: 0.65 }, 0.16)
        .from(".home-hero__animate:not(.home-status)", { y: 14, autoAlpha: 0, duration: 0.34, stagger: 0.05 }, 0.42)
        .from(".home-hero__scroll, .home-hero__counter", { autoAlpha: 0, duration: 0.25 }, 0.66);

      gsap.utils.toArray<HTMLElement>(".home-animate").forEach((element) => {
        gsap.from(element, { y: 34, autoAlpha: 0, duration: motion.duration.slow, ease: motion.ease, scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".home-reveal-image:not(.home-hero__portrait)").forEach((element) => {
        gsap.from(element, { clipPath: motion.reveal.imageClipFrom, duration: motion.duration.slow, ease: motion.ease, scrollTrigger: { trigger: element, start: "top 86%", once: true } });
      });

      gsap.to(".home-intro__image img", { yPercent: 7, ease: "none", scrollTrigger: { trigger: ".home-intro__image", start: "top bottom", end: "bottom top", scrub: 0.6 } });
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
