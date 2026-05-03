import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="relative px-6 py-20 text-white">
      <div className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-emerald-400">
            Nubby Media
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
            Premium photography for unforgettable moments.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Live events, weddings, portraits, and private client galleries
            delivered through a secure branded media experience.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/portfolio"
              className="rounded-full bg-emerald-400 px-6 py-3 font-semibold text-black hover:bg-emerald-300"
            >
              View Portfolio
            </Link>

            <Link
              to="/contact"
              className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:border-white/60"
            >
              Book a Session
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl">
          <div className="aspect-[4/5] rounded-[1.5rem] bg-gradient-to-br from-white/20 via-white/5 to-emerald-400/20" />
          <p className="mt-5 text-sm text-white/50">
            Replace this block with a featured Nubby Media photo or hero image.
          </p>
        </div>
      </div>
    </section>
  );
}