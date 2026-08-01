type PageIntroProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
}>;

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-ink">
        {eyebrow}
      </p>
      <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-none md:text-7xl">
        {title}
      </h1>
      <p className="mt-7 max-w-2xl text-base leading-7 text-muted-ink md:text-lg">
        {description}
      </p>
    </header>
  );
}
