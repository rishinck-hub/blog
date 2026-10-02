import PageHeader from '../components/PageHeader';
import ExperienceEditorial from '../sections/ExperienceEditorial';

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience / Education" title="Learning through" accent="building" description="Production experience, technical training, education, and leadership that shaped how I approach software." />
      <ExperienceEditorial />
    </>
  );
}
