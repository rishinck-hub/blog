"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import { motion } from "@/lib/motion";

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
        defaults: { ease: motion.ease.reveal },
        onComplete: () => {
          document.documentElement.dataset.firstVisitLoader = "done";
          loader.style.display = "none";
        },
      })
        .to(progress, { value: 100, duration: motion.duration.normal, onUpdate: () => { counter.textContent = String(Math.round(progress.value)).padStart(2, "0"); } })
        .to(loader, { clipPath: "inset(0 0 100% 0)", duration: motion.timing.modal.exit, ease: motion.ease.exit }, 0.4);
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
