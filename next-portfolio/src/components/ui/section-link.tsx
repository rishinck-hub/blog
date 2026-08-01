import Link from "next/link";

export function SectionLink({ to, children }: Readonly<{ to: string; children: string }>) {
  return (
    <div className="section-link-wrap">
      <Link className="section-link" href={to}>
        <span>{children}</span><span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
