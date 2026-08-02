"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { shouldReduceAdvancedMotion } from "@/lib/motion";

export function MotionProvider({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let active = true;
    let resizeFrame = 0;

    const refresh = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh(true));
    };

    const onAssetLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) refresh();
    };

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh, { passive: true });
    document.addEventListener("load", onAssetLoad, true);
    document.fonts.ready.then(() => {
      if (active) refresh();
    });

    if (shouldReduceAdvancedMotion()) {
      refresh();
      return () => {
        active = false;
        cancelAnimationFrame(resizeFrame);
        window.removeEventListener("load", refresh);
        window.removeEventListener("resize", refresh);
        document.removeEventListener("load", onAssetLoad, true);
      };
    }

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      duration: 1.05,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;
    const updateScrollTrigger = () => ScrollTrigger.update();
    const updateLenis = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);
    refresh();

    return () => {
      active = false;
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      document.removeEventListener("load", onAssetLoad, true);
      lenis.off("scroll", updateScrollTrigger);
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
