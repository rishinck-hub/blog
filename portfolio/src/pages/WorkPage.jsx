import PageHeader from '../components/PageHeader';
import WorkEditorial from '../sections/WorkEditorial';

export default function WorkPage() {
  return (
    <>
      <PageHeader eyebrow="Selected Work" title="Products built for" accent="real problems" description="A collection of full-stack, backend, mobile, and cloud projects built with maintainability and practical outcomes in mind." />
      <WorkEditorial showHeader={false} />
    </>
  );
}
