import { NavLink, Outlet } from "react-router-dom";

type ClientNavItem = {
  label: string;
  to: string;
  description: string;
};

const primaryNavItems: ClientNavItem[] = [
  {
    label: "Dashboard",
    to: "/client",
    description: "Overview",
  },
  {
    label: "Galleries",
    to: "/client/galleries",
    description: "View albums",
  },
  {
    label: "Favorites",
    to: "/client/favorites",
    description: "Selections",
  },
  {
    label: "Proofing",
    to: "/client/proofing",
    description: "Photo notes",
  },
  {
    label: "Downloads",
    to: "/client/downloads",
    description: "Approved files",
  },
  {
    label: "Download Status",
    to: "/client/download-status",
    description: "Requests",
  },
  {
    label: "Invoice",
    to: "/client/invoice",
    description: "Payment status",
  },
];

const secondaryNavItems: ClientNavItem[] = [
  {
    label: "Session Details",
    to: "/client/session-details",
    description: "Shoot info",
  },
  {
    label: "Profile",
    to: "/client/profile",
    description: "Contact info",
  },
  {
    label: "Contract",
    to: "/client/contract",
    description: "Package terms",
  },
  {
    label: "Support",
    to: "/client/support",
    description: "Message studio",
  },
  {
    label: "Settings",
    to: "/client/settings",
    description: "Preferences",
  },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "group rounded-2xl border px-4 py-3 transition-all duration-200",
    isActive
      ? "border-emerald-400/70 bg-emerald-400/15 text-white shadow-[0_0_28px_rgba(52,211,153,0.18)]"
      : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-emerald-300/40 hover:bg-white/[0.06] hover:text-white",
  ].join(" ");

function ClientLayout() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(135deg,#050505_0%,#0b0f0c_45%,#111111_100%)]" />

      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Nubby Media
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Client Portal
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                Review galleries, manage selections, check payment status, and
                communicate with the studio from one secure workspace.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              <span className="block text-xs uppercase tracking-[0.25em] text-emerald-300">
                Local UI Mode
              </span>
              <span className="mt-1 block text-zinc-200">
                Client auth protection is temporarily disabled for testing.
              </span>
            </div>
          </div>

          <nav className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/client"}
                className={navLinkClass}
              >
                <span className="block text-sm font-semibold">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-zinc-400 group-hover:text-zinc-300">
                  {item.description}
                </span>
              </NavLink>
            ))}
          </nav>

          <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {secondaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
              >
                <span className="block text-sm font-semibold">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-zinc-400 group-hover:text-zinc-300">
                  {item.description}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default ClientLayout;