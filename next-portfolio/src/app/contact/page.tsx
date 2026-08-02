import { TextReveal } from "@/components/animation/text-reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

import "./contact.css";

export const metadata = createPageMetadata({ title: "Contact", description: "Contact Mohammed Rishin C K about software development roles, projects, and collaborations.", path: "/contact" });

const contactLinks = [siteConfig.socials[0], siteConfig.socials[1], siteConfig.socials[2]];

export default function ContactPage() {
  return (
    <div className="contact-page">
      <header className="contact-hero editorial-container">
        <div className="contact-hero__top type-label"><span>Contact</span><span>Available for opportunities</span></div>
        <TextReveal as="h1" text="Have a project, role or idea in mind?" mode="line" trigger="load" lines={["Have a project,", "role or idea", <em key="focus">in mind?</em>]} />
        <p className="type-body-large">Tell me what you are working on, where you need help, or what kind of role you have in mind.</p>
        <a className="contact-hero__email animated-link type-label" href={contactLinks[0].href}>{contactLinks[0].value} <span aria-hidden="true">↗</span></a>
      </header>

      <section className="contact-content editorial-container" aria-labelledby="contact-form-title">
        <div className="contact-details">
          <p className="type-label">01 — Direct</p>
          <div className="contact-details__list">
            {contactLinks.map((item) => (
              <a href={item.href} data-cursor-label="Open" target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined} key={item.label}>
                <span className="type-metadata">{item.label}</span><strong>{item.value}</strong><span aria-hidden="true">↗</span>
              </a>
            ))}
            <div><span className="type-metadata">Location</span><strong>India</strong><span aria-hidden="true">—</span></div>
          </div>
          <p className="contact-details__note type-metadata">For sensitive information, please start with a general introduction and avoid including credentials, customer data, or private system details.</p>
        </div>

        <div className="contact-form-wrap">
          <div className="contact-form-wrap__head"><p className="type-label">02 — Write a message</p><span className="type-metadata">All fields are required</span></div>
          <TextReveal as="h2" id="contact-form-title" className="contact-form-title" text="Start with the essentials." />
          <ContactForm recipient={contactLinks[0].value} endpoint={process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT} />
        </div>
      </section>

      <section className="contact-close">
        <div className="editorial-container contact-close__inner"><span className="type-label">Prefer email?</span><a href={contactLinks[0].href}>{contactLinks[0].value}</a></div>
      </section>
    </div>
  );
}
