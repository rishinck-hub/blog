import Link from "next/link";
import type { ReactNode } from "react";

export function AnimatedLink({ href, children, className = "", external = false }: Readonly<{ href: string; children: ReactNode; className?: string; external?: boolean }>) {
  if (external) {
    return <a className={`animated-link type-navigation ${className}`} href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true">↗</span></a>;
  }
  return <Link className={`animated-link type-navigation ${className}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}
