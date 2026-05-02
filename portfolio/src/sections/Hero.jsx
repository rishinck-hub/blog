import { useEffect, useRef } from 'react';

export default function Hero() {
  const photoRef = useRef(null);

  // Scroll parallax on photo
  useEffect(() => {
    const onScroll = () => {
      if (!photoRef.current) return;
      const y = window.scrollY;
      photoRef.current.style.transform = `translateY(${y * 0.35}px) scale(1.05)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="index" className="hero">
      {/* Full-bleed photo */}
      <div ref={photoRef} className="hero__photo" />

      {/* Top-left name label */}
      <div className="hero__label">
        <div className="hero__label-sub">Hi there! this is</div>
        <div className="hero__label-name">
          Mohammed <span>Rishin C K</span>
        </div>
      </div>

      {/* Giant bottom-left headline */}
      <h1 className="hero__headline">
        <span className="line--white">CODE</span><br />
        <span className="line--white">FOR THE</span><br />
        <span className="line--accent">FUTURE</span>
      </h1>

      {/* Right info panel */}
      <div className="hero__panel">
        <div className="hero__services">
          <a href="#skills">Full-Stack Developer</a>
          <a href="#skills">Azure Devops and CI/CD</a>
          <a href="#skills">Database Design</a>
        </div>

        <a href="#about" className="hero__help">
          <span>How can I help?</span>
          <span className="hero__help-arrow">↗</span>
        </a>

        <p className="hero__bio">
          B Tech Computer Science Graduate specialised in Python
          full-stack Developent. I build scalable, efficient applications and craft
          visual stories through video editing.
        </p>

        <div className="hero__awards">
          <span className="hero__award">B.Tech CS</span>
          <span className="hero__award">MCET</span>
          <span className="hero__award">2021–25</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero__scroll">(Scroll down)</div>

      {/* Right edge scrollbar animation */}
      <div className="hero__scrollbar">
        <div className="hero__scrollbar-track">
          <div className="hero__scrollbar-thumb" />
        </div>
      </div>
    </section>
  );
}
