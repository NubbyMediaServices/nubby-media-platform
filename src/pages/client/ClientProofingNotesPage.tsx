import { Link } from "react-router-dom";

type ProofingNote = {
  id: number;
  imageTitle: string;
  gallery: string;
  imageUrl: string;
  noteType: "Edit Request" | "Approval" | "Question" | "Studio Reply";
  status: "Open" | "In Progress" | "Resolved" | "Waiting on Client";
  clientNote: string;
  studioReply?: string;
  updatedAt: string;
  priority: "Low" | "Normal" | "High";
};

const proofingNotes: ProofingNote[] = [
  {
    id: 1,
    imageTitle: "Ceremony Exit",
    gallery: "Johnson Wedding Preview",
    imageUrl:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    noteType: "Edit Request",
    status: "In Progress",
    clientNote:
      "Please brighten our faces slightly while keeping the warm golden-hour color grade.",
    studioReply:
      "Received. We’ll keep the color style intact and lightly lift the shadows on the couple.",
    updatedAt: "Updated today",
    priority: "High",
  },
  {
    id: 2,
    imageTitle: "Reception Detail",
    gallery: "Johnson Wedding Preview",
    imageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    noteType: "Approval",
    status: "Resolved",
    clientNote:
      "This one is approved for the final gallery and social preview if needed.",
    studioReply: "Marked approved for final delivery.",
    updatedAt: "Updated yesterday",
    priority: "Normal",
  },
  {
    id: 3,
    imageTitle: "Portrait Session Favorite",
    gallery: "Fall Portrait Session",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    noteType: "Question",
    status: "Waiting on Client",
    clientNote:
      "Can we compare this image with the similar pose from the same set before choosing the print?",
    studioReply:
      "Yes. Please review the alternate image in your favorites and confirm which one you prefer.",
    updatedAt: "Updated 2 days ago",
    priority: "Normal",
  },
  {
    id: 4,
    imageTitle: "Couple Detail",
    gallery: "Engagement Session",
    imageUrl:
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
    noteType: "Edit Request",
    status: "Open",
    clientNote:
      "Requesting a softer background look and slightly warmer final edit.",
    updatedAt: "Updated 3 days ago",
    priority: "Low",
  },
];

const statusClasses: Record<ProofingNote["status"], string> = {
  Open: "border-sky-300/30 bg-sky-300/10 text-sky-200",
  "In Progress": "border-amber-300/30 bg-amber-300/10 text-amber-200",
  Resolved: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  "Waiting on Client": "border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-200",
};

const typeClasses: Record<ProofingNote["noteType"], string> = {
  "Edit Request": "text-amber-300",
  Approval: "text-emerald-300",
  Question: "text-sky-300",
  "Studio Reply": "text-violet-300",
};

const priorityClasses: Record<ProofingNote["priority"], string> = {
  Low: "text-zinc-400",
  Normal: "text-sky-300",
  High: "text-amber-300",
};

function ClientProofingNotesPage() {
  const openCount = proofingNotes.filter((note) => note.status === "Open").length;
  const inProgressCount = proofingNotes.filter(
    (note) => note.status === "In Progress"
  ).length;
  const resolvedCount = proofingNotes.filter(
    (note) => note.status === "Resolved"
  ).length;
  const waitingCount = proofingNotes.filter(
    (note) => note.status === "Waiting on Client"
  ).length;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Gallery Proofing Notes
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Track photo feedback, edit requests, approvals, and studio
                replies in one place.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                Proofing notes give clients a clean way to communicate exact
                image feedback without losing context. Each note can later be
                connected to a gallery image, favorite selection, edit queue,
                and delivery approval workflow.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/client/favorites"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  View Favorites
                </Link>

                <Link
                  to="/client/galleries"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
                >
                  Back to Galleries
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Proofing Summary
              </p>

              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-3xl font-semibold text-white">
                    {proofingNotes.length}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Total proofing notes
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-sky-300/20 bg-sky-300/10 p-4">
                    <p className="text-2xl font-semibold text-sky-200">
                      {openCount}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">Open</p>
                  </div>

                  <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                    <p className="text-2xl font-semibold text-amber-200">
                      {inProgressCount}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">In Progress</p>
                  </div>

                  <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                    <p className="text-2xl font-semibold text-emerald-200">
                      {resolvedCount}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">Resolved</p>
                  </div>

                  <div className="rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 p-4">
                    <p className="text-2xl font-semibold text-fuchsia-200">
                      {waitingCount}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Waiting
                    </p>
                  </div>
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
              Active Feedback
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Image-specific proofing notes
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            Placeholder notes are displayed for localhost UI testing. Later this
            can connect to a backend endpoint such as{" "}
            <span className="text-zinc-200">/api/client/proofing-notes</span>.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {proofingNotes.map((note) => (
            <article
              key={note.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/25 transition-all duration-200 hover:border-emerald-300/40 hover:bg-white/[0.07]"
            >
              <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                <div className="relative min-h-64 overflow-hidden bg-zinc-950 md:min-h-full">
                  <img
                    src={note.imageUrl}
                    alt={note.imageTitle}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-200">
                      {note.gallery}
                    </p>
                    <h4 className="mt-1 text-lg font-semibold text-white">
                      {note.imageTitle}
                    </h4>
                  </div>
                </div>

                <div className="flex flex-col gap-4 p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-semibold",
                        statusClasses[note.status],
                      ].join(" ")}
                    >
                      {note.status}
                    </span>

                    <span
                      className={[
                        "rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold",
                        typeClasses[note.noteType],
                      ].join(" ")}
                    >
                      {note.noteType}
                    </span>

                    <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-zinc-400">
                      Priority:{" "}
                      <span className={priorityClasses[note.priority]}>
                        {note.priority}
                      </span>
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      Client Note
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      {note.clientNote}
                    </p>
                  </div>

                  {note.studioReply ? (
                    <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
                        Studio Reply
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-200">
                        {note.studioReply}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                        Studio Reply
                      </p>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        No studio reply yet.
                      </p>
                    </div>
                  )}

                  <div className="mt-auto flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                    <p className="text-xs text-zinc-500">{note.updatedAt}</p>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
                      >
                        Reply
                      </button>

                      <button
                        type="button"
                        className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300"
                      >
                        Mark Reviewed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Workflow Design
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Proofing notes backend path
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Later, each proofing note should store the client ID, gallery ID,
              media ID, note text, note type, status, priority, timestamps, and
              studio response history. That gives the admin portal a clear edit
              queue while clients get a clean proofing experience.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Suggested future endpoint
            </p>
            <p className="mt-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
              GET /api/client/proofing-notes
            </p>
            <p className="mt-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
              POST /api/client/proofing-notes
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientProofingNotesPage;