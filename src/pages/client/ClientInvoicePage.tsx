import { Link } from "react-router-dom";

type InvoiceLineItem = {
  id: number;
  description: string;
  category: "Package" | "Add-on" | "Credit" | "Fee";
  amount: number;
};

type PaymentMilestone = {
  id: number;
  title: string;
  description: string;
  status: "Complete" | "Pending" | "Locked";
  amount: number;
};

const paymentStatus: "PENDING" | "PAID" = "PENDING";

const invoiceLineItems: InvoiceLineItem[] = [
  {
    id: 1,
    description: "Signature Wedding Collection",
    category: "Package",
    amount: 2800,
  },
  {
    id: 2,
    description: "Engagement Session Add-on",
    category: "Add-on",
    amount: 450,
  },
  {
    id: 3,
    description: "Album Design Retainer",
    category: "Add-on",
    amount: 350,
  },
  {
    id: 4,
    description: "Booking Deposit",
    category: "Credit",
    amount: -750,
  },
];

const paymentMilestones: PaymentMilestone[] = [
  {
    id: 1,
    title: "Booking Deposit",
    description:
      "Deposit received to reserve the session date and begin the client workflow.",
    status: "Complete",
    amount: 750,
  },
  {
    id: 2,
    title: "Remaining Balance",
    description:
      "Remaining balance must be completed before final full-resolution downloads unlock.",
    status: "Pending",
    amount: 2850,
  },
  {
    id: 3,
    title: "Final Download Release",
    description:
      "Final delivery unlocks after payment is confirmed and the studio marks the package ready.",
    status: "Locked",
    amount: 0,
  },
];

const statusClasses: Record<PaymentMilestone["status"], string> = {
  Complete: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  Pending: "border-amber-300/30 bg-amber-300/10 text-amber-200",
  Locked: "border-zinc-300/20 bg-zinc-300/10 text-zinc-300",
};

const categoryClasses: Record<InvoiceLineItem["category"], string> = {
  Package: "text-emerald-300",
  "Add-on": "text-sky-300",
  Credit: "text-amber-300",
  Fee: "text-fuchsia-300",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function ClientInvoicePage() {
  const isPaid = paymentStatus === "PAID";

  const subtotal = invoiceLineItems.reduce((sum, item) => sum + item.amount, 0);
  const paidAmount = 750;
  const balanceDue = Math.max(subtotal, 0);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Invoice / Payment Status
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Review your balance, payment status, and final delivery unlock
                state.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                This invoice page is designed to connect directly to Stripe
                later. For now, it shows placeholder payment data and keeps the
                client-facing workflow clear: final downloads stay locked until
                payment is complete.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  Pay with Stripe Placeholder
                </button>

                <Link
                  to="/client/download-status"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
                >
                  Track Downloads
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Payment Snapshot
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
                  {isPaid ? "Payment Complete" : "Payment Pending"}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  {isPaid
                    ? "Your final download packages can be unlocked once the studio marks them ready."
                    : "Your final full-resolution download package remains locked until the remaining balance is paid."}
                </p>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-zinc-500">Balance Due</p>
                  <p className="mt-1 text-3xl font-semibold text-white">
                    {formatCurrency(balanceDue)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                    <p className="text-xs text-zinc-500">Paid</p>
                    <p className="mt-1 text-lg font-semibold text-emerald-200">
                      {formatCurrency(paidAmount)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                    <p className="text-xs text-zinc-500">Status</p>
                    <p className="mt-1 text-lg font-semibold text-amber-200">
                      {paymentStatus}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Invoice
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Package charges and credits
              </h3>
            </div>

            <p className="text-sm text-zinc-400">Invoice #NM-2026-1042</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-[1fr_auto] border-b border-white/10 bg-black/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 sm:grid-cols-[1fr_120px_140px]">
              <span>Description</span>
              <span className="hidden sm:block">Category</span>
              <span className="text-right">Amount</span>
            </div>

            {invoiceLineItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_auto] items-center border-b border-white/10 px-4 py-4 last:border-b-0 sm:grid-cols-[1fr_120px_140px]"
              >
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.description}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 sm:hidden">
                    {item.category}
                  </p>
                </div>

                <p
                  className={[
                    "hidden text-sm font-semibold sm:block",
                    categoryClasses[item.category],
                  ].join(" ")}
                >
                  {item.category}
                </p>

                <p
                  className={[
                    "text-right text-sm font-semibold",
                    item.amount < 0 ? "text-amber-300" : "text-white",
                  ].join(" ")}
                >
                  {formatCurrency(item.amount)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-zinc-400">Current Balance</span>
              <span className="text-2xl font-semibold text-white">
                {formatCurrency(balanceDue)}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              This placeholder invoice is ready to be replaced with real Stripe
              invoice, payment intent, or checkout session data after backend
              redeploy.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Payment Milestones
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            Delivery unlock timeline
          </h3>

          <div className="mt-6 space-y-4">
            {paymentMilestones.map((milestone, index) => (
              <article
                key={milestone.id}
                className="relative rounded-2xl border border-white/10 bg-black/25 p-5"
              >
                {index !== paymentMilestones.length - 1 ? (
                  <div className="absolute left-8 top-16 h-8 w-px bg-white/10" />
                ) : null}

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <span
                      className={[
                        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                        statusClasses[milestone.status],
                      ].join(" ")}
                    >
                      {milestone.status}
                    </span>

                    <h4 className="mt-4 text-base font-semibold text-white">
                      {milestone.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {milestone.description}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {milestone.amount > 0
                      ? formatCurrency(milestone.amount)
                      : "Delivery Step"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Download Lock
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Downloads are locked until payment is completed
          </h3>

          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Your preview gallery and proofing tools can remain available while
            payment is pending. Final full-resolution packages should only
            unlock when Stripe confirms payment and the backend updates the
            invoice status.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/client/downloads"
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
            >
              View Downloads
            </Link>

            <Link
              to="/client/download-status"
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
            >
              Check Request Status
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Backend Ready
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Future Stripe workflow
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Later this page should load invoice totals, payment status, Stripe
            checkout links, paid timestamps, remaining balance, and delivery
            unlock permissions from the backend. The backend should be the source
            of truth for whether final downloads are available.
          </p>

          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Suggested future endpoints
            </p>

            <div className="mt-3 space-y-2">
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/invoice
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/invoice/status
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                POST /api/payments/stripe/checkout-session
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                POST /api/payments/stripe/webhook
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientInvoicePage;