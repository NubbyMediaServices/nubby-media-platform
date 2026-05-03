import { Link } from "react-router-dom";

type ContractSummaryItem = {
  label: string;
  value: string;
};

type PackageInclusion = {
  title: string;
  description: string;
  status: "Included" | "Optional" | "Pending";
};

type ContractTerm = {
  title: string;
  description: string;
};

const contractSummary: ContractSummaryItem[] = [
  {
    label: "Client",
    value: "Avery & Jordan Johnson",
  },
  {
    label: "Package",
    value: "Signature Wedding Collection",
  },
  {
    label: "Contract Status",
    value: "Signed",
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
    label: "Delivery Method",
    value: "Secure client portal",
  },
  {
    label: "Payment Status",
    value: "Pending",
  },
  {
    label: "Final Downloads",
    value: "Locked until paid",
  },
];

const packageInclusions: PackageInclusion[] = [
  {
    title: "Wedding Day Coverage",
    description:
      "Eight hours of photography coverage for ceremony, portraits, reception details, and candid moments.",
    status: "Included",
  },
  {
    title: "Private Online Gallery",
    description:
      "Secure gallery access through the Nubby Media client portal for previewing and proofing delivered images.",
    status: "Included",
  },
  {
    title: "Proofing & Favorites",
    description:
      "Client can mark favorite images, submit proofing notes, and request final edit attention on selected images.",
    status: "Included",
  },
  {
    title: "Full-Resolution Downloads",
    description:
      "Final download package becomes available after payment is completed and the studio marks delivery ready.",
    status: "Pending",
  },
  {
    title: "Print Package",
    description:
      "Optional print package can be added or fulfilled after client confirms selected images.",
    status: "Optional",
  },
  {
    title: "Album Design",
    description:
      "Optional album design workflow can use favorited images and approved proofing selections.",
    status: "Optional",
  },
];

const contractTerms: ContractTerm[] = [
  {
    title: "Gallery Access",
    description:
      "Client gallery access is provided through the secure portal. Access may include preview images, proofing tools, favorites, and download packages based on package terms.",
  },
  {
    title: "Payment-Controlled Delivery",
    description:
      "Final full-resolution downloads remain locked until the invoice is marked paid. Preview and proofing access may remain available during the review period.",
  },
  {
    title: "Image Usage Rights",
    description:
      "Client usage rights are determined by the signed package agreement. Standard client delivery typically permits personal use, sharing, and printing unless otherwise specified.",
  },
  {
    title: "Studio Editing",
    description:
      "Nubby Media controls final editing style, image selection, and delivery quality. Proofing notes help guide edits but do not guarantee every requested change.",
  },
  {
    title: "Delivery Timeline",
    description:
      "Final delivery timing depends on proofing completion, payment status, edit workload, and package scope. Download request status should reflect the active delivery stage.",
  },
  {
    title: "Support & Communication",
    description:
      "Contract, delivery, invoice, and gallery questions should be handled through the support/message photographer workflow once connected to the backend.",
  },
];

const statusClasses: Record<PackageInclusion["status"], string> = {
  Included: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  Optional: "border-sky-300/30 bg-sky-300/10 text-sky-200",
  Pending: "border-amber-300/30 bg-amber-300/10 text-amber-200",
};

function ClientContractPage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Contract / Package Details
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Review your signed package, usage terms, payment state, and
                delivery expectations.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                This page gives clients a clean contract and package summary
                inside the portal. Later, it can connect to real signed
                agreements, invoice records, Stripe payment state, and gallery
                delivery locks.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/client/invoice"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  View Invoice
                </Link>

                <Link
                  to="/client/support"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
                >
                  Ask Contract Question
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Contract Snapshot
              </p>

              <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="text-sm font-semibold text-emerald-100">
                  Signed Agreement
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Package is active. Final download delivery remains tied to
                  invoice/payment completion.
                </p>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-zinc-400">Contract</span>
                  <span className="text-sm font-semibold text-emerald-300">
                    Signed
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-zinc-400">Payment</span>
                  <span className="text-sm font-semibold text-amber-300">
                    Pending
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
            Summary
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            Contract overview
          </h3>

          <div className="mt-6 grid gap-3">
            {contractSummary.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-black/25 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Package Inclusions
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            Included, pending, and optional items
          </h3>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {packageInclusions.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-black/25 p-5"
              >
                <span
                  className={[
                    "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                    statusClasses[item.status],
                  ].join(" ")}
                >
                  {item.status}
                </span>

                <h4 className="mt-4 text-base font-semibold text-white">
                  {item.title}
                </h4>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Terms
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Package and delivery terms
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            This section is a portal summary, not a replacement for the signed
            legal agreement.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {contractTerms.map((term) => (
            <article
              key={term.title}
              className="rounded-3xl border border-white/10 bg-black/25 p-5"
            >
              <p className="text-sm font-semibold text-white">{term.title}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {term.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Delivery Lock Notice
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Final downloads remain locked
          </h3>

          <p className="mt-3 text-sm leading-6 text-zinc-300">
            Full-resolution downloads are intentionally locked while payment is
            pending. After Stripe confirms payment and the backend updates the
            invoice record, eligible download packages can be released.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/client/invoice"
              className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300"
            >
              Pay / View Invoice
            </Link>

            <Link
              to="/client/download-status"
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
            >
              Track Downloads
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Backend Ready
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Future contract workflow
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Later this page should load signed contract metadata, package
            inclusions, invoice connection, Stripe status, usage permissions,
            and downloadable agreement files from the backend. Admin/staff users
            should control contract status from the admin portal.
          </p>

          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Suggested future endpoints
            </p>

            <div className="mt-3 space-y-2">
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/contract
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/package
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

export default ClientContractPage;