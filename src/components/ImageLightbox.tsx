"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AcademyImage from "@/components/AcademyImage";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: readonly LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const isOpen = activeIndex !== null && images[activeIndex];
  const current = isOpen ? images[activeIndex] : null;
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (activeIndex === null) return;

      if (event.key === "ArrowLeft" && hasMultiple) {
        onNavigate((activeIndex - 1 + images.length) % images.length);
      }

      if (event.key === "ArrowRight" && hasMultiple) {
        onNavigate((activeIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, hasMultiple, images.length, isOpen, onClose, onNavigate]);

  if (!isOpen || !current || activeIndex === null) {
    return null;
  }

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={current.alt}>
      <button
        type="button"
        className="image-lightbox-backdrop"
        onClick={onClose}
        aria-label="Close image viewer"
      />

      <div className="image-lightbox-panel">
        <button
          type="button"
          onClick={onClose}
          className="image-lightbox-close"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {hasMultiple && (
          <button
            type="button"
            onClick={() => onNavigate((activeIndex - 1 + images.length) % images.length)}
            className="image-lightbox-nav image-lightbox-nav-prev"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        <figure className="image-lightbox-figure">
          <div className="image-lightbox-image-wrap">
            <AcademyImage
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <figcaption className="image-lightbox-caption">{current.alt}</figcaption>
          {hasMultiple && (
            <p className="image-lightbox-counter">
              {activeIndex + 1} / {images.length}
            </p>
          )}
        </figure>

        {hasMultiple && (
          <button
            type="button"
            onClick={() => onNavigate((activeIndex + 1) % images.length)}
            className="image-lightbox-nav image-lightbox-nav-next"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
