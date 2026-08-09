"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getMotionLevel, modalStateEvent, motion } from "@/lib/motion";

export function MotionProvider({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.dataset.motionLevel = getMotionLevel();
    let active = true;
    let resizeFrame = 0;

    const refresh = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh(true));
    };

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh, { passive: true });
    document.fonts.ready.then(() => {
      if (active) refresh();
    });

    if (getMotionLevel() !== "full") {
      refresh();
      return () => {
        active = false;
        cancelAnimationFrame(resizeFrame);
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
      };
    }

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      duration: motion.timing.scroll.smoothDuration,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;
    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    const onModalState = (event: Event) => {
      if ((event as CustomEvent<{ open: boolean }>).detail.open) lenis.stop();
      else lenis.start();
    };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;
      document.documentElement.dataset.motionLevel = "off";
      document.documentElement.classList.remove("custom-cursor-ready");
      lenis.stop();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    reducedMotion.addEventListener("change", onReducedMotionChange);
    window.addEventListener(modalStateEvent, onModalState);
    refresh();

    return () => {
      active = false;
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      lenis.off("scroll", updateScrollTrigger);
      window.removeEventListener(modalStateEvent, onModalState);
      reducedMotion.removeEventListener("change", onReducedMotionChange);
      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    if (!lenisRef.current) window.scrollTo({ top: 0, behavior: "instant" });
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh(true));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return children;
}
