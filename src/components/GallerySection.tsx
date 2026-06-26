"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import AcademyImage from "@/components/AcademyImage";
import ImageLightbox from "@/components/ImageLightbox";
import SectionHeader from "@/components/SectionHeader";
import { academyGallery } from "@/data/content";

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="section-modern section-surface w-full site-container">
      <SectionHeader
        eyebrow="Academy Life"
        title="Photo Gallery"
        subtitle="Training, tournaments, medal ceremonies and team moments from Mentor Sports International Academy."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {academyGallery.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`gallery-tile group relative overflow-hidden card-modern text-left ${
              index === 0 || index === 15
                ? "md:col-span-2 md:row-span-2 aspect-square"
                : "aspect-[4/3]"
            }`}
            aria-label={`Open photo: ${photo.alt}`}
          >
            <AcademyImage
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={
                index === 0 || index === 15
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 50vw, 25vw"
              }
            />
            <span className="gallery-tile-overlay" aria-hidden>
              <ZoomIn size={22} />
            </span>
          </button>
        ))}
      </div>

      <ImageLightbox
        images={academyGallery}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
