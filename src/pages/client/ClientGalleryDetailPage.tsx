import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PhotoLightbox, {
  LightboxImage,
} from "../../components/client/PhotoLightbox";

const placeholderImages: LightboxImage[] = Array.from(
  { length: 12 },
  (_, index) => ({
    id: index + 1,
    title: `Photo ${index + 1}`,
  })
);

// Change this to "PAID" to test unlocked downloads.
const paymentStatus: "PENDING" | "PAID" | "FAILED" = "PENDING";

const downloadsUnlocked = paymentStatus === "PAID";

export default function ClientGalleryDetailPage() {
  const { galleryId } = useParams();

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  function openLightbox(index: number) {
    setCurrentPhotoIndex(index);
    setIsLightboxOpen(true);
  }

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const showPreviousPhoto = useCallback(() => {
    setCurrentPhotoIndex((currentIndex) => {
      if (currentIndex === 0) {
        return placeholderImages.length - 1;
      }

      return currentIndex - 1;
    });
  }, []);

  const showNextPhoto = useCallback(() => {
    setCurrentPhotoIndex((currentIndex) => {
      if (currentIndex === placeholderImages.length - 1) {
        return 0;
      }

      return currentIndex + 1;
    });
  }, []);

  return (
    <section className="relative min-h-screen px-6 py-10 text-cream">
      <Link
        to="/client/galleries"
        className="text-sm text-muted transition hover:text-cream"
      >
        ← Back to galleries
      </Link>

      <div className="mt-8 rounded-[2rem] border border-neon/40 bg-white/[0.06] p-6 shadow-glow">
        <p className="text-sm uppercase tracking-[0.35em] text-neon">
          Private Gallery
        </p>

        <h1 className="mt-4 text-4xl font-bold text-cream">
          Gallery #{galleryId}
        </h1>

        <p className="mt-4 max-w-3xl leading-7 text-muted">
          Review your private gallery, open enlarged previews, move through
          photos with arrow keys, and download final files after payment is
          completed.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-muted">
                Payment Status
              </p>

              <p
                className={`mt-2 text-2xl font-bold ${
                  downloadsUnlocked ? "text-neon" : "text-gold"
                }`}
              >
                {downloadsUnlocked ? "Paid — Downloads Unlocked" : "Payment Pending"}
              </p>

              <p className="mt-2 text-sm leading-6 text-muted">
                {downloadsUnlocked
                  ? "Your final gallery downloads are available."
                  : "Preview access is enabled. Final downloads unlock after payment is completed."}
              </p>
            </div>

            {!downloadsUnlocked && (
              <Link
                to="/client/invoices"
                className="rounded-full bg-neon px-5 py-3 text-center font-semibold text-black transition hover:bg-[#2de510]"
              >
                Pay Invoice
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            disabled={!downloadsUnlocked}
            className={`rounded-full px-5 py-3 font-semibold transition ${
              downloadsUnlocked
                ? "bg-neon text-black hover:bg-[#2de510]"
                : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-muted"
            }`}
          >
            {downloadsUnlocked
              ? "Download Approved Files"
              : "Downloads Locked Until Payment"}
          </button>

          <Link
            to="/client/invoices"
            className="rounded-full border border-white/20 px-5 py-3 font-semibold text-cream transition hover:border-neon/60"
          >
            View Invoice Status
          </Link>

          <Link
            to="/client/favorites"
            className="rounded-full border border-gold/50 px-5 py-3 font-semibold text-gold transition hover:bg-gold/10"
          >
            View Favorites
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {placeholderImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => openLightbox(index)}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left transition hover:-translate-y-1 hover:border-neon/60 hover:bg-white/[0.08]"
          >
            <div className="relative aspect-square bg-luxury-gradient">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm font-semibold text-cream backdrop-blur">
                  Open Preview
                </span>
              </div>

              {!downloadsUnlocked && (
                <div className="absolute bottom-3 right-3 rounded-full border border-gold/40 bg-black/70 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
                  Preview Only
                </div>
              )}
            </div>

            <div className="p-4">
              <p className="text-sm font-medium text-cream">{image.title}</p>
              <p className="mt-1 text-xs text-muted">
                Click to enlarge · Arrow keys enabled
              </p>
            </div>
          </button>
        ))}
      </div>

      <PhotoLightbox
        images={placeholderImages}
        currentIndex={currentPhotoIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onPrevious={showPreviousPhoto}
        onNext={showNextPhoto}
      />
    </section>
  );
}