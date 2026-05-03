import { Link } from "react-router-dom";

type DownloadPackage = {
  id: number;
  title: string;
  gallery: string;
  description: string;
  fileType: "ZIP" | "JPG Set" | "PDF" | "Album Files";
  imageCount: number;
  fileSize: string;
  status: "Available" | "Locked" | "Preparing" | "Delivered";
  requiresPayment: boolean;
  lastUpdated: string;
};

const paymentStatus: "PENDING" | "PAID" = "PENDING";

const downloadPackages: DownloadPackage[] = [
  {
    id: 1,
    title: "Full-Resolution Wedding Gallery",
    gallery: "Johnson Wedding Preview",
    description:
      "Complete final wedding gallery package with full-resolution edited images prepared for archival download.",
    fileType: "ZIP",
    imageCount: 428,
    fileSize: "6.8 GB",
    status: "Locked",
    requiresPayment: true,
    lastUpdated: "Locked pending payment",
  },
  {
    id: 2,
    title: "Social Preview Set",
    gallery: "Johnson Wedding Preview",
    description:
      "Web-optimized preview images for social sharing, vendor previews, and quick client review.",
    fileType: "JPG Set",
    imageCount: 24,
    fileSize: "184 MB",
    status: "Available",
    requiresPayment: false,
    lastUpdated: "Available now",
  },
  {
    id: 3,
    title: "Engagement Session Finals",
    gallery: "Engagement Session",
    description:
      "Final engagement session selections prepared for client delivery and personal use.",
    fileType: "ZIP",
    imageCount: 86,
    fileSize: "1.2 GB",
    status: "Preparing",
    requiresPayment: false,
    lastUpdated: "Preparing final package",
  },
  {
    id: 4,
    title: "Print Release Summary",
    gallery: "Johnson Wedding Preview",
    description:
      "PDF delivery summary with package notes, print release information, and usage guidance.",
    fileType: "PDF",
    imageCount: 1,
    fileSize: "420 KB",
    status: "Available",
    requiresPayment: false,
    lastUpdated: "Available now",
  },
  {
    id: 5,
    title: "Album Design Favorites",
    gallery: "Johnson Wedding Preview",
    description:
      "Selected image set prepared for future album design planning and studio layout workflow.",
    fileType: "Album Files",
    imageCount: 42,
    fileSize: "512 MB",
    status: "Delivered",
    requiresPayment: false,
    lastUpdated: "Delivered last week",
  },
];

const statusClasses: Record<DownloadPackage["status"], string> = {
  Available: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  Locked: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  Preparing: "border-sky-300/30 bg-sky-300/10 text-sky-200",
  Delivered: "border-zinc-300/20 bg-zinc-300/10 text-zinc-200",
};

const fileTypeClasses: Record<DownloadPackage["fileType"], string> = {
  ZIP: "text-emerald-300",
  "JPG Set": "text-sky-300",
  PDF: "text-amber-300",
  "Album Files": "text-fuchsia-300",
};

