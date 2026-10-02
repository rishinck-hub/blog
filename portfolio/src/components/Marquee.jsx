import { marqueeItems } from '../data';

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee" aria-label={`Technologies: ${marqueeItems.join(', ')}`}>
      <div className="marquee__track" aria-hidden="true">
        {items.map((item, index) => (
          <span className="marquee__item" key={`${item}-${index}`}>
            {item}<span className="marquee__sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
