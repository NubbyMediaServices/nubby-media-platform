import { Link } from "react-router-dom";

const footerLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
  { to: "/client/login", label: "Client Login" },
];

export default function PremiumFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink/90">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neon/40 bg-neon/10 shadow-glow">
                <span className="text-lg font-black text-neon">NM</span>
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-neon">
                  Nubby
                </p>
                <p className="-mt-1 font-display text-xl text-cream">Media</p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              Premium photography for weddings, live events, portraits, and
              private client gallery delivery.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-cream">
              Explore
            </h2>

            <nav className="mt-5 flex flex-col gap-3 text-sm text-muted">
              {footerLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="transition hover:text-neon"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-cream">
              Contact
            </h2>

            <div className="mt-5 space-y-3 text-sm text-muted">
              <p>contact@nubbymedia.com</p>
              <p>Live events · Weddings · Portraits</p>
              <Link to="/booking" className="inline-flex text-neon">
                Start a booking request →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Nubby Media. All rights reserved.</p>
          <Link to="/admin/login" className="transition hover:text-neon">
            Staff Access
          </Link>
        </div>
      </div>
    </footer>
  );
}