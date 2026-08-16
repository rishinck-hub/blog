"use client";

import { useEffect, useRef } from "react";

export function CreativeBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = false;

    const updatePlayback = () => {
      if (reducedMotion.matches || !isVisible) {
        video.pause();
        return;
      }

      void video.play().catch(() => {
        // Autoplay can be declined by the browser; the static section remains usable.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        updatePlayback();
      },
      { threshold: 0.05 },
    );

    observer.observe(video);
    reducedMotion.addEventListener("change", updatePlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", updatePlayback);
      video.pause();
    };
  }, []);

  return (
    <div className="creative-hero__video" aria-hidden="true">
      <video ref={videoRef} muted loop playsInline preload="metadata" tabIndex={-1}>
        <source src="/0722.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
