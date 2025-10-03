import Link from 'next/link';

export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-900">
      {/* Faint background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: "url('/photos (4).jpg')" }}
      />
      <div className="mx-auto max-w-4xl px-4 py-20 text-center relative">
        {children}
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          From your doorstep to anywhere in the world. Get an instant quote or track your parcel with ease.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/tracking"
            className="inline-block rounded-md bg-[var(--brand-accent)] text-black font-bold px-8 py-3 hover:opacity-90 transition"
          >
            Track Shipment
          </Link>
          <Link
            href="/quote"
            className="inline-block rounded-md bg-neutral-700 text-white font-medium px-8 py-3 hover:bg-neutral-600 transition"
          >
            Get a Quote
          </Link>
        </div>
      </div>

          </section>
  );
}
