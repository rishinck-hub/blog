export default function PageHeader({ eyebrow, title, accent, description, backgroundVideo }) {
  return (
    <header className={`page-hero ${backgroundVideo ? 'page-hero--media' : ''}`}>
      {backgroundVideo && (
        <div className="page-hero__video" aria-hidden="true">
          <video muted loop playsInline preload="none" poster="/profile.png">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="page-hero__index">Portfolio / 2026</div>
      <p className="eyebrow page-hero__eyebrow">{eyebrow}</p>
      <h1 className="page-hero__title">
        {title}<br /><em>{accent}</em>
      </h1>
      <p className="page-hero__description">{description}</p>
      <span className="page-hero__mark" aria-hidden="true">↘</span>
    </header>
  );
}
