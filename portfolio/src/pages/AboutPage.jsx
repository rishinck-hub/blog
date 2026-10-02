import PageHeader from '../components/PageHeader';
import AboutEditorial from '../sections/AboutEditorial';
import SkillsEditorial from '../sections/SkillsEditorial';

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About / Capabilities" title="Engineering with a" accent="product mindset" description="I combine full-stack engineering, thoughtful interface work, and practical infrastructure knowledge to build dependable digital products." />
      <AboutEditorial />
      <SkillsEditorial />
    </>
  );
}
