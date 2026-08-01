import { AboutSection } from "@/components/sections/about-section";
import { CreativeSection } from "@/components/sections/creative-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { Marquee } from "@/components/sections/marquee";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorkSection } from "@/components/sections/work-section";
import { SectionLink } from "@/components/ui/section-link";
import { siteConfig } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <AboutSection compact />
      <WorkSection limit={3} />
      <SectionLink to="/work">Explore all projects</SectionLink>
      <SkillsSection limit={4} />
      <SectionLink to="/about">More about my skills</SectionLink>
      <ExperienceSection limit={2} />
      <SectionLink to="/experience">View full experience</SectionLink>
      <CreativeSection limit={3} />
      <SectionLink to="/creative">Explore creative work</SectionLink>
      <section className="home-contact">
        <p>Have a project or opportunity in mind?</p>
        <h2>Let&apos;s build<br /><span>something great.</span></h2>
        <div className="home-contact__details">
          {[siteConfig.socials[0], siteConfig.socials[1], siteConfig.socials[2], siteConfig.socials[4]].map((item) => (
            <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
              <span>{item.label}</span><strong>{item.value}</strong>
            </a>
          ))}
        </div>
        <SectionLink to="/contact">Start a conversation</SectionLink>
      </section>
    </>
  );
}
