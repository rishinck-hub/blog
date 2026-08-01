import type { Metadata } from "next";

import { ExperienceSection } from "@/components/sections/experience-section";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Experience", description: "Professional experience, education, training, leadership, and workshops." };

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience / Education" title="Learning through" accent="building" description="Professional experience, education, technical training, leadership, and workshops that shaped how I approach software." />
      <ExperienceSection />
    </>
  );
}
