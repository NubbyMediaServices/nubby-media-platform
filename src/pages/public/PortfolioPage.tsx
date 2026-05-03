const portfolioCategories = [
  {
    title: "Weddings",
    description: "Elegant, emotional, story-driven wedding coverage.",
  },
  {
    title: "Live Events",
    description: "High-energy event photography for concerts, parties, and brand activations.",
  },
  {
    title: "Portraits",
    description: "Clean, polished portrait sessions for individuals, couples, and professionals.",
  },
  {
    title: "Private Galleries",
    description: "Secure delivery experiences for clients and paid media access.",
  },
];

export default function PortfolioPage() {
  return (
    <section className="relative px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
          Portfolio
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Featured Work
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
          A curated look at Nubby Media photography across weddings, live
          events, portraits, and private client collections.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {portfolioCategories.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <div className="aspect-[16/10] rounded-[1.5rem] bg-gradient-to-br from-white/20 via-white/5 to-emerald-400/20" />

              <h2 className="mt-6 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 text-white/60">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}