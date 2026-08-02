import type { ReactNode } from "react";

export function SectionLabel({ children, className = "" }: Readonly<{ children: ReactNode; className?: string }>) {
  return <p className={`editorial-section-label type-label ${className}`}>{children}</p>;
}
