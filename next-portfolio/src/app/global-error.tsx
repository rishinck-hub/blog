"use client";

export default function GlobalError({
  unstable_retry,
}: Readonly<{
  error: Error & { digest?: string };
  unstable_retry: () => void;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>Something went wrong</h1>
          <p>The portfolio could not be rendered.</p>
          <button onClick={() => unstable_retry()} type="button">
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
