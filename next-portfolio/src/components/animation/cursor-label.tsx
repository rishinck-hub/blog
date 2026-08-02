"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { motion, shouldReduceAdvancedMotion } from "@/lib/motion";

export function CursorLabel() {
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const label = labelRef.current;
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    const capableDevice = navigator.hardwareConcurrency === undefined || navigator.hardwareConcurrency > 4;
    if (!label || !precisePointer || !capableDevice || shouldReduceAdvancedMotion()) return;
    label.style.display = "block";
    const moveX = gsap.quickTo(label, "x", { duration: motion.timing.cursor.follow, ease: motion.ease.reveal });
    const moveY = gsap.quickTo(label, "y", { duration: motion.timing.cursor.follow, ease: motion.ease.reveal });
    const onMove = (event: PointerEvent) => {
      moveX(event.clientX + 16);
      moveY(event.clientY + 16);
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor-label]");
      label.textContent = target?.dataset.cursorLabel ?? "";
      gsap.to(label, { opacity: target ? 1 : 0, scale: target ? 1 : 0.86, duration: motion.timing.cursor.state, ease: motion.ease.editorial, overwrite: true });
    };
    const hide = () => gsap.to(label, { opacity: 0, scale: 0.86, duration: motion.duration.fast, ease: motion.ease.exit, overwrite: true });
    const press = () => gsap.to(label, { scale: 0.92, duration: motion.timing.cursor.press, ease: motion.ease.exit, overwrite: true });
    const release = () => gsap.to(label, { scale: 1, duration: motion.timing.cursor.state, ease: motion.ease.editorial, overwrite: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      gsap.killTweensOf(label);
      label.style.display = "none";
    };
  }, []);

  return <div ref={labelRef} className="cursor-label type-label" aria-hidden="true" />;
}
