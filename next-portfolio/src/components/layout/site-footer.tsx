import Link from "next/link";

import { LocalTime } from "@/components/ui/local-time";
import { siteConfig } from "@/data/site";

import { Container } from "./primitives";

export function SiteFooter() {
  return (
    <footer className="editorial-footer">
      <Container className="editorial-footer__inner">
        <div className="editorial-footer__eyebrow type-label"><span>Have an idea?</span><span>Available for opportunities</span></div>
        <h2 className="editorial-footer__statement">
          {["Let's build", "something", "meaningful."].map((line) => <span className="editorial-footer__statement-line" key={line}><span>{line}{" "}</span></span>)}
        </h2>
        <Link className="editorial-footer__cta type-label" href="/contact" data-cursor-label="Open">Let&apos;s talk <span aria-hidden="true">→</span></Link>

        <div className="editorial-footer__divider" />
        <div className="editorial-footer__details">
          <div><span className="type-label">Email</span><a href={siteConfig.socials[0].href} data-cursor-label="Open">{siteConfig.socials[0].value}<span aria-hidden="true">↗</span></a></div>
          <div><span className="type-label">Social</span>{siteConfig.socials.slice(1, 3).map((item) => <a href={item.href} target="_blank" rel="noreferrer" data-cursor-label="Open" key={item.label}>{item.label}<span aria-hidden="true">↗</span></a>)}</div>
          <div><span className="type-label">Based in</span><p>India</p><LocalTime className="type-metadata" /></div>
          <nav aria-label="Footer navigation"><span className="type-label">Navigate</span>{siteConfig.navigation.map((item) => <Link href={item.href} data-cursor-label="Open" key={item.href}>{item.label}<span aria-hidden="true">→</span></Link>)}</nav>
        </div>

        <div className="editorial-footer__divider" />
        <Link className="editorial-footer__wordmark" href="/" aria-label="Rishin — Home" data-cursor-label="Open">RISHIN<sup>®</sup></Link>
        <div className="editorial-footer__bottom type-caption"><span>© 2026 {siteConfig.name}</span><span>Designed and developed with care.</span></div>
      </Container>
    </footer>
  );
}
