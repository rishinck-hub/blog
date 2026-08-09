"use client";

import { useEffect, useState } from "react";

function getIndiaTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export function LocalTime({ className = "" }: Readonly<{ className?: string }>) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => setTime(getIndiaTime());
    const frame = requestAnimationFrame(update);
    const timer = window.setInterval(update, 30_000);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  return <time className={className} dateTime={time} suppressHydrationWarning>{time} IST</time>;
}
