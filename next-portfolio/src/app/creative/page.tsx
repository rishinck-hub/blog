import type { Metadata } from "next";

import { CreativeSection } from "@/components/sections/creative-section";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Creative", description: "A selection of video editing and motion work." };

export default function CreativePage() {
  return (
    <>
      <PageHeader eyebrow="Creative Work" title="Stories shaped in" accent="motion" description="A selection of cinematic, commercial, travel, event, and social edits created for digital audiences." backgroundVideo="/0722.mp4" />
      <CreativeSection />
    </>
  );
}
