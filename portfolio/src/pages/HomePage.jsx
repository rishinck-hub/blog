import HeroEditorial from '../sections/HeroEditorial';
import Marquee from '../components/Marquee';
import AboutEditorial from '../sections/AboutEditorial';
import WorkEditorial from '../sections/WorkEditorial';
import SkillsEditorial from '../sections/SkillsEditorial';
import ExperienceEditorial from '../sections/ExperienceEditorial';
import ReelsEditorial from '../sections/ReelsEditorial';
import SectionLink from '../components/SectionLink';
import { siteLinks } from '../data';

export default function HomePage() {
  return (
    <>
      <HeroEditorial />
      <Marquee />
      <AboutEditorial compact />
      <WorkEditorial limit={4} />
      <SectionLink to="/work">View the full project archive</SectionLink>
      <SkillsEditorial limit={4} />
      <SectionLink to="/about">More about my approach</SectionLink>
      <ExperienceEditorial limit={3} />
      <SectionLink to="/experience">View the complete journey</SectionLink>
      <ReelsEditorial limit={3} />
      <SectionLink to="/creative">Explore creative work</SectionLink>
      <section className="home-contact">
        <p className="eyebrow">Start a conversation</p>
        <h2>Let’s make something<br /><em>useful together.</em></h2>
        <div className="home-contact__bottom">
          <p>Have a role, project, or thoughtful idea in mind? I’d be glad to hear about it.</p>
          <a className="button button--inverse" href={siteLinks.email}>Send me an email <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </>
  );
}
