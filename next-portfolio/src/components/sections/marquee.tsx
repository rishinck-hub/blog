import { marqueeItems } from "@/data";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee" aria-label={marqueeItems.join(", ")}>
      <div className="marquee__track" aria-hidden="true">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee__item">
            {item}<span className="marquee__sep"> ✦ </span>
          </span>
        ))}
      </div>
    </div>
  );
}
