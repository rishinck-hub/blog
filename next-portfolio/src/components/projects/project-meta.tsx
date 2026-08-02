type MetaItem = Readonly<{ label: string; value: string }>;

export function ProjectMeta({ items, className = "" }: Readonly<{ items: readonly MetaItem[]; className?: string }>) {
  return (
    <dl className={`editorial-project-meta type-metadata ${className}`}>
      {items.map((item) => (
        <div className="editorial-project-meta__item" key={`${item.label}-${item.value}`}>
          <dt className="editorial-project-meta__term">{item.label}</dt><dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
