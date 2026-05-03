export default function BookingPage() {
  return (
    <section className="relative px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
          Booking
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Booking request
        </h1>

        <p className="mt-6 text-lg leading-8 text-white/70">
          This page will become the booking request flow for weddings, live
          events, portraits, and custom media delivery packages.
        </p>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <p className="text-white/70">
            Placeholder for the booking form. We can connect this later to
            email, a backend endpoint, or a CRM-style lead table.
          </p>
        </div>
      </div>
    </section>
  );
}