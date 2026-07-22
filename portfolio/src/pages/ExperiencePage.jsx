import PageHeader from '../components/PageHeader';
import Experience from '../sections/Experience';

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience / Education" title="Learning through" accent="building" description="Professional experience, education, technical training, leadership, and workshops that shaped how I approach software." />
      <Experience />
    </>
  );
}
