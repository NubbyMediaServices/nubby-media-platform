import { Link } from "react-router-dom";

type SettingItem = {
  title: string;
  description: string;
  status: "Enabled" | "Disabled" | "Backend Required" | "Recommended";
};

type NotificationSetting = {
  label: string;
  description: string;
  enabled: boolean;
};

type PrivacySetting = {
  label: string;
  value: string;
  description: string;
};

const notificationSettings: NotificationSetting[] = [
  {
    label: "Gallery Updates",
    description:
      "Receive notifications when a gallery preview, final edit, or delivery package is updated.",
    enabled: true,
  },
  {
    label: "Proofing Reminders",
    description:
      "Receive reminders when favorites, proofing notes, or image approvals still need attention.",
    enabled: true,
  },
  {
    label: "Invoice & Payment Updates",
    description:
      "Receive payment reminders, Stripe confirmation notices, and invoice status changes.",
    enabled: true,
  },
  {
    label: "Download Status Updates",
    description:
      "Receive notifications when download packages are preparing, ready, delivered, or locked.",
    enabled: true,
  },
  {
    label: "Studio Messages",
    description:
      "Receive alerts when Nubby Media responds to a support or proofing message.",
    enabled: true,
  },
  {
    label: "Marketing / Featured Gallery Permission",
    description:
      "Optional permission for public portfolio, blog, or social media feature requests.",
    enabled: false,
  },
];

const portalSettings: SettingItem[] = [
  {
    title: "Secure Client Login",
    description:
      "Client portal authentication will be restored after backend redeploy and role testing.",
    status: "Backend Required",
  },
  {
    title: "Payment-Controlled Downloads",
    description:
      "Final downloads remain locked until payment is confirmed by backend invoice logic.",
    status: "Enabled",
  },
  {
    title: "Proofing Notes",
    description:
      "Clients can review placeholder proofing notes and submit future image feedback.",
    status: "Enabled",
  },
  {
    title: "Favorites / Selections",
    description:
      "Favorites are ready for backend sync with gallery image selections and final edit workflows.",
    status: "Enabled",
  },
  {
    title: "Support Messaging",
    description:
      "Support composer is visual now and ready to connect to protected message endpoints.",
    status: "Backend Required",
  },
  {
    title: "Signed S3 Downloads",
    description:
      "Downloads should later use short-lived private S3 signed URLs from the backend.",
    status: "Recommended",
  },
];

const privacySettings: PrivacySetting[] = [
  {
    label: "Gallery Visibility",
    value: "Private client access",
    description:
      "Assigned galleries should only be visible to the authenticated client and authorized staff.",
  },
  {
    label: "Download Security",
    value: "Payment + ownership verified",
    description:
      "The backend should verify invoice state, user identity, and gallery ownership before file access.",
  },
  {
    label: "Profile Updates",
    value: "Studio-approved recommended",
    description:
      "Contact and billing changes can be routed through a support request or admin approval flow.",
  },
  {
    label: "Marketing Permission",
    value: "Not enabled",
    description:
      "Client media should not be used publicly unless explicit approval is recorded.",
  },
];

const statusClasses: Record<SettingItem["status"], string> = {
  Enabled: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200",
  Disabled: "border-zinc-300/20 bg-zinc-300/10 text-zinc-300",
  "Backend Required": "border-amber-300/30 bg-amber-300/10 text-amber-200",
  Recommended: "border-sky-300/30 bg-sky-300/10 text-sky-200",
};

