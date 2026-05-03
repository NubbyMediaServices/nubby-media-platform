import { Link, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="text-xl font-bold tracking-wide">
            Nubby Media
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/portfolio" className="hover:text-white">
              Portfolio
            </Link>
            <Link to="/services" className="hover:text-white">
              Services
            </Link>
            <Link to="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link
              to="/client/login"
              className="rounded-full border border-white/20 px-4 py-2 hover:border-white/60 hover:text-white"
            >
              Client Login
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-black px-6 py-8 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Nubby Media. All rights reserved.
      </footer>
    </div>
  );
}