import { marqueeItems } from '../data';

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {items.map((item, i) => (
          <span key={i} className="marquee__item">
            {item}
            {i % marqueeItems.length < marqueeItems.length - 1 && (
              <span className="marquee__sep"> ✦ </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
