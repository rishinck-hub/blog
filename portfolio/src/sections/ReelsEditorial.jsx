import { useState } from 'react';
import Reveal from '../components/Reveal';
import { reels } from '../data';

export default function ReelsEditorial({ limit }) {
  const [filter, setFilter] = useState('All');
  const availableReels = limit ? reels.slice(0, limit) : reels;
  const categories = ['All', ...new Set(availableReels.map(reel => reel.cat))];
  const filtered = filter === 'All'
    ? availableReels
    : availableReels.filter(reel => reel.cat === filter);

  return (
    <section id="reels" className="reels section-shell section-shell--dark">
      <video
        className="reels__background"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex="-1"
      >
        <source src="/creativebg.mp4" type="video/mp4" />
      </video>
      <div className="reels__background-overlay" aria-hidden="true" />

      <div className="section-heading">
        <div className="section-kicker section-kicker--light">
          <span>05</span>
          <p>Creative practice</p>
        </div>
        <Reveal>
          <h2>Stories shaped<br /><em>in motion.</em></h2>
        </Reveal>
        <p className="section-heading__note">
          A parallel practice in cinematic, commercial, travel, event, and social editing.
        </p>
      </div>

      {!limit && (
        <div className="reels__filters" aria-label="Filter creative work">
          {categories.map(category => (
            <button
              key={category}
              type="button"
              className={filter === category ? 'is-active' : ''}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="reels__grid">
        {filtered.map((reel, index) => (
          <Reveal key={reel.id} delay={index * 45}>
            <a className="reel" href={reel.instagramUrl} target="_blank" rel="noreferrer">
              <div className="reel__image">
                <img src={reel.thumb} alt="" loading="lazy" />
              </div>
              <div className="reel__info">
                <span>{reel.cat} · {reel.dur}</span>
                <h3>{reel.name}</h3>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
