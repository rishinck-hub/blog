"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { motion, shouldReduceAdvancedMotion } from "@/lib/motion";

type TextRevealProps = Readonly<{
  text: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}>;

export function TextReveal({ text, as: Tag = "span", className = "", delay = 0 }: TextRevealProps) {
  const scope = useRef<HTMLElement>(null);
  const words = text.trim().split(/\s+/);

  useLayoutEffect(() => {
    if (!scope.current || shouldReduceAdvancedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        ".text-reveal__word",
        { yPercent: 110, opacity: motion.reveal.opacity },
        {
          yPercent: 0,
          opacity: 1,
          duration: motion.timing.text.duration,
          delay,
          ease: motion.ease.reveal,
          stagger: motion.timing.text.stagger,
          scrollTrigger: { trigger: scope.current, start: "top 88%", once: true },
        },
      );
    }, scope);
    return () => context.revert();
  }, [delay]);

  return (
    <Tag ref={scope as React.Ref<never>} className={`text-reveal ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <span className="text-reveal__word" aria-hidden="true" key={`${word}-${index}`}>
          {word}{index < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </Tag>
  );
}
