import { Link } from "react-router-dom";

type ClientGallery = {
  id: number;
  title: string;
  sessionType: "Wedding" | "Engagement" | "Portrait" | "Event";
  date: string;
  location: string;
  coverImage: string;
  status: "Preview Active" | "Proofing" | "Final Editing" | "Delivered";
  paymentStatus: "PENDING" | "PAID";
  imageCount: number;
  favoritesCount: number;
  proofingNotesCount: number;
  downloadStatus: "Locked" | "Available" | "Preparing" | "Delivered";
  description: string;
};

const galleries: ClientGallery[] = [
  {
    id: 1,
    title: "Johnson Wedding Preview",
    sessionType: "Wedding",
    date: "June 22, 2026",
    location: "Grand Rapids, Michigan",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
    status: "Proofing",
    paymentStatus: "PENDING",
    imageCount: 428,
    favoritesCount: 18,
    proofingNotesCount: 4,
    downloadStatus: "Locked",
    description:
      "Wedding preview gallery for image review, favorites, proofing notes, and final delivery preparation.",
  },
  {
    id: 2,
    title: "Engagement Session",
    sessionType: "Engagement",
    date: "April 18, 2026",
    location: "Mount Pleasant, Michigan",
    coverImage:
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1400&q=80",
    status: "Final Editing",
    paymentStatus: "PAID",
    imageCount: 86,
    favoritesCount: 9,
    proofingNotesCount: 2,
    downloadStatus: "Preparing",
    description:
      "Engagement session gallery with selected favorites and final edits currently being prepared.",
  },
  {
    id: 3,
    title: "Fall Portrait Session",
    sessionType: "Portrait",
    date: "October 12, 2025",
    location: "Midland, Michigan",
    coverImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
    status: "Delivered",
    paymentStatus: "PAID",
    imageCount: 64,
    favoritesCount: 6,
    proofingNotesCount: 1,
    downloadStatus: "Delivered",
    description:
      "Completed portrait gallery with final images delivered and client selections archived.",
  },
];

const statusClasses: Record<ClientGallery["status"], string> = {
  "Preview Active": "border-sky-300/30 bg-sky-300/10 text-sky-200",
  Proofing: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  "Final Editing": "border-violet-300/30 bg-violet-300/10 text-violet-200",
  Delivered: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
};

const downloadClasses: Record<ClientGallery["downloadStatus"], string> = {
  Locked: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  Available: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  Preparing: "border-sky-300/30 bg-sky-300/10 text-sky-200",
  Delivered: "border-zinc-300/20 bg-zinc-300/10 text-zinc-200",
};

const sessionTypeClasses: Record<ClientGallery["sessionType"], string> = {
  Wedding: "text-emerald-300",
  Engagement: "text-sky-300",
  Portrait: "text-amber-300",
  Event: "text-fuchsia-300",
};

