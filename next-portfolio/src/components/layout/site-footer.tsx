import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <span>© 2026 {siteConfig.name}</span>
      <div className="footer__right">
        {siteConfig.socials.slice(0, 3).map((item) => (
          <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
            {item.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
