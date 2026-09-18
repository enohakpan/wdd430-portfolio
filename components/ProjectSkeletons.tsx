export function ProjectPageSkeleton() {
  return (
    <main className="container mx-auto px-4 py-12 animate-pulse">
      <section className="space-y-4 py-12 text-center">
        <div className="mx-auto h-10 w-2/3 rounded bg-gray-200" />
        <div className="mx-auto h-5 w-full max-w-2xl rounded bg-gray-200" />
        <div className="mx-auto h-5 w-5/6 rounded bg-gray-200" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="h-40 rounded bg-gray-200" />
        <div className="h-40 rounded bg-gray-200" />
      </section>
    </main>
  );
}

export function ProjectGridSkeleton() {
  return (
    <section className="grid gap-4 md:grid-cols-2 animate-pulse">
      <div className="h-40 rounded bg-gray-200" />
      <div className="h-40 rounded bg-gray-200" />
    </section>
  );
}