import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:px-10">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-ink">404</p>
      <h1 className="mt-5 font-serif text-5xl md:text-7xl">Page not found</h1>
      <p className="mt-6 max-w-xl text-muted-ink">
        The requested page does not exist or has moved.
      </p>
      <Link className="mt-8 inline-block underline underline-offset-4" href="/">
        Return home
      </Link>
    </section>
  );
}
