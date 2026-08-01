import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "About",
  description: "About Mohammed Rishin C K and his software development capabilities.",
};

export default function AboutPage() {
  return (
    <PageIntro
      eyebrow="About / Capabilities"
      title="Engineer with a product mindset"
      description="I combine full-stack engineering, thoughtful interface work, and practical infrastructure knowledge to build dependable digital products."
    />
  );
}
