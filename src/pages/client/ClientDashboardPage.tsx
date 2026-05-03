import { Link } from "react-router-dom";

type DashboardCard = {
  title: string;
  description: string;
  to: string;
  status: string;
  eyebrow: string;
};

const mainCards: DashboardCard[] = [
  {
    title: "My Galleries",
    description:
      "Open your assigned galleries, review delivered images, and launch the enlarged lightbox viewer.",
    to: "/client/galleries",
    status: "3 active galleries",
    eyebrow: "Gallery Access",
  },
  {
    title: "Favorites / Selections",
    description:
      "Review the images you have favorited or selected for final edits, albums, prints, or delivery review.",
    to: "/client/favorites",
    status: "12 selected images",
    eyebrow: "Selections",
  },
  {
    title: "Gallery Proofing Notes",
    description:
      "Leave feedback for the studio, track requested edits, and review proofing notes tied to your session.",
    to: "/client/proofing",
    status: "2 open notes",
    eyebrow: "Proofing",
  },
  {
    title: "Downloads",
    description:
      "Access approved download packages. Final downloads remain locked until payment is completed.",
    to: "/client/downloads",
    status: "Locked pending payment",
    eyebrow: "Delivery",
  },
  {
    title: "Download Request Status",
    description:
      "Track requested download packages, fulfillment state, approval status, and studio delivery progress.",
    to: "/client/download-status",
    status: "1 request pending",
    eyebrow: "Requests",
  },
  {
    title: "Invoice / Payment Status",
    description:
      "View invoice balance, payment state, and delivery unlock status for your gallery package.",
    to: "/client/invoice",
    status: "Payment pending",
    eyebrow: "Billing",
  },
];

const accountCards: DashboardCard[] = [
  {
    title: "Session Details",
    description:
      "Review session date, location, package type, photographer notes, and gallery timeline.",
    to: "/client/session-details",
    status: "Wedding package",
    eyebrow: "Session",
  },
  {
    title: "Client Profile",
    description:
      "Review your contact information so the studio can keep delivery and communication accurate.",
    to: "/client/profile",
    status: "Profile on file",
    eyebrow: "Account",
  },
  {
    title: "Contract / Package Details",
    description:
      "Review package inclusions, usage terms, contract details, and delivery expectations.",
    to: "/client/contract",
    status: "Signed agreement",
    eyebrow: "Package",
  },
  {
    title: "Support / Message Photographer",
    description:
      "Send a message to the studio for gallery questions, edit requests, delivery help, or support.",
    to: "/client/support",
    status: "Studio available",
    eyebrow: "Support",
  },
];

const paymentStatus: "PENDING" | "PAID" = "PENDING";

function ClientDashboardPage() {
  const isPaid = paymentStatus === "PAID";

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.07),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Client Workspace
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Welcome back to your Nubby Media gallery portal.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                Your dashboard brings together galleries, proofing notes,
                favorites, invoices, delivery status, and studio communication
                in one polished client experience.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/client/galleries"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  View Galleries
                </Link>

                <Link
                  to="/client/invoice"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
                >
                  Check Payment Status
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Delivery Lock
              </p>

              <div className="mt-4 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4">
                <p className="text-sm font-semibold text-amber-100">
                  {isPaid ? "Downloads Unlocked" : "Downloads Locked"}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {isPaid
                    ? "Payment is marked complete. Final download packages are available."
                    : "Final download packages remain locked until payment is completed."}
                </p>
              </div>

              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-zinc-400">Payment</span>
                  <span className={isPaid ? "text-emerald-300" : "text-amber-300"}>
                    {paymentStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-zinc-400">Gallery Access</span>
                  <span className="text-emerald-300">Active</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-zinc-400">Proofing</span>
                  <span className="text-sky-300">Open</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Client Tools
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Gallery, proofing, delivery, and billing
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            These cards map directly to the client portal pages added for the
            Nubby Media frontend rebuild.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mainCards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300/50 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-emerald-950/20"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                {card.eyebrow}
              </p>

              <h4 className="mt-3 text-lg font-semibold text-white">
                {card.title}
              </h4>

              <p className="mt-3 min-h-16 text-sm leading-6 text-zinc-400">
                {card.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-zinc-300">
                  {card.status}
                </span>

                <span className="text-sm font-semibold text-emerald-300 transition group-hover:translate-x-1">
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Account & Studio
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Session details, profile, contract, and support
            </h3>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {accountCards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group rounded-3xl border border-white/10 bg-black/30 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300/50 hover:bg-white/[0.06]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500 group-hover:text-emerald-300">
                {card.eyebrow}
              </p>

              <h4 className="mt-3 text-base font-semibold text-white">
                {card.title}
              </h4>

              <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">
                {card.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">{card.status}</span>
                <span className="text-sm font-semibold text-emerald-300 transition group-hover:translate-x-1">
                  Open →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ClientDashboardPage;