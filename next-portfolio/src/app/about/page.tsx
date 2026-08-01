import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "About", description: "About Mohammed Rishin C K and his software development capabilities." };

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About / Capabilities" title="Engineer with a" accent="product mindset" description="I combine full-stack engineering, thoughtful interface work, and practical infrastructure knowledge to build dependable digital products." />
      <AboutSection />
      <SkillsSection />
    </>
  );
}
