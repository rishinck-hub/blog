"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

import { shouldReduceAdvancedMotion } from "@/lib/motion";

export function MagneticButton({ children, href, className = "" }: Readonly<{ children: ReactNode; href: string; className?: string }>) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldReduceAdvancedMotion()) return;
    const moveX = gsap.quickTo(element, "x", { duration: 0.35, ease: "power3.out" });
    const moveY = gsap.quickTo(element, "y", { duration: 0.35, ease: "power3.out" });
    const onMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      moveX((event.clientX - bounds.left - bounds.width / 2) * 0.2);
      moveY((event.clientY - bounds.top - bounds.height / 2) * 0.2);
    };
    const onLeave = () => gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(element);
    };
  }, []);

  return <Link ref={ref} href={href} className={`magnetic-button type-navigation ${className}`}>{children}</Link>;
}
