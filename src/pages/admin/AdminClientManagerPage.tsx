const placeholderClients = [
  {
    id: 1,
    name: "Example Client",
    email: "client@example.com",
    galleries: 0,
  },
];

export default function AdminClientManagerPage() {
  return (
    <section>
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
        Admin
      </p>

      <h1 className="mt-4 text-4xl font-bold">Client Manager</h1>

      <p className="mt-4 max-w-3xl leading-7 text-white/60">
        Create client accounts, assign galleries, and manage access to private
        photo collections.
      </p>

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="border-b border-white/10 text-sm text-white/50">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Galleries</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {placeholderClients.map((client) => (
              <tr key={client.id} className="border-b border-white/5">
                <td className="px-6 py-4 font-medium">{client.name}</td>
                <td className="px-6 py-4 text-white/60">{client.email}</td>
                <td className="px-6 py-4 text-white/60">
                  {client.galleries}
                </td>
                <td className="px-6 py-4">
                  <button className="text-sm text-emerald-400 hover:text-emerald-300">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}