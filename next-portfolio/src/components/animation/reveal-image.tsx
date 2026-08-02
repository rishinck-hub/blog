"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { motion, shouldReduceAdvancedMotion } from "@/lib/motion";

export function RevealImage({ children, className = "" }: Readonly<{ children: ReactNode; className?: string }>) {
  const scope = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!scope.current || shouldReduceAdvancedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const image = scope.current?.querySelector("img");
      gsap.fromTo(scope.current, { clipPath: motion.reveal.imageClipFrom }, {
        clipPath: motion.reveal.imageClipTo,
        duration: motion.timing.image.duration,
        ease: motion.ease.reveal,
        scrollTrigger: { trigger: scope.current, start: "top 88%", once: true },
      });
      if (image) {
        gsap.fromTo(image, { scale: 1.06 }, {
          scale: 1,
          duration: motion.timing.image.scaleDuration,
          ease: motion.ease.reveal,
          scrollTrigger: { trigger: scope.current, start: "top 88%", once: true },
        });
      }
    }, scope);
    return () => context.revert();
  }, []);

  return <div ref={scope} className={`reveal-image ${className}`}>{children}</div>;
}
