import PageHeader from '../components/PageHeader';
import Contact from '../sections/Contact';

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let’s make it" accent="happen" description="Available for software development opportunities, collaborations, and thoughtful product conversations." />
      <Contact />
    </>
  );
}
