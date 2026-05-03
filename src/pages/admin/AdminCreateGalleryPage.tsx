export default function AdminCreateGalleryPage() {
  return (
    <section>
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
        Admin
      </p>

      <h1 className="mt-4 text-4xl font-bold">Create Gallery</h1>

      <p className="mt-4 max-w-3xl leading-7 text-white/60">
        Create a new gallery shell before uploading media and assigning it to a
        client.
      </p>

      <form className="mt-10 max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
        <label className="block">
          <span className="text-sm text-white/70">Gallery Name</span>
          <input
            className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-emerald-400"
            placeholder="Smith Wedding Gallery"
          />
        </label>

        <label className="mt-5 block">
          <span className="text-sm text-white/70">Gallery Type</span>
          <select className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-emerald-400">
            <option>Wedding</option>
            <option>Live Event</option>
            <option>Portrait</option>
            <option>Private Collection</option>
          </select>
        </label>

        <label className="mt-5 block">
          <span className="text-sm text-white/70">Description</span>
          <textarea
            className="mt-2 min-h-32 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-emerald-400"
            placeholder="Internal notes or client-facing gallery description."
          />
        </label>

        <button
          type="button"
          className="mt-6 rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-black hover:bg-emerald-300"
        >
          Save Gallery Placeholder
        </button>
      </form>
    </section>
  );
}