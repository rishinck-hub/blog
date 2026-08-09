import type { ReactNode } from "react";

import { SiteScrollMotion } from "@/components/animation/site-scroll-motion";

export function PageTransition({ children }: Readonly<{ children: ReactNode }>) {
  return <SiteScrollMotion>{children}</SiteScrollMotion>;
}
