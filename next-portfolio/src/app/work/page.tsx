import type { Metadata } from "next";

import { WorkSection } from "@/components/sections/work-section";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Work", description: "Selected full-stack, backend, mobile, and cloud projects." };

export default function WorkPage() {
  return (
    <>
      <PageHeader eyebrow="Selected Work" title="Products built for" accent="real problems" description="A collection of full-stack, backend, mobile, and cloud projects built with maintainability and practical outcomes in mind." />
      <WorkSection showHeader={false} />
    </>
  );
}
