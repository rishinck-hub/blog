import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react";

type BaseProps = Readonly<HTMLAttributes<HTMLDivElement> & { children: ReactNode }>;

function join(base: string, custom?: string) {
  return custom ? `${base} ${custom}` : base;
}

export function Container({ children, className, ...props }: BaseProps) {
  return <div className={join("editorial-container", className)} {...props}>{children}</div>;
}

export function FullBleed({ children, className, ...props }: BaseProps) {
  return <div className={join("editorial-full-bleed", className)} {...props}>{children}</div>;
}

type SectionProps = Readonly<ComponentPropsWithoutRef<"section"> & { fullScreen?: boolean }>;

export function Section({ children, className, fullScreen = false, ...props }: SectionProps) {
  return (
    <section className={join(`editorial-section${fullScreen ? " editorial-section--viewport" : ""}`, className)} {...props}>
      {children}
    </section>
  );
}

export function EditorialGrid({ children, className, ...props }: BaseProps) {
  return <div className={join("editorial-grid", className)} {...props}>{children}</div>;
}

export function SectionIntro({ label, children, className, ...props }: Readonly<HTMLAttributes<HTMLDivElement> & { label: ReactNode; children: ReactNode }>) {
  return (
    <div className={join("editorial-section-intro", className)} {...props}>
      <div className="editorial-section-intro__label">{label}</div>
      <div className="editorial-section-intro__content">{children}</div>
    </div>
  );
}
