import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { RecordList } from "@/components/ui/record-list";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience, education, training, leadership, and workshops.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        eyebrow="Experience / Education"
        title="Learning through building"
        description="Professional experience, education, technical training, leadership, and workshops preserved from the existing portfolio."
      />
      <RecordList
        items={experience.map((entry) => ({
          key: `${entry.period}-${entry.role}`,
          label: entry.period,
          title: entry.role,
          description: `${entry.organization} — ${entry.description}`,
        }))}
      />
    </>
  );
}
