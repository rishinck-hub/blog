"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { loaderCompleteEvent, motion, shouldReduceAdvancedMotion } from "@/lib/motion";

export function HomeMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>(".editorial-home");
    if (!root) return;

    const reduced = shouldReduceAdvancedMotion();
    let playOpening: (() => void) | undefined;
    let removePointerResponse: () => void = () => {};
    const context = gsap.context(() => {
      if (reduced) {
        return;
      }

      const header = document.querySelector(".editorial-header");
      const hero = root.querySelector<HTMLElement>(".home-hero");
      const portrait = root.querySelector<HTMLElement>(".home-hero__portrait");
      const portraitImage = portrait?.querySelector("img");
      const heading = root.querySelector<HTMLElement>(".home-hero__name");
      const detail = root.querySelector<HTMLElement>(".home-hero__counter");
      const shade = root.querySelector<HTMLElement>(".home-hero__shade");
      if (!header || !hero || !portrait || !portraitImage || !heading || !detail || !shade) return;
      gsap.set(header, { autoAlpha: 0 });
      const opening = gsap.timeline({ paused: true, defaults: { ease: motion.ease.reveal } });
      opening
        .to(header, { autoAlpha: 1, duration: motion.duration.fast })
        .from(".home-status", { y: motion.distance.small, autoAlpha: 0, duration: motion.duration.normal }, 0.1)
        .from(".home-hero__line > span", { yPercent: 112, duration: motion.timing.text.duration, stagger: 0.1 }, 0.28)
        .from(portrait, { clipPath: motion.reveal.imageClipFrom, duration: motion.timing.image.duration }, 0.52)
        .fromTo(portraitImage, { scale: 1.065 }, { scale: 1, duration: motion.timing.image.scaleDuration }, 0.52)
        .from(".home-hero__role", { y: motion.distance.small, autoAlpha: 0, duration: motion.duration.normal }, 0.88)
        .from(".home-hero__statement", { y: motion.distance.small, autoAlpha: 0, duration: motion.duration.normal }, 0.98)
        .from(".home-hero__actions", { y: motion.distance.small, autoAlpha: 0, duration: motion.duration.normal }, 1.08)
        .from(".home-hero__scroll, .home-hero__counter", { y: motion.distance.small / 2, autoAlpha: 0, duration: motion.duration.fast }, 1.28);

      opening.eventCallback("onComplete", () => {
        const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!precisePointer) return;

        const portraitX = gsap.quickTo(portrait, "x", { duration: motion.duration.normal, ease: motion.ease.editorial });
        const portraitY = gsap.quickTo(portrait, "y", { duration: motion.duration.normal, ease: motion.ease.editorial });
        const portraitRotation = gsap.quickTo(portrait, "rotation", { duration: motion.duration.normal, ease: motion.ease.editorial });
        const headingX = gsap.quickTo(heading, "x", { duration: motion.duration.normal, ease: motion.ease.editorial });
        const headingY = gsap.quickTo(heading, "y", { duration: motion.duration.normal, ease: motion.ease.editorial });
        const detailX = gsap.quickTo(detail, "x", { duration: motion.duration.normal, ease: motion.ease.editorial });
        const detailY = gsap.quickTo(detail, "y", { duration: motion.duration.normal, ease: motion.ease.editorial });
        const shadeX = gsap.quickTo(shade, "x", { duration: motion.duration.normal, ease: motion.ease.editorial });

        const move = (event: PointerEvent) => {
          const bounds = hero.getBoundingClientRect();
          const normalizedX = gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
          const normalizedY = gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
          portraitX(normalizedX * motion.pointer.visual.x);
          portraitY(normalizedY * motion.pointer.visual.y);
          portraitRotation(normalizedX * motion.pointer.visual.rotation);
          headingX(normalizedX * -motion.pointer.secondary.x);
          headingY(normalizedY * -motion.pointer.secondary.y);
          detailX(normalizedX * motion.pointer.detail.x);
          detailY(normalizedY * motion.pointer.detail.y);
          shadeX(normalizedX * motion.pointer.detail.x);
        };
        const reset = () => {
          portraitX(0); portraitY(0); portraitRotation(0);
          headingX(0); headingY(0);
          detailX(0); detailY(0); shadeX(0);
        };

        hero.addEventListener("pointermove", move, { passive: true });
        hero.addEventListener("pointerleave", reset);
        removePointerResponse = () => {
          hero.removeEventListener("pointermove", move);
          hero.removeEventListener("pointerleave", reset);
          gsap.killTweensOf([portrait, heading, detail, shade]);
        };
      });

      playOpening = () => opening.play();
      const loaderState = document.documentElement.dataset.firstVisitLoader;
      if (loaderState === "show" || loaderState === "exiting") {
        window.addEventListener(loaderCompleteEvent, playOpening, { once: true });
      } else {
        playOpening();
      }

      gsap.utils.toArray<HTMLElement>(".home-animate").forEach((element) => {
        gsap.from(element, { y: motion.distance.medium, autoAlpha: 0, duration: motion.timing.text.duration, ease: motion.ease.reveal, scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".home-reveal-image:not(.home-hero__portrait)").forEach((element) => {
        gsap.from(element, { clipPath: motion.reveal.imageClipFrom, duration: motion.timing.image.duration, ease: motion.ease.reveal, scrollTrigger: { trigger: element, start: "top 86%", once: true } });
      });

      gsap.to(".home-intro__image img", { yPercent: motion.timing.scroll.distance, ease: "none", scrollTrigger: { trigger: ".home-intro__image", start: "top bottom", end: "bottom top", scrub: motion.timing.scroll.scrub } });
    }, root);

    return () => {
      if (playOpening) window.removeEventListener(loaderCompleteEvent, playOpening);
      removePointerResponse();
      context.revert();
    };
  }, []);

  return null;
}
