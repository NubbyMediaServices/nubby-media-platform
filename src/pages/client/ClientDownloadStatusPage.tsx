import { Link } from "react-router-dom";

type DownloadRequest = {
  id: number;
  packageName: string;
  gallery: string;
  requestedAt: string;
  status: "Payment Locked" | "Pending Approval" | "Preparing" | "Ready" | "Delivered";
  deliveryType: "Full Resolution ZIP" | "Web Gallery Set" | "Print Package" | "Album Selection";
  imageCount: number;
  estimatedDelivery: string;
  paymentRequired: boolean;
  notes: string;
};

const paymentStatus: "PENDING" | "PAID" = "PENDING";

const downloadRequests: DownloadRequest[] = [
  {
    id: 1,
    packageName: "Full Wedding Gallery Download",
    gallery: "Johnson Wedding Preview",
    requestedAt: "Requested today",
    status: "Payment Locked",
    deliveryType: "Full Resolution ZIP",
    imageCount: 428,
    estimatedDelivery: "Unlocked after payment completion",
    paymentRequired: true,
    notes:
      "Full-resolution gallery download is locked until the remaining invoice balance is paid.",
  },
  {
    id: 2,
    packageName: "Social Preview Favorites",
    gallery: "Johnson Wedding Preview",
    requestedAt: "Requested yesterday",
    status: "Preparing",
    deliveryType: "Web Gallery Set",
    imageCount: 24,
    estimatedDelivery: "Preparing for studio review",
    paymentRequired: false,
    notes:
      "Watermarked social preview set is being prepared for client review and vendor sharing.",
  },
  {
    id: 3,
    packageName: "Engagement Print Selection",
    gallery: "Engagement Session",
    requestedAt: "Requested 3 days ago",
    status: "Pending Approval",
    deliveryType: "Print Package",
    imageCount: 8,
    estimatedDelivery: "Waiting on final image approval",
    paymentRequired: false,
    notes:
      "Print package requires final image confirmation before studio fulfillment.",
  },
  {
    id: 4,
    packageName: "Album Design Favorites",
    gallery: "Johnson Wedding Preview",
    requestedAt: "Requested last week",
    status: "Delivered",
    deliveryType: "Album Selection",
    imageCount: 42,
    estimatedDelivery: "Delivered",
    paymentRequired: false,
    notes:
      "Album selection was sent to the studio design queue for layout planning.",
  },
];

const statusClasses: Record<DownloadRequest["status"], string> = {
  "Payment Locked": "border-amber-300/30 bg-amber-300/10 text-amber-200",
  "Pending Approval": "border-sky-300/30 bg-sky-300/10 text-sky-200",
  Preparing: "border-violet-300/30 bg-violet-300/10 text-violet-200",
  Ready: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  Delivered: "border-zinc-300/20 bg-zinc-300/10 text-zinc-200",
};

const stepOrder: DownloadRequest["status"][] = [
  "Pending Approval",
  "Preparing",
  "Ready",
  "Delivered",
];

function getProgressPercent(status: DownloadRequest["status"]) {
  if (status === "Payment Locked") return 10;

  const index = stepOrder.indexOf(status);

  if (index === -1) {
    return 10;
  }

  return ((index + 1) / stepOrder.length) * 100;
}

function ClientDownloadStatusPage() {
  const isPaid = paymentStatus === "PAID";

  const lockedCount = downloadRequests.filter(
    (request) => request.status === "Payment Locked"
  ).length;

  const activeCount = downloadRequests.filter((request) =>
    ["Pending Approval", "Preparing", "Ready"].includes(request.status)
  ).length;

  const deliveredCount = downloadRequests.filter(
    (request) => request.status === "Delivered"
  ).length;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Download Request Status
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Track gallery download requests, package preparation, and final
                delivery status.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                This page is designed for clients to see whether download
                packages are locked, pending approval, being prepared, ready, or
                delivered. Final downloads remain locked until payment is marked
                complete.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/client/downloads"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  Open Downloads
                </Link>

                <Link
                  to="/client/invoice"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
                >
                  Check Invoice
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Payment Lock
              </p>

              <div
                className={[
                  "mt-4 rounded-2xl border p-4",
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
                  {isPaid ? "Downloads Unlocked" : "Downloads Locked"}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {isPaid
                    ? "Payment is complete. Eligible final download packages can be released."
                    : "Payment is still pending. Full-resolution delivery stays locked until payment clears."}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-amber-200">
                    {lockedCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Locked</p>
                </div>

                <div className="rounded-2xl border border-sky-300/20 bg-sky-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-sky-200">
                    {activeCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Active</p>
                </div>

                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-emerald-200">
                    {deliveredCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Done</p>
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
              Requests
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Download package queue
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            These cards are ready to connect to a future endpoint such as{" "}
            <span className="text-zinc-200">
              /api/client/download-requests
            </span>
            .
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {downloadRequests.map((request) => {
            const progress = getProgressPercent(request.status);
            const lockedByPayment = request.paymentRequired && !isPaid;

            return (
              <article
                key={request.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/25 transition-all duration-200 hover:border-emerald-300/40 hover:bg-white/[0.07]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                      {request.gallery}
                    </p>

                    <h4 className="mt-2 text-xl font-semibold text-white">
                      {request.packageName}
                    </h4>

                    <p className="mt-2 text-sm text-zinc-500">
                      {request.requestedAt}
                    </p>
                  </div>

                  <span
                    className={[
                      "w-fit rounded-full border px-3 py-1 text-xs font-semibold",
                      statusClasses[request.status],
                    ].join(" ")}
                  >
                    {lockedByPayment ? "Payment Locked" : request.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-zinc-500">Delivery Type</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {request.deliveryType}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-zinc-500">Image Count</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {request.imageCount} images
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-xs text-zinc-500">Payment Required</p>
                    <p
                      className={[
                        "mt-1 text-sm font-semibold",
                        request.paymentRequired
                          ? "text-amber-300"
                          : "text-emerald-300",
                      ].join(" ")}
                    >
                      {request.paymentRequired ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      Fulfillment Progress
                    </p>
                    <p className="text-xs text-zinc-400">
                      {request.estimatedDelivery}
                    </p>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={[
                        "h-full rounded-full",
                        lockedByPayment ? "bg-amber-300" : "bg-emerald-300",
                      ].join(" ")}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Request Notes
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {request.notes}
                  </p>
                </div>

                <div className="mt-5 flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                  <p className="text-xs text-zinc-500">
                    Status updates will sync with the admin fulfillment queue.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/client/support"
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
                    >
                      Ask Studio
                    </Link>

                    <Link
                      to={lockedByPayment ? "/client/invoice" : "/client/downloads"}
                      className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300"
                    >
                      {lockedByPayment ? "Pay Invoice" : "Open"}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/30 p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Backend Ready
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              Future download request workflow
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
              After backend redeploy, this page should read real download
              package requests, payment lock state, invoice status, S3 package
              readiness, and admin fulfillment updates. This gives clients a
              transparent delivery timeline while protecting paid deliverables.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Suggested future endpoints
            </p>

            <div className="mt-3 space-y-2">
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/download-requests
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                POST /api/client/download-requests
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/invoice/status
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientDownloadStatusPage;