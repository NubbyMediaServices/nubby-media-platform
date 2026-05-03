import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";

export interface LightboxImage {
  id: number;
  title: string;
  imageUrl?: string;
}

interface PhotoLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function PhotoLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: PhotoLightboxProps) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen || !currentImage) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 py-6 backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-cream transition hover:bg-white/20"
        aria-label="Close photo viewer"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-cream transition hover:bg-white/20 md:left-8 md:h-14 md:w-14"
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 text-cream transition hover:bg-white/20 md:right-8 md:h-14 md:w-14"
        aria-label="Next photo"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <div
        className="relative flex max-h-[88vh] w-full max-w-6xl flex-col items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex max-h-[78vh] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl">
          {currentImage.imageUrl ? (
            <img
              src={currentImage.imageUrl}
              alt={currentImage.title}
              className="max-h-[78vh] w-auto max-w-full object-contain"
            />
          ) : (
            <div className="flex aspect-[16/10] max-h-[78vh] w-full items-center justify-center bg-luxury-gradient">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-neon">
                  Preview
                </p>
                <h2 className="mt-4 text-3xl font-bold text-cream">
                  {currentImage.title}
                </h2>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex w-full max-w-4xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm text-muted">
          <div>
            <p className="font-semibold text-cream">{currentImage.title}</p>
            <p className="mt-1">
              Photo {currentIndex + 1} of {images.length}
            </p>
          </div>

          <p className="hidden text-right text-xs text-muted md:block">
            Use ← and → arrow keys to browse. Press Esc to close.
          </p>
        </div>
      </div>
    </div>
  );
}