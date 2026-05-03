import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <section className="relative px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
          Contact
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Let’s build your gallery experience.
        </h1>

        <p className="mt-6 text-lg leading-8 text-white/70">
          Reach out for weddings, live events, portrait sessions, private
          client galleries, and secure media delivery options.
        </p>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                Email
              </p>
              <p className="mt-2 text-lg">contact@nubbymedia.com</p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                Portal
              </p>
              <Link
                to="/client/login"
                className="mt-2 inline-block text-lg text-emerald-400 hover:text-emerald-300"
              >
                Client Login
              </Link>
            </div>
          </div>

          <Link
            to="/booking"
            className="mt-8 inline-flex rounded-full bg-emerald-400 px-6 py-3 font-semibold text-black hover:bg-emerald-300"
          >
            Start Booking Request
          </Link>
        </div>
      </div>
    </section>
  );
}