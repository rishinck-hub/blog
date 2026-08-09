"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { getMotionLevel, motion } from "@/lib/motion";

const routeMeta: Record<string, { number: string; label: string }> = {
  "/": { number: "01", label: "Home" },
  "/work": { number: "02", label: "Work" },
  "/about": { number: "03", label: "About" },
  "/experience": { number: "04", label: "Experience" },
  "/creative": { number: "05", label: "Creative" },
  "/contact": { number: "06", label: "Contact" },
};

function getRouteMeta(pathname: string) {
  return pathname.startsWith("/work/") ? { number: "02", label: "Project" } : routeMeta[pathname] ?? { number: "00", label: "Page" };
}

function setLabel(element: HTMLElement | null, pathname: string) {
  if (!element) return;
  const meta = getRouteMeta(pathname);
  element.textContent = `${meta.number} — ${meta.label}`;
}

export function RouteTransitionProvider() {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const currentLabelRef = useRef<HTMLSpanElement>(null);
  const nextLabelRef = useRef<HTMLSpanElement>(null);
  const previousPathRef = useRef(pathname);
  const pendingPathRef = useRef<string | null>(null);
  const intentTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const level = getMotionLevel();
    const reducedMotion = level === "off";
    const scale = level === "essential" ? 0.5 : level === "reduced" ? 0.75 : 1;

    const onNavigationIntent = (event: MouseEvent) => {
      if (reducedMotion || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download") || anchor.dataset.noRouteTransition !== undefined) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname || url.hash) return;

      pendingPathRef.current = url.pathname;
      setLabel(currentLabelRef.current, previousPathRef.current);
      setLabel(nextLabelRef.current, url.pathname);
      intentTimelineRef.current?.kill();
      intentTimelineRef.current = gsap.timeline()
        .set(panel, { visibility: "visible", clipPath: "inset(0 100% 0 0)" })
        .set(currentLabelRef.current, { yPercent: 0, autoAlpha: 1 })
        .set(nextLabelRef.current, { yPercent: 120, autoAlpha: 0 })
        .to(panel, { clipPath: "inset(0)", duration: motion.duration.fast * scale, ease: motion.ease.exit })
        .to(currentLabelRef.current, { yPercent: -120, autoAlpha: 0, duration: motion.duration.fast * scale, ease: motion.ease.exit }, 0.04 * scale)
        .to(nextLabelRef.current, { yPercent: 0, autoAlpha: 1, duration: motion.duration.normal * scale, ease: motion.ease.reveal }, 0.08 * scale);
    };

    document.addEventListener("click", onNavigationIntent, true);
    return () => {
      document.removeEventListener("click", onNavigationIntent, true);
      intentTimelineRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (previousPathRef.current === pathname) return;
    const panel = panelRef.current;
    const level = getMotionLevel();
    const reducedMotion = level === "off";
    const scale = level === "essential" ? 0.5 : level === "reduced" ? 0.75 : 1;
    previousPathRef.current = pathname;
    if (!panel || reducedMotion) {
      pendingPathRef.current = null;
      return;
    }

    setLabel(nextLabelRef.current, pathname);
    intentTimelineRef.current?.kill();
    const hadIntent = pendingPathRef.current === pathname;
    pendingPathRef.current = null;
    const timeline = gsap.timeline({ onComplete: () => gsap.set(panel, { visibility: "hidden" }) });

    if (!hadIntent) {
      timeline
        .set(panel, { visibility: "visible", clipPath: "inset(0 0 0 100%)" })
        .set(nextLabelRef.current, { yPercent: 35, autoAlpha: 0 })
        .to(panel, { clipPath: "inset(0)", duration: 0.12 * scale, ease: motion.ease.exit })
        .to(nextLabelRef.current, { yPercent: 0, autoAlpha: 1, duration: motion.duration.fast * scale, ease: motion.ease.reveal }, 0);
    } else {
      timeline.set(panel, { visibility: "visible", clipPath: "inset(0)" });
    }

    timeline
      .to(nextLabelRef.current, { yPercent: -35, autoAlpha: 0, duration: motion.duration.fast * scale, ease: motion.ease.exit }, ">+0.02")
      .to(panel, { clipPath: "inset(0 0 0 100%)", duration: motion.timing.route * scale, ease: motion.ease.editorial }, "<");
    return () => {
      timeline.kill();
    };
  }, [pathname]);

  return (
    <div ref={panelRef} className="route-transition-panel" aria-hidden="true">
      <span className="route-transition-panel__label route-transition-panel__label--current" ref={currentLabelRef} />
      <span className="route-transition-panel__label route-transition-panel__label--next" ref={nextLabelRef} />
    </div>
  );
}
