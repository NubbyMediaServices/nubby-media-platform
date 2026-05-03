import { Link } from "react-router-dom";

type ProfileDetail = {
  label: string;
  value: string;
};

type PreferenceItem = {
  label: string;
  value: string;
  description: string;
};

const contactDetails: ProfileDetail[] = [
  {
    label: "Client Name",
    value: "Avery Johnson",
  },
  {
    label: "Email",
    value: "avery.johnson@example.com",
  },
  {
    label: "Phone",
    value: "(555) 214-9087",
  },
  {
    label: "Secondary Contact",
    value: "Jordan Johnson",
  },
  {
    label: "Secondary Email",
    value: "jordan.johnson@example.com",
  },
  {
    label: "Location",
    value: "Grand Rapids, Michigan",
  },
];

const billingDetails: ProfileDetail[] = [
  {
    label: "Billing Name",
    value: "Avery & Jordan Johnson",
  },
  {
    label: "Billing Email",
    value: "avery.johnson@example.com",
  },
  {
    label: "Invoice Delivery",
    value: "Email + Client Portal",
  },
  {
    label: "Payment Method",
    value: "Stripe checkout link",
  },
];

const preferences: PreferenceItem[] = [
  {
    label: "Preferred Contact",
    value: "Email",
    description:
      "Primary studio updates, gallery notices, invoices, and proofing reminders are sent by email.",
  },
  {
    label: "Gallery Notifications",
    value: "Enabled",
    description:
      "Client receives notifications when previews, edits, downloads, or delivery status changes.",
  },
  {
    label: "Proofing Reminders",
    value: "Enabled",
    description:
      "Helpful reminders can be sent when proofing notes, favorites, or approvals are still pending.",
  },
  {
    label: "Marketing Permission",
    value: "Not enabled",
    description:
      "Client has not opted into public marketing, featured galleries, or social sharing approval.",
  },
];

function ClientProfilePage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Client Profile
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Review your contact information, communication preferences, and
                billing profile.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                This profile page is designed to help clients confirm the studio
                has the right delivery, billing, and communication details before
                final gallery fulfillment.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/client/support"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  Request Profile Update
                </Link>

                <Link
                  to="/client/invoice"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
                >
                  View Billing
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Account Snapshot
              </p>

              <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="text-sm font-semibold text-emerald-100">
                  Profile on file
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Contact details are available for portal testing. Future edit
                  requests can be routed to the studio or admin approval queue.
                </p>
              </div>

              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-zinc-400">Account</span>
                  <span className="text-sm font-semibold text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-zinc-400">Notifications</span>
                  <span className="text-sm font-semibold text-emerald-300">
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-sm text-zinc-400">Security</span>
                  <span className="text-sm font-semibold text-sky-300">
                    JWT Ready
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Contact Information
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            Client contact details
          </h3>

          <div className="mt-6 grid gap-3">
            {contactDetails.map((detail) => (
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
            Billing Information
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            Invoice and payment contact
          </h3>

          <div className="mt-6 grid gap-3">
            {billingDetails.map((detail) => (
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

          <div className="mt-5 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-sm font-semibold text-amber-100">
              Payment-controlled downloads
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Final download access is tied to invoice status. Once Stripe marks
              the invoice paid, backend logic can unlock the appropriate
              download packages.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Preferences
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Communication and gallery settings
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            These placeholder settings are ready to connect to client profile
            endpoints after backend redeploy.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {preferences.map((preference) => (
            <article
              key={preference.label}
              className="rounded-3xl border border-white/10 bg-black/25 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                {preference.label}
              </p>

              <p className="mt-3 text-lg font-semibold text-white">
                {preference.value}
              </p>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {preference.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Account Security
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Authentication status
          </h3>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">
                JWT authentication ready
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Once the backend is redeployed, this page can load the current
                authenticated client from{" "}
                <span className="text-zinc-200">/api/users/me</span>.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">
                Profile editing should be protected
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Client profile updates should require a valid token and should
                only update the authenticated user or linked client record.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Backend Ready
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Future client profile workflow
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Later this page should load the client profile, billing contact,
            notification preferences, contract relationship, assigned galleries,
            and payment status from the backend. Profile edits can either be
            direct client edits or studio-approved change requests.
          </p>

          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Suggested future endpoints
            </p>

            <div className="mt-3 space-y-2">
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/users/me
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/profile
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                PATCH /api/client/profile
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                PATCH /api/client/preferences
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientProfilePage;