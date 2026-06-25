import AcademyImage from "@/components/AcademyImage";
import SectionHeader from "@/components/SectionHeader";
import { academyGallery } from "@/data/content";

export default function GallerySection() {
  return (
    <section className="section-modern section-surface max-w-7xl mx-auto px-4">
      <SectionHeader
        eyebrow="Academy Life"
        title="Photo Gallery"
        subtitle="Training, tournaments, medal ceremonies and team moments from Mentor Sports International Academy."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {academyGallery.map((photo, index) => (
          <div
            key={photo.src}
            className={`relative overflow-hidden card-modern ${
              index === 0 || index === 15
                ? "md:col-span-2 md:row-span-2 aspect-square"
                : "aspect-[4/3]"
            }`}
          >
            <AcademyImage
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes={
                index === 0 || index === 15
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 50vw, 25vw"
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
