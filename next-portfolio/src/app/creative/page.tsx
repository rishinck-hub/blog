import Link from "next/link";

import { CreativeBackgroundVideo } from "@/components/creative/creative-background-video";
import { CreativeGallery } from "@/components/creative/creative-gallery";
import { creativeEntries, pageMetadata } from "@/data";
import { createPageMetadata } from "@/lib/metadata";

import "./creative.css";

export const metadata = createPageMetadata(pageMetadata.creative);

export default function CreativePage() {
  return (
    <div className="creative-page">
      <header className="creative-hero editorial-container">
        <CreativeBackgroundVideo />
        <div className="creative-hero__top type-label"><span>Creative work</span><span>{String(creativeEntries.length).padStart(2, "0")} published edits</span></div>
        <h1 className="type-page-title">Stories shaped through <em>motion, rhythm and visual detail.</em></h1>
        <p className="type-body-large">A selection of existing cinematic, commercial, travel, event, music, and social edits made for digital audiences.</p>
        <span className="creative-hero__hint type-metadata">Select a frame to preview</span>
      </header>

      <CreativeGallery entries={creativeEntries} />

      <section className="creative-close">
        <div className="editorial-container creative-close__inner">
          <p className="type-label">Creative practice</p>
          <h2>Ideas move differently<br />when timing becomes part of the story.</h2>
          <div><Link className="animated-link type-label" href="/about">Read about my process <span aria-hidden="true">→</span></Link><Link className="animated-link type-label" href="/contact">Start a conversation <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>
    </div>
  );
}
