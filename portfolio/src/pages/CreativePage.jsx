import PageHeader from '../components/PageHeader';
import ReelsEditorial from '../sections/ReelsEditorial';

export default function CreativePage() {
  return (
    <>
      <PageHeader eyebrow="Creative Work" title="Stories shaped in" accent="motion" description="A selection of cinematic, commercial, travel, event, and social edits created for digital audiences." />
      <ReelsEditorial />
    </>
  );
}
