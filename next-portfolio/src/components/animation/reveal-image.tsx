"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

import { getMotionLevel, motion } from "@/lib/motion";

export function RevealImage({ children, className = "" }: Readonly<{ children: ReactNode; className?: string }>) {
  const scope = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const level = getMotionLevel();
    if (!scope.current || level === "off") return;
    const durationScale = level === "full" ? 1 : level === "reduced" ? 0.72 : 0.5;
    const context = gsap.context(() => {
      const image = scope.current?.querySelector("img");
      gsap.fromTo(scope.current, { clipPath: motion.reveal.imageClipFrom }, {
        clipPath: motion.reveal.imageClipTo,
        duration: motion.timing.image.duration * durationScale,
        ease: motion.ease.reveal,
        scrollTrigger: { trigger: scope.current, start: "top 88%", once: true },
      });
      if (image) {
        gsap.fromTo(image, { scale: 1.06 }, {
          scale: 1,
          duration: motion.timing.image.scaleDuration * durationScale,
          ease: motion.ease.reveal,
          scrollTrigger: { trigger: scope.current, start: "top 88%", once: true },
        });
      }
    }, scope);
    return () => context.revert();
  }, []);

  return <div ref={scope} className={`reveal-image ${className}`}>{children}</div>;
}
