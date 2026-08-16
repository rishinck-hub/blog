import Image from "next/image";

import { Reveal } from "@/components/animation/reveal";
import { siteConfig } from "@/data";

export function ContactSection() {
  const contactLinks = [siteConfig.socials[0], siteConfig.socials[1], siteConfig.socials[2], siteConfig.socials[4]];
  return (
    <section id="contact" className="contact">
      <div className="contact__left">
        <Reveal><div className="contact__label">Got a project in mind?</div></Reveal>
        <Reveal delay={80}><h2 className="contact__title">Let&apos;s make<br />something<br /><span>happen</span></h2></Reveal>
        <div className="contact__links">
          {contactLinks.map((item, index) => (
            <Reveal key={item.label} delay={index * 70}>
              <a className="contact__link" href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} data-cursor>
                <div><div className="contact__link-label">{item.label}</div><div className="contact__link-val">{item.value}</div></div>
                <span className="contact__link-arrow" aria-hidden="true">↗</span>
              </a>
            </Reveal>
          ))}
          <a href={siteConfig.resumeUrl} download="Rishin_CK_Resume.pdf" className="resume-btn" data-cursor>
            <span>Download Resume</span><span className="resume-btn__arrow" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <Reveal direction="right" className="contact__right">
        <div className="contact__photo">
          <Image src="https://rishinck-hub.github.io/Portfolio/images/rishin_poster.png" alt="Mohammed Rishin C K" width={1010} height={1347} sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      </Reveal>
    </section>
  );
}
