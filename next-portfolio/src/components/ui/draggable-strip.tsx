"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

type DraggableStripProps = Readonly<{
  children: ReactNode;
  label: string;
  viewportClassName?: string;
}>;

export function DraggableStrip({ children, label, viewportClassName = "" }: DraggableStripProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, pointerId: -1, lastX: 0, lastTime: 0, velocity: 0 });
  const momentumFrame = useRef(0);
  const updateFrame = useRef(0);
  const [boundaries, setBoundaries] = useState({ start: true, end: false });

  const updateBoundaries = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maximum = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    setBoundaries((current) => {
      const next = { start: viewport.scrollLeft <= 1, end: viewport.scrollLeft >= maximum - 1 };
      return current.start === next.start && current.end === next.end ? current : next;
    });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const onScroll = () => {
      cancelAnimationFrame(updateFrame.current);
      updateFrame.current = requestAnimationFrame(updateBoundaries);
    };
    const observer = new ResizeObserver(onScroll);
    observer.observe(viewport);
    onScroll();
    viewport.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cancelAnimationFrame(updateFrame.current);
      cancelAnimationFrame(momentumFrame.current);
    };
  }, [updateBoundaries]);

  const scrollByPage = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    cancelAnimationFrame(momentumFrame.current);
    viewport.classList.remove("is-gliding");
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    viewport.scrollBy({ left: viewport.clientWidth * 0.82 * direction, behavior });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    cancelAnimationFrame(momentumFrame.current);
    event.currentTarget.classList.remove("is-gliding");
    dragRef.current = { active: true, pointerId: event.pointerId, lastX: event.clientX, lastTime: performance.now(), velocity: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const drag = dragRef.current;
    if (!viewport || !drag.active || drag.pointerId !== event.pointerId) return;
    const now = performance.now();
    const elapsed = Math.max(1, now - drag.lastTime);
    const delta = drag.lastX - event.clientX;
    viewport.scrollLeft += delta;
    drag.velocity = delta / elapsed;
    drag.lastX = event.clientX;
    drag.lastTime = now;
    event.preventDefault();
  };
  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const drag = dragRef.current;
    if (!viewport || !drag.active || drag.pointerId !== event.pointerId) return;
    drag.active = false;
    event.currentTarget.classList.remove("is-dragging");
    event.currentTarget.classList.add("is-gliding");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      event.currentTarget.classList.remove("is-gliding");
      return;
    }

    let velocity = drag.velocity * 16;
    const finishGlide = () => viewport.classList.remove("is-gliding");
    const glide = () => {
      if (Math.abs(velocity) < 0.15) { finishGlide(); return; }
      const before = viewport.scrollLeft;
      viewport.scrollLeft += velocity;
      if (viewport.scrollLeft === before) { finishGlide(); return; }
      velocity *= 0.92;
      momentumFrame.current = requestAnimationFrame(glide);
    };
    momentumFrame.current = requestAnimationFrame(glide);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); scrollByPage(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); scrollByPage(1); }
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (event.key === "Home") { event.preventDefault(); viewport.scrollTo({ left: 0, behavior }); }
    if (event.key === "End") { event.preventDefault(); viewport.scrollTo({ left: viewport.scrollWidth, behavior }); }
  };

  return (
    <div className="draggable-strip">
      <div className="draggable-strip__toolbar">
        <span className="type-metadata">Swipe, drag or use arrow keys</span>
        <div className="draggable-strip__controls" aria-label={`${label} controls`}>
          <button type="button" disabled={boundaries.start} onClick={() => scrollByPage(-1)} aria-label="Previous item">←</button>
          <button type="button" disabled={boundaries.end} onClick={() => scrollByPage(1)} aria-label="Next item">→</button>
        </div>
      </div>
      <div
        ref={viewportRef}
        className={`draggable-strip__viewport ${viewportClassName}`.trim()}
        role="region"
        aria-label={label}
        tabIndex={0}
        data-cursor-label="Drag"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div className="draggable-strip__track">{children}</div>
      </div>
    </div>
  );
}
