import { Link } from "react-router-dom";

type TimelineItem = {
  id: number;
  title: string;
  description: string;
  status: "Complete" | "In Progress" | "Upcoming" | "Locked";
  date: string;
};

type SessionDetail = {
  label: string;
  value: string;
};

const sessionDetails: SessionDetail[] = [
  {
    label: "Client",
    value: "Avery & Jordan Johnson",
  },
  {
    label: "Session Type",
    value: "Wedding Photography",
  },
  {
    label: "Package",
    value: "Signature Wedding Collection",
  },
  {
    label: "Session Date",
    value: "June 22, 2026",
  },
  {
    label: "Coverage",
    value: "8 hours",
  },
  {
    label: "Primary Photographer",
    value: "Nubby Media Studio Team",
  },
  {
    label: "Location",
    value: "Downtown Grand Rapids, Michigan",
  },
  {
    label: "Gallery Access",
    value: "Client portal delivery",
  },
];

const timelineItems: TimelineItem[] = [
  {
    id: 1,
    title: "Session Completed",
    description:
      "Photography coverage has been completed and the gallery has entered the post-production workflow.",
    status: "Complete",
    date: "Completed",
  },
  {
    id: 2,
    title: "Gallery Preview Uploaded",
    description:
      "Preview gallery is available for client review, favorites, selections, and proofing notes.",
    status: "Complete",
    date: "Available now",
  },
  {
    id: 3,
    title: "Client Proofing",
    description:
      "Client can review images, favorite selections, submit proofing notes, and request final edits.",
    status: "In Progress",
    date: "In progress",
  },
  {
    id: 4,
    title: "Final Editing",
    description:
      "Studio prepares final edits based on selected images, proofing notes, and package details.",
    status: "Upcoming",
    date: "After proofing",
  },
  {
    id: 5,
    title: "Final Download Delivery",
    description:
      "Final full-resolution downloads unlock once payment is complete and the studio marks delivery ready.",
    status: "Locked",
    date: "Locked pending payment",
  },
];

const statusClasses: Record<TimelineItem["status"], string> = {
  Complete: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  "In Progress": "border-amber-300/30 bg-amber-300/10 text-amber-200",
  Upcoming: "border-sky-300/30 bg-sky-300/10 text-sky-200",
  Locked: "border-zinc-300/20 bg-zinc-300/10 text-zinc-300",
};

function ClientSessionDetailsPage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Session Details
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Review your photography session, package information, and
                delivery timeline.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                This page gives clients a clear overview of their session,
                package, timeline, gallery status, and delivery expectations.
                Later, this can pull directly from the backend client/session
                records.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/client/galleries"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  View Gallery
                </Link>

                <Link
                  to="/client/contract"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
                >
                  View Contract
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Session Snapshot
              </p>

              <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="text-sm font-semibold text-emerald-100">
                  Signature Wedding Collection
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Gallery preview is active. Client proofing is currently in
                  progress and final delivery is pending payment completion.
                </p>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-zinc-400">Gallery</span>
                  <span className="text-sm font-semibold text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-zinc-400">Proofing</span>
                  <span className="text-sm font-semibold text-amber-300">
                    In Progress
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-zinc-400">Downloads</span>
                  <span className="text-sm font-semibold text-zinc-300">
                    Locked
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Session Information
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            Client and package details
          </h3>

          <div className="mt-6 grid gap-3">
            {sessionDetails.map((detail) => (
              <div
                key={detail.label}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {detail.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Studio Notes
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            Photographer notes and delivery expectations
          </h3>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Session Notes
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Wedding coverage includes ceremony, formal portraits, reception
                details, candid reception moments, and selected couple portraits.
                Gallery preview is available for proofing and favorites.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Delivery Notes
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Final full-resolution files will remain locked until payment is
                completed. Preview access and proofing tools remain available
                during the review period.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Recommended Next Step
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-200">
                Review your gallery, mark favorites, submit proofing notes, then
                check invoice status to unlock final downloads.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/client/favorites"
                  className="rounded-full border border-emerald-300/30 bg-black/25 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-300/10"
                >
                  Review Favorites
                </Link>

                <Link
                  to="/client/proofing"
                  className="rounded-full border border-emerald-300/30 bg-black/25 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-300/10"
                >
                  Add Proofing Notes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Delivery Timeline
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Gallery and package milestones
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            This timeline is ready to connect to session lifecycle data from the
            backend after redeploy.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/25">
          <div className="space-y-4">
            {timelineItems.map((item, index) => (
              <div
                key={item.id}
                className="relative grid gap-4 rounded-2xl border border-white/10 bg-black/25 p-5 md:grid-cols-[180px_1fr_auto]"
              >
                {index !== timelineItems.length - 1 ? (
                  <div className="absolute left-8 top-16 hidden h-8 w-px bg-white/10 md:block" />
                ) : null}

                <div>
                  <span
                    className={[
                      "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                      statusClasses[item.status],
                    ].join(" ")}
                  >
                    {item.status}
                  </span>
                  <p className="mt-3 text-xs text-zinc-500">{item.date}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-start md:justify-end">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-emerald-300">
                    {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Backend Ready
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Future session details workflow
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Later this page should load real session records, package data,
              photographer notes, contract links, gallery IDs, invoice status,
              and delivery milestones. That gives clients a premium project
              overview while giving staff a structured admin workflow.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Suggested future endpoints
            </p>

            <div className="mt-3 space-y-2">
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/session
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/session/timeline
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/package
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientSessionDetailsPage;