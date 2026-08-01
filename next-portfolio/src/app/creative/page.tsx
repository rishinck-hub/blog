import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { RecordList } from "@/components/ui/record-list";
import { creativeEntries } from "@/data/creative";

export const metadata: Metadata = {
  title: "Creative",
  description: "A selection of video editing and motion work.",
};

export default function CreativePage() {
  return (
    <>
      <PageIntro
        eyebrow="Creative work"
        title="Stories shaped in motion"
        description="Existing creative entries are preserved as source links while approved media delivery is prepared."
      />
      <RecordList
        items={creativeEntries.map((entry) => ({
          key: entry.id.toString(),
          label: `${entry.category} · ${entry.duration}`,
          title: entry.name,
          description: entry.instagramUrl,
        }))}
      />
    </>
  );
}