function ClientGalleriesPage() {
  const activeCount = galleries.filter(
    (gallery) => gallery.status !== "Delivered"
  ).length;

  const lockedCount = galleries.filter(
    (gallery) => gallery.downloadStatus === "Locked"
  ).length;

  const totalFavorites = galleries.reduce(
    (sum, gallery) => sum + gallery.favoritesCount,
    0
  );

  const totalProofingNotes = galleries.reduce(
    (sum, gallery) => sum + gallery.proofingNotesCount,
    0
  );

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                My Galleries
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                View your assigned galleries, proofing status, favorites, and
                delivery progress.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                This page is the client gallery hub. Clients can open assigned
                galleries, review previews, launch the enlarged lightbox viewer,
                track proofing progress, and understand whether downloads are
                locked, preparing, or delivered.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/client/favorites"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  View Favorites
                </Link>

                <Link
                  to="/client/proofing"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
                >
                  Review Proofing Notes
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Gallery Snapshot
              </p>

              <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="text-sm font-semibold text-emerald-100">
                  {galleries.length} assigned galleries
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Gallery data is currently placeholder content for UI testing.
                  Later this will load from assigned backend gallery records.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-sky-300/20 bg-sky-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-sky-200">
                    {activeCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Active</p>
                </div>

                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-amber-200">
                    {lockedCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Locked</p>
                </div>

                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-emerald-200">
                    {totalFavorites}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Favorites</p>
                </div>

                <div className="rounded-2xl border border-violet-300/20 bg-violet-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-violet-200">
                    {totalProofingNotes}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Notes</p>
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
              Assigned Galleries
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Gallery access and delivery status
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            Each card links into the gallery detail page where the Facebook-style
            lightbox viewer is available.
          </p>
        </div>

        <div className="grid gap-5">
          {galleries.map((gallery) => {
            const isLocked =
              gallery.downloadStatus === "Locked" ||
              gallery.paymentStatus === "PENDING";

            return (
              <article
                key={gallery.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/25 transition-all duration-200 hover:border-emerald-300/40 hover:bg-white/[0.07]"
              >
                <div className="grid gap-0 lg:grid-cols-[420px_1fr]">
                  <div className="relative min-h-80 overflow-hidden bg-zinc-950">
                    <img
                      src={gallery.coverImage}
                      alt={gallery.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                    <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                      <span
                        className={[
                          "rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md",
                          statusClasses[gallery.status],
                        ].join(" ")}
                      >
                        {gallery.status}
                      </span>

                      <span
                        className={[
                          "rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md",
                          downloadClasses[gallery.downloadStatus],
                        ].join(" ")}
                      >
                        Downloads {gallery.downloadStatus}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <p
                        className={[
                          "text-xs font-semibold uppercase tracking-[0.25em]",
                          sessionTypeClasses[gallery.sessionType],
                        ].join(" ")}
                      >
                        {gallery.sessionType}
                      </p>

                      <h4 className="mt-2 text-2xl font-semibold text-white">
                        {gallery.title}
                      </h4>

                      <p className="mt-2 text-sm text-zinc-300">
                        {gallery.date} • {gallery.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 p-6">
                    <div>
                      <p className="text-sm leading-6 text-zinc-300">
                        {gallery.description}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <p className="text-xs text-zinc-500">Images</p>
                        <p className="mt-1 text-xl font-semibold text-white">
                          {gallery.imageCount}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <p className="text-xs text-zinc-500">Favorites</p>
                        <p className="mt-1 text-xl font-semibold text-emerald-300">
                          {gallery.favoritesCount}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <p className="text-xs text-zinc-500">Proofing Notes</p>
                        <p className="mt-1 text-xl font-semibold text-violet-300">
                          {gallery.proofingNotesCount}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                        <p className="text-xs text-zinc-500">Payment</p>
                        <p
                          className={[
                            "mt-1 text-xl font-semibold",
                            gallery.paymentStatus === "PAID"
                              ? "text-emerald-300"
                              : "text-amber-300",
                          ].join(" ")}
                        >
                          {gallery.paymentStatus}
                        </p>
                      </div>
                    </div>

                    {isLocked ? (
                      <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                        <p className="text-sm font-semibold text-amber-100">
                          Final downloads are locked
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-300">
                          This gallery has payment-controlled final delivery.
                          Preview and proofing access remain available, but
                          full-resolution downloads stay locked until payment is
                          completed.
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                        <p className="text-sm font-semibold text-emerald-100">
                          Delivery access is available
                        </p>
                        <p className="mt-2 text-sm leading-6 text-zinc-300">
                          Payment is complete for this gallery. Eligible
                          download packages can be prepared or released by the
                          studio.
                        </p>
                      </div>
                    )}

                    <div className="mt-auto flex flex-col justify-between gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center">
                      <p className="text-xs text-zinc-500">
                        Opens gallery detail and lightbox viewer.
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/client/galleries/${gallery.id}`}
                          className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300"
                        >
                          Open Gallery
                        </Link>

                        <Link
                          to="/client/favorites"
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
                        >
                          Favorites
                        </Link>

                        <Link
                          to="/client/proofing"
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
                        >
                          Proofing
                        </Link>

                        <Link
                          to={
                            isLocked
                              ? "/client/invoice"
                              : "/client/downloads"
                          }
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
                        >
                          {isLocked ? "Pay / Unlock" : "Downloads"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Client Experience
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Gallery workflow overview
          </h3>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm font-semibold text-white">
                Preview and proofing access
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Clients can open galleries, enlarge images, use arrow-key
                navigation in the lightbox, favorite selections, and submit
                proofing notes.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm font-semibold text-white">
                Payment-controlled final delivery
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Final downloads should remain locked until backend invoice logic
                confirms payment completion.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
              <p className="text-sm font-semibold text-white">
                Admin/staff assignment model
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Staff should assign galleries to clients from the admin portal.
                Clients should only see galleries assigned to their account.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Backend Ready
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Future assigned galleries workflow
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Later this page should load galleries assigned to the authenticated
            client. The backend should enforce ownership, gallery visibility,
            payment state, favorite counts, proofing note counts, and download
            lock rules before returning gallery data.
          </p>

          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Suggested future endpoints
            </p>

            <div className="mt-3 space-y-2">
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/galleries
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/galleries/:galleryId
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/galleries/:galleryId/media
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/galleries/:galleryId/access
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-sm font-semibold text-amber-100">
              Security reminder
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              The frontend route is temporarily unprotected for localhost UI
              testing. After backend redeploy, restore client route protection
              and verify the exact client role returned by{" "}
              <span className="text-zinc-100">/api/users/me</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientGalleriesPage;