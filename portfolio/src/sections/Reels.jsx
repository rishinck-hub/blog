import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import { reels } from '../data';

export default function Reels() {
  const [filter, setFilter] = useState('All');
  const [activeReel, setActiveReel] = useState(null);
  const cats = ['All', ...new Set(reels.map(reel => reel.cat))];
  const filtered = filter === 'All' ? reels : reels.filter(reel => reel.cat === filter);
  const backgroundReel = activeReel || filtered[0] || reels[0];

  useEffect(() => {
    if (!activeReel) return undefined;

    const onKeyDown = event => {
      if (event.key === 'Escape') setActiveReel(null);
    };

    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeReel]);

  useEffect(() => {
    if (!activeReel) return;

    const processInstagramEmbeds = () => {
      window.instgrm?.Embeds?.process();
    };

    const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');

    if (existingScript) {
      processInstagramEmbeds();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = processInstagramEmbeds;
    document.body.appendChild(script);
  }, [activeReel]);

  return (
    <section id="reels" className="reels">
      <img className="reels__bg-image" src={backgroundReel.thumb} alt="" aria-hidden="true" />
      <div className="reels__bg-overlay" aria-hidden="true" />

      <div className="reels__header">
        <Reveal>
          <h2 className="reels__title">Video<br /><span>Edits</span></h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="reels__filters">
            {cats.map(cat => (
              <button
                key={cat}
                className={`reels__filter ${filter === cat ? 'reels__filter--active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="reels__grid">
        {filtered.map((reel, index) => (
          <Reveal key={reel.id} delay={index * 60}>
            <button className="reel" type="button" onClick={() => setActiveReel(reel)} data-cursor>
              <div className="reel__thumb">
                <img src={reel.thumb} alt={reel.name} />
                <div className="reel__overlay">
                  <div className="reel__play">▶</div>
                </div>
                <span className="reel__duration">{reel.dur}</span>
              </div>
              <div className="reel__info">
                <span className="reel__cat">{reel.cat}</span>
                <h4 className="reel__name">{reel.name}</h4>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {activeReel && (
        <div className="reel-modal" role="dialog" aria-modal="true" aria-label={`${activeReel.name} video player`}>
          <button className="reel-modal__backdrop" type="button" aria-label="Close reel viewer" onClick={() => setActiveReel(null)} />
          <div className="reel-modal__panel">
            <button className="reel-modal__close" type="button" onClick={() => setActiveReel(null)} data-cursor>
              Close
            </button>
            <div className="reel-modal__video-wrap">
              <blockquote
                key={activeReel.instagramUrl}
                className="instagram-media reel-modal__embed"
                data-instgrm-permalink={activeReel.instagramUrl}
                data-instgrm-version="14"
              >
                <a href={activeReel.instagramUrl} target="_blank" rel="noreferrer">
                  View {activeReel.name} on Instagram
                </a>
              </blockquote>
            </div>
            <div className="reel-modal__meta">
              <span>{activeReel.cat}</span>
              <h3>{activeReel.name}</h3>
              <p>{activeReel.dur} vertical Instagram reel preview. If Instagram blocks embedded playback, use the source link instead.</p>
              <a href={activeReel.instagramUrl} target="_blank" rel="noreferrer" data-cursor>Open on Instagram ↗</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
