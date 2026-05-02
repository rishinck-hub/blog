import { useEffect, useState } from 'react';
import Cursor     from './components/Cursor';
import Nav        from './components/Nav';
import Marquee    from './components/Marquee';
import Hero       from './sections/Hero';
import About      from './sections/About';
import Work       from './sections/Work';
import Skills     from './sections/Skills';
import Experience from './sections/Experience';
import Reels      from './sections/Reels';
import Contact    from './sections/Contact';

export default function App() {
  const [active, setActive] = useState('index');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Cursor />
      <Nav active={active} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Reels />
        <Contact />
      </main>
      <footer className="footer">
        <span>© 2025 Mohammed Rishin C K</span>
        <div className="footer__right">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/rishinck-hub" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:rishin@example.com">Email</a>
        </div>
      </footer>
    </>
  );
}
