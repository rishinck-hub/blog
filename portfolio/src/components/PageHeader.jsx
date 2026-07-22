export default function PageHeader({ eyebrow, title, accent, description, backgroundVideoId }) {
  return (
    <header className="page-hero">
      {backgroundVideoId && (
        <div className="page-hero__video" aria-hidden="true">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${backgroundVideoId}?autoplay=1&mute=1&loop=1&playlist=${backgroundVideoId}&controls=0&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`}
            title="Creative work background video"
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex="-1"
          />
        </div>
      )}
      <p className="page-hero__eyebrow">{eyebrow}</p>
      <h1 className="page-hero__title">
        <span className="page-hero__title-line">{title}</span>
        <br />
        <span className="page-hero__title-line page-hero__title-line--accent">{accent}</span>
      </h1>
      <p className="page-hero__description">{description}</p>
    </header>
  );
}
