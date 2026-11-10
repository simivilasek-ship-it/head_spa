import { SiteImage } from "@/components/SiteImage";
import { images } from "@/lib/images";

/** Galerie salonu — na mobilu horizontální scroll-snap. */
export function Gallery() {
  const photos = images.gallery;
  if (photos.length === 0) return null;

  return (
    <section aria-label="Galerie salonu" className="section bg-cream">
      <div className="md:wrap">
        <ul className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {photos.map((photo) => (
            <li
              key={`${photo.src}-${photo.alt}`}
              className="relative h-52 w-[78%] shrink-0 snap-center overflow-hidden rounded-[var(--radius)] sm:w-[62%] md:aspect-[5/4] md:h-auto md:w-auto"
            >
              <SiteImage
                src={photo.src}
                alt={photo.alt}
                sizes="(max-width: 768px) 78vw, 33vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
