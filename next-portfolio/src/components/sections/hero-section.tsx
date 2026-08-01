"use client";

import { useEffect, useRef } from "react";

import { HeroCanvas } from "@/components/animation/hero-canvas";

export function HeroSection() {
  const photoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (photoRef.current) photoRef.current.style.transform = `translateY(${window.scrollY * 0.35}px) scale(1.05)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="index" className="hero">
      <div ref={photoRef} className="hero__photo" />
      <HeroCanvas />
      <div className="hero__label">
        <div className="hero__status"><span /> Available for opportunities</div>
        <div className="hero__label-sub">Hi there! This is</div>
        <div className="hero__label-name">Mohammed <span>Rishin C K</span></div>
      </div>
      <h1 className="hero__headline"><span className="line--white">CODE</span><br /><span className="line--white">FOR THE</span><br /><span className="line--accent">FUTURE</span></h1>
      <div className="hero__panel">
        <div className="hero__services"><a href="#experience">Software Developer Intern</a><a href="#skills">Laravel &amp; React Developer</a><a href="#skills">Azure DevOps and CI/CD</a></div>
        <a href="#about" className="hero__help"><span>How can I help?</span><span className="hero__help-arrow">↗</span></a>
        <p className="hero__bio">Software Developer Intern at Zil Money and B.Tech Computer Science graduate. I build scalable full-stack applications with Laravel, MySQL, and React.</p>
        <div className="hero__awards"><span className="hero__award">Zil Money</span><span className="hero__award">Laravel</span><span className="hero__award">React</span></div>
      </div>
      <div className="hero__scroll">(Scroll down)</div>
      <div className="hero__scrollbar"><div className="hero__scrollbar-track"><div className="hero__scrollbar-thumb" /></div></div>
    </section>
  );
}
