"use client";

export default function ErrorPage({
  unstable_retry,
}: Readonly<{
  error: Error & { digest?: string };
  unstable_retry: () => void;
}>) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 md:px-10">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-ink">Error</p>
      <h1 className="mt-5 font-serif text-5xl md:text-7xl">
        Something went wrong
      </h1>
      <p className="mt-6 max-w-xl text-muted-ink">
        The page could not be rendered. You can safely try the request again.
      </p>
      <button
        className="mt-8 border border-ink px-5 py-3"
        onClick={() => unstable_retry()}
        type="button"
      >
        Try again
      </button>
    </section>
  );
}
