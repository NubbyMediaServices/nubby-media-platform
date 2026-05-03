import { Link } from "react-router-dom";

const placeholderGalleries = [
  {
    id: 1,
    title: "Wedding Gallery Example",
    client: "Unassigned",
    status: "Draft",
  },
  {
    id: 2,
    title: "Live Event Example",
    client: "Unassigned",
    status: "Draft",
  },
];

export default function AdminGalleryManagerPage() {
  return (
    <section>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
            Admin
          </p>
          <h1 className="mt-4 text-4xl font-bold">Gallery Manager</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/60">
            Create galleries, assign them to clients, control visibility, and
            manage delivery status.
          </p>
        </div>

        <Link
          to="/admin/galleries/new"
          className="rounded-full bg-emerald-400 px-5 py-3 font-semibold text-black hover:bg-emerald-300"
        >
          Create Gallery
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead className="border-b border-white/10 text-sm text-white/50">
            <tr>
              <th className="px-6 py-4">Gallery</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {placeholderGalleries.map((gallery) => (
              <tr key={gallery.id} className="border-b border-white/5">
                <td className="px-6 py-4 font-medium">{gallery.title}</td>
                <td className="px-6 py-4 text-white/60">{gallery.client}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    {gallery.status}
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