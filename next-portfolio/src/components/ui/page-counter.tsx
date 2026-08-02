export function PageCounter({ current, total, label }: Readonly<{ current: number; total: number; label?: string }>) {
  return (
    <p className="editorial-page-counter type-metadata" aria-label={`${label ? `${label}, ` : ""}item ${current} of ${total}`}>
      <span>{String(current).padStart(2, "0")}</span><span aria-hidden="true">/</span><span>{String(total).padStart(2, "0")}</span>
    </p>
  );
}
