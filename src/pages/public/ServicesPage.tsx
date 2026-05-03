const services = [
  {
    title: "Wedding Photography",
    description:
      "Full-day and partial-day wedding coverage with edited galleries and secure digital delivery.",
  },
  {
    title: "Live Event Coverage",
    description:
      "Photography for concerts, parties, nightlife, community events, and brand activations.",
  },
  {
    title: "Portrait Sessions",
    description:
      "Professional portraits for creatives, couples, graduates, business owners, and personal branding.",
  },
  {
    title: "Private Client Galleries",
    description:
      "Password-protected photo delivery with download access, payment support, and client-only viewing.",
  },
];

export default function ServicesPage() {
  return (
    <section className="relative px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
          Services
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Photography services built around experience.
        </h1>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8"
            >
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <p className="mt-4 leading-7 text-white/60">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}