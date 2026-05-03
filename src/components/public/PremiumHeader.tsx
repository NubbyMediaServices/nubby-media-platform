import { Camera, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function PremiumHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" onClick={closeMenu} className="group flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neon/40 bg-neon/10 shadow-glow transition group-hover:scale-105">
            <Camera className="h-6 w-6 text-neon" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-neon">
              Nubby
            </p>
            <p className="-mt-1 font-display text-2xl text-cream">Media</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-white/10 text-cream"
                    : "text-muted hover:bg-white/5 hover:text-cream"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/client/login"
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-muted transition hover:border-neon/40 hover:text-cream"
          >
            Client Login
          </Link>

          <Link to="/booking" className="btn-primary">
            Book Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-cream md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-ink/95 px-5 py-5 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-white/10 text-cream"
                      : "text-muted hover:bg-white/5 hover:text-cream"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/client/login"
              onClick={closeMenu}
              className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-muted"
            >
              Client Login
            </Link>

            <Link to="/booking" onClick={closeMenu} className="btn-primary mt-2">
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}