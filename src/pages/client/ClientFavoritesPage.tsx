import { Link } from "react-router-dom";

type FavoritePhoto = {
  id: number;
  title: string;
  gallery: string;
  imageUrl: string;
  status: "Selected" | "Needs Review" | "Final Edit Requested";
  note: string;
  selectedFor: string;
};

const favoritePhotos: FavoritePhoto[] = [
  {
    id: 1,
    title: "Golden Hour Portrait",
    gallery: "Johnson Wedding Preview",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    status: "Selected",
    note: "Client favorite for album cover consideration.",
    selectedFor: "Album Cover",
  },
  {
    id: 2,
    title: "Ceremony Exit",
    gallery: "Johnson Wedding Preview",
    imageUrl:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    status: "Final Edit Requested",
    note: "Brighten faces slightly and keep warm tones.",
    selectedFor: "Final Gallery",
  },
  {
    id: 3,
    title: "Reception Detail",
    gallery: "Johnson Wedding Preview",
    imageUrl:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    status: "Selected",
    note: "Good candidate for vendor/social preview.",
    selectedFor: "Social Preview",
  },
  {
    id: 4,
    title: "Portrait Session Favorite",
    gallery: "Fall Portrait Session",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    status: "Needs Review",
    note: "Compare against similar pose before final selection.",
    selectedFor: "Print Option",
  },
  {
    id: 5,
    title: "Dance Floor Moment",
    gallery: "Johnson Wedding Preview",
    imageUrl:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    status: "Selected",
    note: "Strong candid moment. Keep in final delivery.",
    selectedFor: "Final Gallery",
  },
  {
    id: 6,
    title: "Couple Detail",
    gallery: "Engagement Session",
    imageUrl:
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
    status: "Final Edit Requested",
    note: "Requesting softer background and slightly warmer grade.",
    selectedFor: "Print Option",
  },
];

const statusClasses: Record<FavoritePhoto["status"], string> = {
  Selected:
    "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  "Needs Review":
    "border-sky-300/30 bg-sky-300/10 text-sky-200",
  "Final Edit Requested":
    "border-amber-300/30 bg-amber-300/10 text-amber-200",
};

function ClientFavoritesPage() {
  const selectedCount = favoritePhotos.filter(
    (photo) => photo.status === "Selected"
  ).length;

  const editRequestCount = favoritePhotos.filter(
    (photo) => photo.status === "Final Edit Requested"
  ).length;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Favorites / Selections
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Review the photos you have selected for edits, delivery, prints,
                and album consideration.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                This page will eventually sync with the backend so every client
                favorite, proofing selection, and edit request is saved to the
                gallery record. For now, this polished UI uses local placeholder
                data for frontend testing.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/client/galleries"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  Back to Galleries
                </Link>

                <Link
                  to="/client/proofing"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
                >
                  View Proofing Notes
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Selection Summary
              </p>

              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-3xl font-semibold text-white">
                    {favoritePhotos.length}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Total favorite images
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                    <p className="text-2xl font-semibold text-emerald-200">
                      {selectedCount}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">Selected</p>
                  </div>

                  <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                    <p className="text-2xl font-semibold text-amber-200">
                      {editRequestCount}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">Edit Requests</p>
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
              Selected Images
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Favorite gallery selections
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            These cards are ready to connect to a future favorites endpoint such
            as <span className="text-zinc-200">/api/client/favorites</span>.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {favoritePhotos.map((photo) => (
            <article
              key={photo.id}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-xl shadow-black/25 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300/50 hover:bg-white/[0.07]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute left-4 top-4">
                  <span
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md",
                      statusClasses[photo.status],
                    ].join(" ")}
                  >
                    {photo.status}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-200">
                    {photo.gallery}
                  </p>
                  <h4 className="mt-1 text-lg font-semibold text-white">
                    {photo.title}
                  </h4>
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Client Note
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {photo.note}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-zinc-500">Selected For</p>
                    <p className="text-sm font-semibold text-white">
                      {photo.selectedFor}
                    </p>
                  </div>

                  <Link
                    to="/client/proofing"
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-emerald-300 transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
                  >
                    Add Note
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Backend Ready
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Future favorites workflow
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              Once the backend is redeployed, this page can load real favorites,
              write client selections, attach notes, and connect selected images
              to proofing, downloads, album design, invoice status, and final
              delivery approval.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-5 py-4 text-sm text-emerald-100">
            Placeholder data active
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientFavoritesPage;