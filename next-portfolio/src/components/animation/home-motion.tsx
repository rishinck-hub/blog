"use client";

import { useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

import { getMotionLevel, loaderCompleteEvent, motion } from "@/lib/motion";

export function HomeMotion() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".editorial-home");
    if (!root) return;

    const level = getMotionLevel();
    let playOpening: (() => void) | undefined;
    let removePointerResponse: () => void = () => {};
    const context = gsap.context(() => {
      if (level === "off") {
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
      const durationScale = level === "full" ? 1 : level === "reduced" ? 0.72 : 0.5;
      const opening = gsap.timeline({ paused: true, defaults: { ease: motion.ease.reveal } });
      opening
        .to(header, { autoAlpha: 1, duration: motion.duration.fast * durationScale })
        .from(".home-status", { y: motion.distance.small * durationScale, autoAlpha: 0, duration: motion.duration.normal * durationScale }, 0.06)
        .from(".home-hero__line > span", { yPercent: level === "essential" ? 55 : 112, duration: motion.timing.text.duration * durationScale, stagger: 0.1 * durationScale }, 0.14)
        .from(portrait, { clipPath: motion.reveal.imageClipFrom, duration: motion.timing.image.duration * durationScale }, 0.28)
        .fromTo(portraitImage, { scale: level === "essential" ? 1.025 : 1.065 }, { scale: 1, duration: motion.timing.image.scaleDuration * durationScale }, 0.28)
        .from(".home-hero__role, .home-hero__statement, .home-hero__actions", { y: motion.distance.small * durationScale, autoAlpha: 0, stagger: motion.stagger.normal * durationScale, duration: motion.duration.normal * durationScale }, 0.48)
        .from(".home-hero__scroll, .home-hero__counter", { y: motion.distance.small / 2, autoAlpha: 0, duration: motion.duration.fast * durationScale }, 0.66);

      opening.eventCallback("onComplete", () => {
        if (level !== "full") return;

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

      gsap.utils.toArray<HTMLElement>(".home-animate:not(.home-divider)").forEach((element) => {
        gsap.from(element, { y: motion.distance.medium, autoAlpha: 0, duration: motion.timing.text.duration, ease: motion.ease.reveal, scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".home-divider").forEach((divider) => {
        gsap.from(divider, { scaleX: 0, duration: motion.timing.divider, ease: motion.ease.editorial, scrollTrigger: { trigger: divider, start: "top 90%", once: true } });
      });

      gsap.utils.toArray<HTMLElement>(".home-reveal-image:not(.home-hero__portrait)").forEach((element) => {
        gsap.from(element, { clipPath: motion.reveal.imageClipFrom, duration: motion.timing.image.duration, ease: motion.ease.reveal, scrollTrigger: { trigger: element, start: "top 86%", once: true } });
      });

      if (level === "full") {
        gsap.to(".home-intro__image img", { yPercent: motion.timing.scroll.distance, ease: "none", scrollTrigger: { trigger: ".home-intro__image", start: "top bottom", end: "bottom top", scrub: motion.timing.scroll.scrub } });
      }
    }, root);

    return () => {
      if (playOpening) window.removeEventListener(loaderCompleteEvent, playOpening);
      removePointerResponse();
      context.revert();
    };
  }, []);

  return null;
}
