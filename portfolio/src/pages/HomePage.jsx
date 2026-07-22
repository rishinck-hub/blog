import Hero from '../sections/Hero';
import Marquee from '../components/Marquee';
import About from '../sections/About';
import Work from '../sections/Work';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Reels from '../sections/Reels';
import SectionLink from '../components/SectionLink';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About compact />
      <Work limit={3} />
      <SectionLink to="/work">Explore all projects</SectionLink>
      <Skills limit={4} />
      <SectionLink to="/about">More about my skills</SectionLink>
      <Experience limit={2} />
      <SectionLink to="/experience">View full experience</SectionLink>
      <Reels limit={3} />
      <SectionLink to="/creative">Explore creative work</SectionLink>
      <section className="home-contact">
        <p>Have a project or opportunity in mind?</p>
        <h2>Let’s build<br /><span>something great.</span></h2>
        <div className="home-contact__details">
          <a href="mailto:rishinkpm@gmail.com">
            <span>Email</span>
            <strong>rishinkpm@gmail.com</strong>
          </a>
          <a href="https://www.linkedin.com/in/mohammed-rishin-c-k-a00525240/" target="_blank" rel="noreferrer">
            <span>LinkedIn</span>
            <strong>Mohammed Rishin C K</strong>
          </a>
          <a href="https://github.com/rishinck-hub" target="_blank" rel="noreferrer">
            <span>GitHub</span>
            <strong>rishinck-hub</strong>
          </a>
          <a href="https://wa.me/916238634185" target="_blank" rel="noreferrer">
            <span>WhatsApp</span>
            <strong>+91 623 863 4185</strong>
          </a>
        </div>
        <SectionLink to="/contact">Start a conversation</SectionLink>
      </section>
    </>
  );
}
