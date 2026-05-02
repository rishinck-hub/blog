import { useState } from 'react';
import Reveal from '../components/Reveal';
import { reels } from '../data';

export default function Reels() {
  const [filter, setFilter] = useState('All');
  const cats = ['All', ...new Set(reels.map(r => r.cat))];
  const filtered = filter === 'All' ? reels : reels.filter(r => r.cat === filter);

  return (
    <section id="reels" className="reels">
      <div className="reels__header">
        <Reveal>
          <h2 className="reels__title">Video<br /><span>Edits</span></h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="reels__filters">
            {cats.map(c => (
              <button
                key={c}
                className={`reels__filter ${filter === c ? 'reels__filter--active' : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="reels__grid">
        {filtered.map((r, i) => (
          <Reveal key={r.id} delay={i * 60}>
            <a className="reel" href="#" data-cursor>
              <div className="reel__thumb">
                <img src={r.thumb} alt={r.name} />
                <div className="reel__overlay">
                  <div className="reel__play">▶</div>
                </div>
                <span className="reel__duration">{r.dur}</span>
              </div>
              <div className="reel__info">
                <span className="reel__cat">{r.cat}</span>
                <h4 className="reel__name">{r.name}</h4>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
