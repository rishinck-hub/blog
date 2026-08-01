import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Contact", description: "Contact Mohammed Rishin C K about software development opportunities." };

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let&apos;s make it" accent="happen" description="Available for software development opportunities, collaborations, and thoughtful product conversations." />
      <ContactSection />
    </>
  );
}
