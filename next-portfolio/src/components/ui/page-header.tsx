type PageHeaderProps = Readonly<{
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  backgroundVideo?: string;
}>;

export function PageHeader({ eyebrow, title, accent, description, backgroundVideo }: PageHeaderProps) {
  return (
    <header className="page-hero">
      {backgroundVideo ? (
        <div className="page-hero__video" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="metadata">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      ) : null}
      <p className="page-hero__eyebrow">{eyebrow}</p>
      <h1 className="page-hero__title">
        <span className="page-hero__title-line">{title}</span><br />
        <span className="page-hero__title-line page-hero__title-line--accent">{accent}</span>
      </h1>
      <p className="page-hero__description">{description}</p>
    </header>
  );
}
