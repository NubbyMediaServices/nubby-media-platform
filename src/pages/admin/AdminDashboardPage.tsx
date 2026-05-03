const stats = [
  { label: "Active Galleries", value: "0" },
  { label: "Clients", value: "0" },
  { label: "Pending Invoices", value: "0" },
  { label: "Uploads This Month", value: "0" },
];

export default function AdminDashboardPage() {
  return (
    <section>
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
        Admin
      </p>

      <h1 className="mt-4 text-4xl font-bold">Dashboard</h1>

      <p className="mt-4 max-w-3xl leading-7 text-white/60">
        Manage Nubby Media galleries, clients, secure media uploads, invoices,
        and audit activity from one protected workspace.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
          >
            <p className="text-sm text-white/50">{stat.label}</p>
            <p className="mt-3 text-4xl font-bold">{stat.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold">Next Build Tasks</h2>
          <ul className="mt-5 space-y-3 text-white/60">
            <li>Connect gallery manager to backend API.</li>
            <li>Connect multi-upload to private S3 upload endpoint.</li>
            <li>Add client assignment workflow.</li>
            <li>Add Stripe invoice/payment status display.</li>
          </ul>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold">System Status</h2>
          <div className="mt-5 space-y-3 text-white/60">
            <p>API: https://api.nubbymedia.com</p>
            <p>Auth: JWT</p>
            <p>Storage: AWS S3 private client media bucket</p>
            <p>Database: AWS RDS MySQL</p>
          </div>
        </article>
      </div>
    </section>
  );
}