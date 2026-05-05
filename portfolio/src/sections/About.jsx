import Reveal from '../components/Reveal';

const TECHS = [
  'Python', 'JavaScript', 
  'React', 'Next js',
  'Django','SQL',
  'MongoDB', 'DevOps',
  'gi','github',
  'vercel','render',
  'Flutter','Firebase',
];

export default function About() {
  return (
    <section id="about" className="intro">
      <div className="intro__photo-bg" />

      {/* Left: tech grid */}
      <div className="intro__left">
        <Reveal>
          <span className="intro__left-label">Technologies I use</span>
        </Reveal>
        <div>
          <Reveal delay={80}>
            <p className="intro__clients-title">Stack & Tools</p>
          </Reveal>
          <div className="intro__clients-grid">
            {TECHS.map((t, i) => (
              <Reveal key={t} delay={i * 50}>
                <div className="intro__client">
                  <span className="intro__client-dot" />
                  {t}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Right: about text */}
      <div className="intro__right">
        <Reveal>
          <div className="intro__label-tag">Intro</div>
        </Reveal>

        <Reveal delay={100}>
          <p className="intro__text">
            Apps should be fast, elegant, and built to last. I design and engineer
            experiences that feel effortless to use.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <p className="intro__text2">
            By combining <strong>Python full-stack engineering</strong> and a strong foundation in databases, I've
            built apps that are production-ready and maintainable.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <p className="intro__text3">
            My goal is to write code that is not only functional but elegant —
            solving real problems with clean architecture. I believe great software
            is a positive force in people's lives.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <a href="#work" className="intro__cta" data-cursor>↓</a>
        </Reveal>
      </div>
    </section>
  );
}
