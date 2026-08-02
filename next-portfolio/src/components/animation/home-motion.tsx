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
      const loader = root.querySelector(".home-loader");
      if (reduced) {
        gsap.set(loader, { autoAlpha: 0, display: "none" });
        return;
      }

      const header = document.querySelector(".editorial-header");
      const opening = gsap.timeline({ defaults: { ease: motion.ease } });
      opening
        .set(header, { autoAlpha: 0 })
        .fromTo(loader, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.32, display: "none" })
        .to(header, { autoAlpha: 1, duration: 0.35 }, 0.18)
        .from(".home-status", { y: 12, autoAlpha: 0, duration: 0.35 }, 0.22)
        .from(".home-hero__line > span", { yPercent: 110, duration: 0.62, stagger: 0.08 }, 0.27)
        .from(".home-hero__portrait", { clipPath: "inset(0 0 100% 0)", duration: 0.75 }, 0.32)
        .from(".home-hero__animate:not(.home-status)", { y: 14, autoAlpha: 0, duration: 0.38, stagger: 0.06 }, 0.62)
        .from(".home-hero__scroll, .home-hero__counter", { autoAlpha: 0, duration: 0.3 }, 0.9);

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

  return <div className="home-loader" aria-hidden="true"><span>RISHIN®</span></div>;
}
