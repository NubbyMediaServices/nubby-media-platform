const placeholderLogs = [
  {
    id: 1,
    action: "ADMIN_PORTAL_VIEWED",
    actor: "System",
    timestamp: "Pending backend connection",
  },
];

export default function AdminAuditLogsPage() {
  return (
    <section>
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
        Admin
      </p>

      <h1 className="mt-4 text-4xl font-bold">Audit Logs</h1>

      <p className="mt-4 max-w-3xl leading-7 text-white/60">
        Review login activity, upload actions, gallery changes, downloads, and
        client access events.
      </p>

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead className="border-b border-white/10 text-sm text-white/50">
            <tr>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Actor</th>
              <th className="px-6 py-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {placeholderLogs.map((log) => (
              <tr key={log.id} className="border-b border-white/5">
                <td className="px-6 py-4 font-medium">{log.action}</td>
                <td className="px-6 py-4 text-white/60">{log.actor}</td>
                <td className="px-6 py-4 text-white/60">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}