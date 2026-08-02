"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function FirstVisitLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const loader = loaderRef.current;
    const counter = counterRef.current;
    if (!loader || !counter || document.documentElement.dataset.firstVisitLoader !== "show") return;

    const progress = { value: 0 };
    const context = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.documentElement.dataset.firstVisitLoader = "done";
          loader.style.display = "none";
        },
      })
        .to(progress, { value: 100, duration: 0.52, ease: "power2.out", onUpdate: () => { counter.textContent = String(Math.round(progress.value)).padStart(2, "0"); } })
        .to(loader, { clipPath: "inset(0 0 100% 0)", duration: 0.42 }, 0.4);
    }, loader);

    return () => context.revert();
  }, []);

  return (
    <div ref={loaderRef} className="first-visit-loader" aria-hidden="true">
      <span className="first-visit-loader__wordmark">RISHIN®</span>
      <span className="first-visit-loader__counter"><span ref={counterRef}>00</span> — 100</span>
    </div>
  );
}
