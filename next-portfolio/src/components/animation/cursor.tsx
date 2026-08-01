"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const follower = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const position = { x: 0, y: 0 };
    const followerPosition = { x: 0, y: 0 };
    let frame = 0;

    const onMove = (event: MouseEvent) => {
      position.x = event.clientX;
      position.y = event.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const onOver = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest("a, button, [data-cursor]")) dot.current?.classList.add("cursor--big");
    };
    const onOut = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest("a, button, [data-cursor]")) dot.current?.classList.remove("cursor--big");
    };
    const loop = () => {
      followerPosition.x += (position.x - followerPosition.x) * 0.1;
      followerPosition.y += (position.y - followerPosition.y) * 0.1;
      if (follower.current) follower.current.style.transform = `translate3d(${followerPosition.x}px, ${followerPosition.y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor" aria-hidden="true" />
      <div ref={follower} className="cursor-follower" aria-hidden="true" />
    </>
  );
}
