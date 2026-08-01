type RecordListItem = Readonly<{
  key: string;
  label: string;
  title: string;
  description?: string;
}>;

type RecordListProps = Readonly<{
  items: readonly RecordListItem[];
}>;

export function RecordList({ items }: RecordListProps) {
  return (
    <ol className="mx-auto max-w-6xl border-t border-rule px-6 md:px-10">
      {items.map((item) => (
        <li
          className="grid gap-3 border-b border-rule py-8 md:grid-cols-[12rem_1fr]"
          key={item.key}
        >
          <p className="text-sm text-muted-ink">{item.label}</p>
          <div>
            <h2 className="text-xl font-medium">{item.title}</h2>
            {item.description ? (
              <p className="mt-3 max-w-3xl leading-7 text-muted-ink">
                {item.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
