import { Bell, FolderKanban, Home, Link2, LogOut, Search, ShieldCheck, Upload, User2 } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/media", label: "Media Library", icon: FolderKanban },
  { to: "/upload", label: "Uploads", icon: Upload },
  { to: "/shared", label: "Shared with Me", icon: Link2 },
  { to: "/audit", label: "Activity Log", icon: ShieldCheck },
  { to: "/profile", label: "Profile", icon: User2 }
];

export function AppShell() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <div className="grid min-h-screen lg:grid-cols-[300px,1fr]">
        <aside className="hidden border-r border-white/6 bg-bg-secondary/80 px-6 py-8 lg:flex lg:flex-col">
          <div className="flex items-center gap-4">
            <img src="/nubby-media-logo.jpg" alt="Nubby Media" className="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/10" />
            <div>
              <h1 className="font-display text-2xl font-semibold text-accent">Nubby Media</h1>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-text-muted">Client Portal</p>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-white/8 bg-white/[0.03] p-5 shadow-soft">
            <p className="text-lg font-semibold">Secure. Private. Professional.</p>
            <p className="mt-2 text-sm leading-6 text-text-muted">
              Your media, delivered with premium presentation and controlled access.
            </p>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-white/[0.06] text-accent ring-1 ring-accent/15"
                        : "text-text-muted hover:bg-white/[0.04] hover:text-text-primary"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-medium text-text-primary">{user?.firstName || user?.username || "Client"}</p>
            <p className="mt-1 text-xs text-text-muted">{user?.email ?? "No email loaded"}</p>
            <button
              onClick={logout}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm font-medium text-text-muted hover:bg-white/[0.04] hover:text-text-primary"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-white/6 bg-bg-primary/85 backdrop-blur">
            <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 lg:hidden">
                <img src="/nubby-media-logo.jpg" alt="Nubby Media" className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10" />
                <div>
                  <p className="font-display text-lg text-accent">Nubby Media</p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-text-muted">Client Portal</p>
                </div>
              </div>

              <div className="relative ml-auto w-full max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-soft" />
                <input
                  placeholder="Search media..."
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-20 text-sm text-text-primary outline-none transition placeholder:text-text-soft focus:border-accent/70 focus:ring-4 focus:ring-accent/10"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-text-soft">⌘K</span>
              </div>

              <div className="hidden items-center gap-3 sm:flex">
                <button className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-text-muted transition hover:text-text-primary">
                  <Bell className="h-4 w-4" />
                </button>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
                  <p className="text-sm font-medium text-text-primary">{user?.firstName || user?.username || "Client"}</p>
                  <p className="text-xs text-text-muted">Client Portal</p>
                </div>
              </div>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