function ClientSettingsPage() {
  const enabledNotifications = notificationSettings.filter(
    (setting) => setting.enabled
  ).length;

  const backendRequiredCount = portalSettings.filter(
    (setting) => setting.status === "Backend Required"
  ).length;

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">
                Client Settings
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Manage portal preferences, notifications, privacy, and delivery
                settings.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                This settings page is polished for local UI testing and designed
                to connect later to authenticated client preferences, notification
                settings, profile rules, and secure download controls.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/client/profile"
                  className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
                >
                  View Profile
                </Link>

                <Link
                  to="/client/support"
                  className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-white/[0.08]"
                >
                  Request Changes
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/35 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Settings Snapshot
              </p>

              <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
                <p className="text-sm font-semibold text-emerald-100">
                  Preferences ready for backend sync
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Current values are placeholders. Later, these should load from
                  the authenticated client profile.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-emerald-200">
                    {enabledNotifications}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Notifications On</p>
                </div>

                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-center">
                  <p className="text-2xl font-semibold text-amber-200">
                    {backendRequiredCount}
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">Need Backend</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
          <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Notifications
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Client communication preferences
              </h3>
            </div>

            <p className="max-w-md text-sm text-zinc-400">
              Toggle controls are visual placeholders until the backend profile
              preference endpoints are connected.
            </p>
          </div>

          <div className="grid gap-4">
            {notificationSettings.map((setting) => (
              <article
                key={setting.label}
                className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/25 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-base font-semibold text-white">
                    {setting.label}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                    {setting.description}
                  </p>
                </div>

                <button
                  type="button"
                  className={[
                    "relative h-8 w-14 shrink-0 rounded-full border transition",
                    setting.enabled
                      ? "border-emerald-300/40 bg-emerald-300/30"
                      : "border-white/10 bg-white/10",
                  ].join(" ")}
                  aria-label={`${setting.label} ${
                    setting.enabled ? "enabled" : "disabled"
                  }`}
                >
                  <span
                    className={[
                      "absolute top-1 h-6 w-6 rounded-full bg-white transition",
                      setting.enabled ? "left-7" : "left-1",
                    ].join(" ")}
                  />
                </button>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Portal Features
          </p>

          <h3 className="mt-2 text-2xl font-semibold text-white">
            Feature readiness
          </h3>

          <div className="mt-6 grid gap-4">
            {portalSettings.map((setting) => (
              <article
                key={setting.title}
                className="rounded-3xl border border-white/10 bg-black/25 p-5"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-base font-semibold text-white">
                      {setting.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {setting.description}
                    </p>
                  </div>

                  <span
                    className={[
                      "w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-semibold",
                      statusClasses[setting.status],
                    ].join(" ")}
                  >
                    {setting.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Privacy & Access
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Gallery privacy and file access rules
            </h3>
          </div>

          <p className="max-w-xl text-sm text-zinc-400">
            These rules should be enforced on the backend, not only in the
            frontend.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {privacySettings.map((setting) => (
            <article
              key={setting.label}
              className="rounded-3xl border border-white/10 bg-black/25 p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                {setting.label}
              </p>

              <p className="mt-3 text-lg font-semibold text-white">
                {setting.value}
              </p>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {setting.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
            Auth Reminder
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Client route protection is still intentionally deferred
          </h3>

          <p className="mt-3 text-sm leading-6 text-zinc-300">
            The client portal is temporarily unprotected for localhost UI
            testing. After the backend is redeployed, verify the exact{" "}
            <span className="text-zinc-100">/api/users/me</span> response and
            restore client route protection using the correct role value.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/client/profile"
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
            >
              Check Profile Page
            </Link>

            <Link
              to="/client/support"
              className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-300/10"
            >
              Request Help
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Backend Ready
          </p>

          <h3 className="mt-2 text-xl font-semibold text-white">
            Future settings workflow
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Later this page should read and update notification preferences,
            profile settings, marketing permissions, download preferences,
            privacy flags, and account security settings for the authenticated
            client. Sensitive changes should require backend validation and audit
            logging.
          </p>

          <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5">
            <p className="text-sm font-semibold text-emerald-100">
              Suggested future endpoints
            </p>

            <div className="mt-3 space-y-2">
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                GET /api/client/settings
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                PATCH /api/client/settings
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                PATCH /api/client/preferences
              </p>
              <p className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 font-mono text-xs text-emerald-200">
                POST /api/audit/client-settings-change
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-sky-300/20 bg-sky-300/10 p-5">
            <p className="text-sm font-semibold text-sky-100">
              Recommended later
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Add a real settings form only after auth, client ownership, CORS,
              and role checks are stable on the redeployed backend.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ClientSettingsPage;