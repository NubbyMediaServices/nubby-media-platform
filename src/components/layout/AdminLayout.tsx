import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/galleries", label: "Gallery Manager" },
  { to: "/admin/galleries/new", label: "Create Gallery" },
  { to: "/admin/uploads", label: "Multi-Upload Media" },
  { to: "/admin/clients", label: "Client Manager" },
  { to: "/admin/invoices", label: "Invoices & Payments" },
  { to: "/admin/audit-logs", label: "Audit Logs" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-white/10 bg-black p-6 lg:block">
        <Link to="/admin/dashboard" className="block">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
            Nubby Media
          </p>
          <h1 className="mt-2 text-2xl font-bold">Admin Portal</h1>
        </Link>

        <nav className="mt-10 flex flex-col gap-2">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-emerald-400 text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium">
              {user?.firstName || user?.username || "Admin"}
            </p>
            <p className="mt-1 truncate text-xs text-white/50">{user?.email}</p>
            <button
              onClick={logout}
              className="mt-4 w-full rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="border-b border-white/10 bg-black/80 px-6 py-4 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between">
            <Link to="/admin/dashboard" className="font-bold">
              Nubby Admin
            </Link>
            <button
              onClick={logout}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="min-h-screen p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}