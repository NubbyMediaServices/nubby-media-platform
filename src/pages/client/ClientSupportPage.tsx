import { Link } from "react-router-dom";

type SupportCategory = {
  title: string;
  description: string;
  route: string;
  tag: string;
};

type MessageThread = {
  id: number;
  subject: string;
  category: "Gallery" | "Proofing" | "Invoice" | "Downloads" | "Contract";
  status: "Open" | "Waiting on Studio" | "Waiting on Client" | "Resolved";
  lastMessage: string;
  updatedAt: string;
};

const supportCategories: SupportCategory[] = [
  {
    title: "Gallery Question",
    description:
      "Ask about gallery access, missing images, preview availability, or lightbox viewing.",
    route: "/client/galleries",
    tag: "Gallery",
  },
  {
    title: "Proofing / Edit Request",
    description:
      "Request help with favorites, image selections, retouching notes, or final edit feedback.",
    route: "/client/proofing",
    tag: "Proofing",
  },
  {
    title: "Invoice / Payment Help",
    description:
      "Ask about balances, Stripe checkout, payment confirmation, or download unlock status.",
    route: "/client/invoice",
    tag: "Billing",
  },
  {
    title: "Download Support",
    description:
      "Request help with locked downloads, package readiness, delivery links, or ZIP files.",
    route: "/client/download-status",
    tag: "Delivery",
  },
  {
    title: "Contract / Package Question",
    description:
      "Ask about package details, usage rights, session coverage, or agreement terms.",
    route: "/client/contract",
    tag: "Contract",
  },
  {
    title: "Profile Update",
    description:
      "Request updates to your contact information, billing email, or communication preferences.",
    route: "/client/profile",
    tag: "Account",
  },
];

const messageThreads: MessageThread[] = [
  {
    id: 1,
    subject: "Question about final gallery download unlock",
    category: "Downloads",
    status: "Waiting on Studio",
    lastMessage:
      "I paid the invoice and wanted to check when the full-resolution download will unlock.",
    updatedAt: "Updated today",
  },
  {
    id: 2,
    subject: "Proofing note for ceremony exit image",
    category: "Proofing",
    status: "Open",
    lastMessage:
      "Can the faces be brightened slightly while keeping the warm edit style?",
    updatedAt: "Updated yesterday",
  },
  {
    id: 3,
    subject: "Contract package clarification",
    category: "Contract",
    status: "Resolved",
    lastMessage:
      "Studio confirmed the package includes preview gallery access and proofing tools.",
    updatedAt: "Resolved 3 days ago",
  },
];

const statusClasses: Record<MessageThread["status"], string> = {
  Open: "border-sky-300/30 bg-sky-300/10 text-sky-200",
  "Waiting on Studio": "border-amber-300/30 bg-amber-300/10 text-amber-200",
  "Waiting on Client": "border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-200",
  Resolved: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
};

const categoryClasses: Record<MessageThread["category"], string> = {
  Gallery: "text-emerald-300",
  Proofing: "text-amber-300",
  Invoice: "text-sky-300",
  Downloads: "text-violet-300",
  Contract: "text-fuchsia-300",
};

function ClientSupportPage() {
  const openCount = messageThreads.filter(
    (thread) => thread.status !== "Resolved"
  ).length;

  const resolvedCount = messageThreads.filter(
    (thread) => thread.status === "Resolved"
  ).length;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Support / Message Photographer
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Message the studio about galleries, proofing, invoices,
                contracts, and delivery.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                This page gives clients a dedicated support area instead of
                scattering communication across text messages, email, and
                gallery notes. Later, messages can sync with admin/staff support
                queues.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:support@nubbymedia.com"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  Email Studio
                </a>

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
                Support Snapshot
              </p>

              <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="text-sm font-semibold text-emerald-100">
                  Studio support center
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Placeholder support threads are active for UI testing. Backend
                  messaging can be added after auth and roles are stable.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-amber-200">
                    {openCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Open Threads</p>
                </div>

                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-emerald-200">
                    {resolvedCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Resolved</p>
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
              Help Topics
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Choose what you need help with
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            These cards can later open a new message form with the correct
            support category preselected.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {supportCategories.map((category) => (
            <Link
              key={category.title}
              to={category.route}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/25 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300/50 hover:bg-white/[0.07]"
            >
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                {category.tag}
              </span>

              <h4 className="mt-4 text-lg font-semibold text-white">
                {category.title}
              </h4>

              <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">
                {category.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">
                  Opens related portal section
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
              Message Threads
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Recent support conversations
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            Placeholder conversation previews for the future client/studio
            messaging system.
          </p>
        </div>

        <div className="grid gap-5">
          {messageThreads.map((thread) => (
            <article
              key={thread.id}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/25 transition-all duration-200 hover:border-emerald-300/40 hover:bg-white/[0.07]"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-semibold",
                        statusClasses[thread.status],
                      ].join(" ")}
                    >
                      {thread.status}
                    </span>

                    <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-semibold">
                      <span className={categoryClasses[thread.category]}>
                        {thread.category}
                      </span>
                    </span>
                  </div>

                  <h4 className="mt-4 text-xl font-semibold text-white">
                    {thread.subject}
                  </h4>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
                    {thread.lastMessage}
                  </p>

                  <p className="mt-3 text-xs text-zinc-500">
                    {thread.updatedAt}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end">
                  <button
                    type="button"
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
                  >
                    View Thread
                  </button>

                  {thread.status !== "Resolved" ? (
                    <button
                      type="button"
                      className="rounded-full bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-emerald-300"
                    >
                      Reply
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            New Message
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            Message composer placeholder
          </h3>

          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="support-category"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500"
              >
                Category
              </label>
              <select
                id="support-category"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/50"
                defaultValue="Proofing"
              >
                <option>Gallery</option>
                <option>Proofing</option>
                <option>Invoice</option>
                <option>Downloads</option>
                <option>Contract</option>
                <option>Profile</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="support-subject"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500"
              >
                Subject
              </label>
              <input
                id="support-subject"
                type="text"
                placeholder="What do you need help with?"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/50"
              />
            </div>

            <div>
              <label
                htmlFor="support-message"
                className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500"
              >
                Message
              </label>
              <textarea
                id="support-message"
                rows={6}
                placeholder="Write your message to the studio..."
                className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-emerald-300/50"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              Send Message Placeholder
            </button>

            <p className="text-xs leading-5 text-zinc-500">
              This form is visual only for now. After backend redeploy, it can
              submit support messages to a protected client messaging endpoint.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Backend Ready
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Future support messaging workflow
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Later this page should create and read support threads tied to the
            authenticated client, gallery IDs, invoice IDs, proofing notes, and
            download requests. Admin/staff users should see the same messages in
            the admin portal so client communication stays organized.
          </p>

          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Suggested future endpoints
            </p>

            <div className="mt-3 space-y-2">
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/support/threads
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                POST /api/client/support/threads
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                POST /api/client/support/messages
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                PATCH /api/client/support/threads/:id/status
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-sm font-semibold text-amber-100">
              Recommended admin connection
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Add an Admin Support Inbox later so studio staff can respond to
              client portal messages without using email as the primary workflow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientSupportPage;