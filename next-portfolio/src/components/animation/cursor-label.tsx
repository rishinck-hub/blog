"use client";

import { useEffect, useRef } from "react";

import { hasFullMotion, motion } from "@/lib/motion";

export function CursorLabel() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const position = positionRef.current;
    const text = textRef.current;
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    const capableDevice = navigator.hardwareConcurrency === undefined || navigator.hardwareConcurrency > 4;
    if (!cursor || !position || !text || !precisePointer || !capableDevice || !hasFullMotion()) return;

    cursor.style.display = "grid";
    position.style.display = "block";
    const current = { x: 0, y: 0, scale: 1 };
    const target = { x: 0, y: 0, scale: 1 };
    let frame = 0;
    let previousTime = 0;
    let currentLabel = "";
    let initialized = false;

    const render = (time: number) => {
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16;
      previousTime = time;
      const smoothing = 1 - Math.exp(-elapsed / (motion.timing.cursor.follow * 1000));
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;
      current.scale += (target.scale - current.scale) * Math.min(1, smoothing * 1.8);
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${current.scale})`;

      const unsettled = Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05 || Math.abs(target.scale - current.scale) > 0.002;
      frame = unsettled ? requestAnimationFrame(render) : 0;
    };
    const scheduleRender = () => {
      if (!frame) {
        previousTime = 0;
        frame = requestAnimationFrame(render);
      }
    };

    const setContext = (nextLabel: string) => {
      if (nextLabel === currentLabel) return;
      currentLabel = nextLabel;
      text.textContent = nextLabel.toUpperCase();
      cursor.classList.toggle("is-contextual", Boolean(nextLabel));
    };

    const onMove = (event: PointerEvent) => {
      position.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      if (!initialized) {
        initialized = true;
        current.x = event.clientX;
        current.y = event.clientY;
        document.documentElement.classList.add("custom-cursor-ready");
        cursor.classList.add("is-visible");
        position.classList.add("is-visible");
      }
      target.x = event.clientX;
      target.y = event.clientY;
      scheduleRender();
      const hoveredTarget = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor-label]");
      setContext(hoveredTarget?.dataset.cursorLabel?.trim() ?? "");
    };
    const hide = () => {
      cursor.classList.remove("is-visible");
      position.classList.remove("is-visible");
    };
    const show = () => {
      if (!initialized) return;
      cursor.classList.add("is-visible");
      position.classList.add("is-visible");
    };
    const press = () => { target.scale = 0.88; scheduleRender(); };
    const release = () => { target.scale = 1; scheduleRender(); };

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
      cancelAnimationFrame(frame);
      cursor.style.display = "none";
      cursor.style.transform = "";
      position.style.display = "none";
      position.style.transform = "";
    };
  }, []);

  return (
    <>
      <span ref={positionRef} className="cursor-position" aria-hidden="true" />
      <div ref={cursorRef} className="cursor-label" aria-hidden="true">
        <span ref={textRef} className="cursor-label__text type-label" />
      </div>
    </>
  );
}
