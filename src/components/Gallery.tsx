import { SiteImage } from "@/components/SiteImage";
import { images } from "@/lib/images";

/** Galerie salonu ze skutečných fotek. */
export function Gallery() {
  const photos = images.gallery;
  if (photos.length === 0) return null;

  return (
    <section aria-label="Galerie salonu" className="section bg-cream">
      <ul className="wrap grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3">
        {photos.map((photo) => (
          <li
            key={photo.src}
            className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] md:aspect-[5/4]"
          >
            <SiteImage
              src={photo.src}
              alt={photo.alt}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
