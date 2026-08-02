"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { shouldReduceAdvancedMotion } from "@/lib/motion";

export function CursorLabel() {
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const label = labelRef.current;
    if (!label || shouldReduceAdvancedMotion()) return;
    const moveX = gsap.quickTo(label, "x", { duration: 0.2, ease: "power3.out" });
    const moveY = gsap.quickTo(label, "y", { duration: 0.2, ease: "power3.out" });
    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor-label]");
      label.textContent = target?.dataset.cursorLabel ?? "";
      gsap.to(label, { opacity: target ? 1 : 0, duration: 0.18, overwrite: true });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(label);
    };
  }, []);

  return <div ref={labelRef} className="cursor-label type-label" aria-hidden="true" />;
}
