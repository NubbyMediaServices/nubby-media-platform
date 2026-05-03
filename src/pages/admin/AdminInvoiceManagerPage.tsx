const placeholderInvoices = [
  {
    id: 1,
    client: "Example Client",
    amount: "$0.00",
    status: "Draft",
  },
];

export default function AdminInvoiceManagerPage() {
  return (
    <section>
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
        Admin
      </p>

      <h1 className="mt-4 text-4xl font-bold">Invoices & Payments</h1>

      <p className="mt-4 max-w-3xl leading-7 text-white/60">
        Manage client invoices, payment status, Stripe checkout links, and paid
        gallery delivery rules.
      </p>

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="border-b border-white/10 text-sm text-white/50">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {placeholderInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-white/5">
                <td className="px-6 py-4 font-medium">{invoice.client}</td>
                <td className="px-6 py-4 text-white/60">{invoice.amount}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    {invoice.status}
                  </span>
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