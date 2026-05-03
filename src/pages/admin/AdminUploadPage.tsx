export default function AdminUploadPage() {
  return (
    <section>
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
        Admin
      </p>

      <h1 className="mt-4 text-4xl font-bold">Multi-Upload Media</h1>

      <p className="mt-4 max-w-3xl leading-7 text-white/60">
        Upload client media to the private S3 bucket through the Spring Boot
        backend. Clients will never upload files.
      </p>

      <div className="mt-10 max-w-4xl rounded-[2rem] border border-dashed border-white/20 bg-white/[0.04] p-10 text-center">
        <p className="text-2xl font-semibold">Upload Area Placeholder</p>
        <p className="mt-4 text-white/60">
          This will become the drag-and-drop uploader connected to
          /api/media/upload or /api/media/upload/batch.
        </p>

        <input
          type="file"
          multiple
          className="mt-8 block w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white"
        />
      </div>
    </section>
  );
}