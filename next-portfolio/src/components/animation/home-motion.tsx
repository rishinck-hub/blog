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
      const opening = gsap.timeline({ defaults: { ease: motion.ease.reveal } });
      opening
        .set(header, { autoAlpha: 0 })
        .to(header, { autoAlpha: 1, duration: motion.duration.fast })
        .from(".home-status", { y: motion.distance.small, autoAlpha: 0, duration: motion.duration.normal }, 0.08)
        .from(".home-hero__line > span", { yPercent: 110, duration: motion.timing.text.duration, stagger: motion.stagger.normal }, 0.12)
        .from(".home-hero__portrait", { clipPath: motion.reveal.imageClipFrom, duration: motion.timing.image.duration }, 0.16)
        .from(".home-hero__animate:not(.home-status)", { y: motion.distance.small, autoAlpha: 0, duration: motion.duration.normal, stagger: motion.stagger.tight }, 0.42)
        .from(".home-hero__scroll, .home-hero__counter", { autoAlpha: 0, duration: motion.duration.fast }, 0.66);

      gsap.utils.toArray<HTMLElement>(".home-animate").forEach((element) => {
        gsap.from(element, { y: motion.distance.medium, autoAlpha: 0, duration: motion.timing.text.duration, ease: motion.ease.reveal, scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".home-reveal-image:not(.home-hero__portrait)").forEach((element) => {
        gsap.from(element, { clipPath: motion.reveal.imageClipFrom, duration: motion.timing.image.duration, ease: motion.ease.reveal, scrollTrigger: { trigger: element, start: "top 86%", once: true } });
      });

      gsap.to(".home-intro__image img", { yPercent: motion.timing.scroll.distance, ease: "none", scrollTrigger: { trigger: ".home-intro__image", start: "top bottom", end: "bottom top", scrub: motion.timing.scroll.scrub } });
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
