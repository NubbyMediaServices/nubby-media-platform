export default function AdminSettingsPage() {
  return (
    <section>
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
        Admin
      </p>

      <h1 className="mt-4 text-4xl font-bold">Settings</h1>

      <p className="mt-4 max-w-3xl leading-7 text-white/60">
        Configure portal preferences, branding, storage behavior, payment rules,
        and gallery delivery settings.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold">Brand Settings</h2>
          <p className="mt-4 text-white/60">
            Placeholder for logo, colors, client portal branding, and public
            website styling controls.
          </p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold">Storage Settings</h2>
          <p className="mt-4 text-white/60">
            Placeholder for S3 bucket settings, upload limits, allowed file
            types, and download rules.
          </p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold">Payment Settings</h2>
          <p className="mt-4 text-white/60">
            Placeholder for Stripe configuration, invoice rules, and paid
            gallery delivery behavior.
          </p>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold">Security Settings</h2>
          <p className="mt-4 text-white/60">
            Placeholder for role access, session behavior, and staff
            permissions.
          </p>
        </article>
      </div>
    </section>
  );
}