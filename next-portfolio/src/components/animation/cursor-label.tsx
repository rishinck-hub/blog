"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { hasFullMotion, motion } from "@/lib/motion";

export function CursorLabel() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    const capableDevice = navigator.hardwareConcurrency === undefined || navigator.hardwareConcurrency > 4;
    if (!cursor || !text || !precisePointer || !capableDevice || !hasFullMotion()) return;

    cursor.style.display = "grid";
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    const moveX = gsap.quickTo(cursor, "x", { duration: motion.timing.cursor.follow, ease: motion.ease.reveal });
    const moveY = gsap.quickTo(cursor, "y", { duration: motion.timing.cursor.follow, ease: motion.ease.reveal });
    let currentLabel = "";
    let initialized = false;

    const setContext = (nextLabel: string) => {
      if (nextLabel === currentLabel) return;
      currentLabel = nextLabel;
      text.textContent = nextLabel.toUpperCase();
      cursor.classList.toggle("is-contextual", Boolean(nextLabel));
    };

    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      if (!initialized) {
        initialized = true;
        document.documentElement.classList.add("custom-cursor-ready");
        cursor.classList.add("is-visible");
      }
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor-label]");
      setContext(target?.dataset.cursorLabel?.trim() ?? "");
    };
    const hide = () => cursor.classList.remove("is-visible");
    const show = () => { if (initialized) cursor.classList.add("is-visible"); };
    const press = () => gsap.to(cursor, { scale: 0.88, duration: motion.timing.cursor.press, ease: motion.ease.exit, overwrite: true });
    const release = () => gsap.to(cursor, { scale: 1, duration: motion.timing.cursor.state, ease: motion.ease.editorial, overwrite: true });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    document.documentElement.addEventListener("pointerenter", show);
    window.addEventListener("blur", hide);
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.removeEventListener("pointerenter", show);
      window.removeEventListener("blur", hide);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.classList.remove("custom-cursor-ready");
      gsap.killTweensOf(cursor);
      cursor.style.display = "none";
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor-label" aria-hidden="true">
      <span className="cursor-label__point" />
      <span ref={textRef} className="cursor-label__text type-label" />
    </div>
  );
}
