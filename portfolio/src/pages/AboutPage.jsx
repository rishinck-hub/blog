import PageHeader from '../components/PageHeader';
import About from '../sections/About';
import Skills from '../sections/Skills';

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About / Capabilities" title="Engineer with a" accent="product mindset" description="I combine full-stack engineering, thoughtful interface work, and practical infrastructure knowledge to build dependable digital products." />
      <About />
      <Skills />
    </>
  );
}
