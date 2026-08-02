"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import { loaderCompleteEvent, motion } from "@/lib/motion";

const loaderFallbackMs = 1_600;

function waitForHeroImage(signal: AbortSignal) {
  const image = document.querySelector<HTMLImageElement>(".home-hero__portrait img");
  if (!image || (image.complete && image.naturalWidth > 0)) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const finish = () => resolve();
    image.addEventListener("load", finish, { once: true, signal });
    image.addEventListener("error", finish, { once: true, signal });
  });
}

export function FirstVisitLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    const counter = counterRef.current;
    const line = lineRef.current;
    const mark = markRef.current;
    if (!loader || !counter || !line || !mark || document.documentElement.dataset.firstVisitLoader !== "show") return;

    let active = true;
    let fontsReady = false;
    let imageReady = false;
    let fallbackTimer = 0;
    const controller = new AbortController();
    const progress = { value: 0 };

    const context = gsap.context(() => {
      gsap.set(line, { scaleX: 0 });
      gsap.fromTo(mark.children, { yPercent: 115, autoAlpha: 0 }, {
        yPercent: 0,
        autoAlpha: 1,
        duration: motion.duration.normal,
        stagger: motion.stagger.tight,
        ease: motion.ease.reveal,
      });
    }, loader);

    const renderProgress = () => {
      const value = Math.round(progress.value);
      counter.textContent = String(value).padStart(2, "0");
      gsap.set(line, { scaleX: value / 100 });
    };
    const updateProgress = () => {
      const target = 10 + (fontsReady ? 45 : 0) + (imageReady ? 40 : 0);
      gsap.to(progress, {
        value: target,
        duration: motion.duration.normal,
        ease: motion.ease.reveal,
        overwrite: true,
        onUpdate: renderProgress,
      });
    };

    const fonts = (document.fonts?.ready ?? Promise.resolve()).catch(() => undefined).then(() => {
      fontsReady = true;
      if (active) updateProgress();
    });
    const heroImage = waitForHeroImage(controller.signal).then(() => {
      imageReady = true;
      if (active) updateProgress();
    });
    const fallback = new Promise<void>((resolve) => {
      fallbackTimer = window.setTimeout(resolve, loaderFallbackMs);
    });

    updateProgress();
    void Promise.race([Promise.allSettled([fonts, heroImage]), fallback]).then(() => {
      if (!active) return;
      window.clearTimeout(fallbackTimer);
      gsap.to(progress, {
        value: 100,
        duration: motion.duration.fast,
        ease: motion.ease.reveal,
        overwrite: true,
        onUpdate: renderProgress,
        onComplete: () => {
          document.documentElement.dataset.firstVisitLoader = "exiting";
          gsap.timeline({
            defaults: { ease: motion.ease.exit },
            onComplete: () => {
              document.documentElement.dataset.firstVisitLoader = "done";
              loader.style.display = "none";
              window.dispatchEvent(new Event(loaderCompleteEvent));
            },
          })
            .to(mark, { yPercent: -30, autoAlpha: 0, duration: motion.duration.fast })
            .to(loader, { clipPath: "inset(0 0 100% 0)", duration: motion.timing.modal.exit }, 0);
        },
      });
    });

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(fallbackTimer);
      gsap.killTweensOf(progress);
      context.revert();
    };
  }, []);

  return (
    <div ref={loaderRef} className="first-visit-loader" aria-hidden="true">
      <span ref={markRef} className="first-visit-loader__wordmark"><span>RISHIN</span><sup>®</sup></span>
      <span className="first-visit-loader__counter"><span ref={counterRef}>00</span> — 100</span>
      <span className="first-visit-loader__track"><span ref={lineRef} /></span>
    </div>
  );
}