function ClientDownloadsPage() {
  const isPaid = paymentStatus === "PAID";

  const availableCount = downloadPackages.filter((pkg) => {
    const lockedByPayment = pkg.requiresPayment && !isPaid;
    return !lockedByPayment && pkg.status === "Available";
  }).length;

  const lockedCount = downloadPackages.filter((pkg) => {
    const lockedByPayment = pkg.requiresPayment && !isPaid;
    return lockedByPayment || pkg.status === "Locked";
  }).length;

  const preparingCount = downloadPackages.filter(
    (pkg) => pkg.status === "Preparing"
  ).length;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Downloads
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Access approved files, preview packages, and final gallery
                downloads.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                Final full-resolution packages remain locked until payment is
                complete. Preview sets, delivery summaries, and non-payment
                controlled assets can remain available while the full package is
                still pending.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/client/download-status"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  Track Download Requests
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
                Download Snapshot
              </p>

              <div
                className={[
                  "mt-4 rounded-2xl border p-5",
                  isPaid
                    ? "border-emerald-300/30 bg-emerald-300/10"
                    : "border-amber-300/30 bg-amber-300/10",
                ].join(" ")}
              >
                <p
                  className={[
                    "text-sm font-semibold",
                    isPaid ? "text-emerald-100" : "text-amber-100",
                  ].join(" ")}
                >
                  {isPaid ? "Final Downloads Unlocked" : "Final Downloads Locked"}
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {isPaid
                    ? "Payment is complete. Final download packages can be released when marked ready."
                    : "Payment is pending. Full-resolution downloads remain locked for now."}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-emerald-200">
                    {availableCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Available</p>
                </div>

                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-amber-200">
                    {lockedCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Locked</p>
                </div>

                <div className="rounded-2xl border border-sky-300/20 bg-sky-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-sky-200">
                    {preparingCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Preparing</p>
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
              Download Library
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Available and locked packages
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            These packages are ready to connect to protected S3 signed URL
            delivery after backend redeploy.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {downloadPackages.map((pkg) => {
            const lockedByPayment = pkg.requiresPayment && !isPaid;
            const effectiveStatus = lockedByPayment ? "Locked" : pkg.status;
            const canDownload =
              effectiveStatus === "Available" || effectiveStatus === "Delivered";

            return (
              <article
                key={pkg.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/25 transition-all duration-200 hover:border-emerald-300/40 hover:bg-white/[0.07]"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                      {pkg.gallery}
                    </p>

                    <h4 className="mt-2 text-xl font-semibold text-white">
                      {pkg.title}
                    </h4>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                      {pkg.description}
                    </p>
                  </div>

                  <span
                    className={[
                      "w-fit rounded-full border px-3 py-1 text-xs font-semibold",
                      statusClasses[effectiveStatus],
                    ].join(" ")}
                  >
                    {effectiveStatus}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-zinc-500">Type</p>
                    <p
                      className={[
                        "mt-1 text-sm font-semibold",
                        fileTypeClasses[pkg.fileType],
                      ].join(" ")}
                    >
                      {pkg.fileType}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-zinc-500">Files</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {pkg.imageCount}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-zinc-500">Size</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {pkg.fileSize}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-zinc-500">Payment</p>
                    <p
                      className={[
                        "mt-1 text-sm font-semibold",
                        pkg.requiresPayment ? "text-amber-300" : "text-emerald-300",
                      ].join(" ")}
                    >
                      {pkg.requiresPayment ? "Required" : "Not Required"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Delivery Status
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {lockedByPayment
                      ? "This package is locked because payment has not been completed."
                      : pkg.lastUpdated}
                  </p>
                </div>

                <div className="mt-5 flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                  <p className="text-xs text-zinc-500">
                    Download links should use short-lived signed URLs from the
                    backend.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {lockedByPayment ? (
                      <Link
                        to="/client/invoice"
                        className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300"
                      >
                        Pay to Unlock
                      </Link>
                    ) : null}

                    {!lockedByPayment && effectiveStatus === "Preparing" ? (
                      <Link
                        to="/client/download-status"
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
                      >
                        Track Status
                      </Link>
                    ) : null}

                    {canDownload ? (
                      <button
                        type="button"
                        className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300"
                      >
                        Download Placeholder
                      </button>
                    ) : null}

                    <Link
                      to="/client/support"
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
                    >
                      Ask Studio
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Payment Protection
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Final files are protected until payment is complete
          </h3>

          <p className="mt-3 text-sm leading-6 text-zinc-300">
            The frontend should never decide permanent access by itself. The
            backend should check invoice status, user identity, gallery
            ownership, role, and package readiness before generating a signed
            S3 download URL.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/client/invoice"
              className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300"
            >
              Check Invoice
            </Link>

            <Link
              to="/client/download-status"
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
            >
              View Request Status
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Backend Ready
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Future S3 signed URL workflow
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Later this page should request available packages from the backend.
            When a client clicks download, the backend should verify JWT auth,
            client ownership, payment status, gallery access, and package status
            before returning a short-lived private S3 signed URL.
          </p>

          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Suggested future endpoints
            </p>

            <div className="mt-3 space-y-2">
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/downloads
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                POST /api/client/downloads/:packageId/signed-url
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/invoice/status
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                POST /api/client/download-requests
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientDownloadsPage;