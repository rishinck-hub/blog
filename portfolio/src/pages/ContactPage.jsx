import PageHeader from '../components/PageHeader';
import ContactEditorial from '../sections/ContactEditorial';

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let’s make it" accent="happen" description="Available for software development opportunities, collaborations, and thoughtful product conversations." />
      <ContactEditorial />
    </>
  );
}
