import { AnimatedLink } from "@/components/ui/animated-link";
import { siteConfig } from "@/data/site";

import { Container } from "./primitives";

export function SiteFooter() {
  return (
    <footer className="editorial-footer">
      <Container className="editorial-footer__inner">
        <p className="type-caption">© 2026 {siteConfig.name}</p>
        <nav className="editorial-footer__links" aria-label="Footer navigation">
          {siteConfig.socials.slice(0, 3).map((item) => (
            <AnimatedLink key={item.label} href={item.href} external={item.href.startsWith("http")}>{item.label}</AnimatedLink>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
