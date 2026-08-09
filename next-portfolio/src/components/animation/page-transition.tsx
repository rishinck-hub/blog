"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SiteScrollMotion } from "@/components/animation/site-scroll-motion";

const routeMeta: Record<string, { number: string; label: string }> = {
  "/": { number: "01", label: "Home" },
  "/work": { number: "02", label: "Work" },
  "/about": { number: "03", label: "About" },
  "/experience": { number: "04", label: "Experience" },
  "/creative": { number: "05", label: "Creative" },
  "/contact": { number: "06", label: "Contact" },
};

export function PageTransition({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const meta = pathname.startsWith("/work/") ? { number: "02", label: "Project" } : routeMeta[pathname] ?? { number: "00", label: "Page" };

  return (
    <div className="page-transition-shell">
      <div className="page-transition-wipe" aria-hidden="true"><span>{meta.number} — {meta.label}</span></div>
      <SiteScrollMotion>{children}</SiteScrollMotion>
    </div>
  );
}
