"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { getMotionLevel, motion } from "@/lib/motion";

type TextRevealProps = Readonly<{
  text: string;
  id?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  mode?: "line" | "word" | "character";
  trigger?: "load" | "scroll";
  reversible?: boolean;
  lines?: readonly ReactNode[];
}>;

export function TextReveal({
  text,
  id,
  as: Tag = "span",
  className = "",
  delay = 0,
  mode = "word",
  trigger = "scroll",
  reversible = false,
  lines,
}: TextRevealProps) {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = scope.current;
    const level = getMotionLevel();
    if (!element || level === "off") return;
    gsap.registerPlugin(ScrollTrigger);

    let active = true;
    let resizeFrame = 0;
    const targets = element.querySelectorAll<HTMLElement>(".text-reveal__unit");
    const density = level === "full" ? 1 : level === "reduced" ? 0.72 : 0.48;
    const stagger = (mode === "line" ? motion.stagger.normal : mode === "character" ? motion.stagger.tight / 2 : motion.stagger.tight) * density;
    const context = gsap.context(() => {
      const animation = gsap.fromTo(targets, { yPercent: 112, autoAlpha: 0 }, {
        yPercent: 0,
        autoAlpha: 1,
        duration: (mode === "character" ? motion.duration.normal : motion.timing.text.duration) * density,
        delay,
        ease: motion.ease.reveal,
        stagger,
        paused: trigger === "scroll",
      });

      if (trigger === "scroll") {
        ScrollTrigger.create({
          trigger: element,
          start: "top 88%",
          animation,
          once: !reversible,
          toggleActions: reversible ? "play reverse play reverse" : "play none none none",
        });
      }
    }, element);

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(element);
    void document.fonts?.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });

    return () => {
      active = false;
      cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      context.revert();
    };
  }, [delay, mode, reversible, trigger]);

  const units = mode === "line"
    ? (lines ?? text.split("\n")).map((line, index) => (
        <span className="text-reveal__clip text-reveal__line" aria-hidden="true" key={index}>
          <span className="text-reveal__unit">{line}</span>
        </span>
      ))
    : Array.from(mode === "character" ? text : text.trim().split(/\s+/)).map((unit, index, values) => (
        <span className={`text-reveal__clip text-reveal__${mode}`} aria-hidden="true" key={`${unit}-${index}`}>
          <span className="text-reveal__unit">{mode === "character" && unit === " " ? "\u00a0" : unit}</span>
          {mode === "word" && index < values.length - 1 ? <span className="text-reveal__space"> </span> : null}
        </span>
      ));

  return <Tag ref={scope as React.Ref<never>} id={id} className={`text-reveal text-reveal--${mode} ${className}`} aria-label={text.replace(/\n/g, " ")}>{units}</Tag>;
}
