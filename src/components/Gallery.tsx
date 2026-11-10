"use client";

import { useCallback, useEffect, useState } from "react";
import { SiteImage } from "@/components/SiteImage";
import { images } from "@/lib/images";

type Photo = (typeof images.gallery)[number];

/** Galerie jako na zatepleni-vilasek.cz — mřížka, hover zoom, rozkliknutí bez titulků. */
export function Gallery() {
  const photos = images.gallery;
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  const showPrev = useCallback(() => {
    setActive((current) =>
      current === null ? current : (current - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);

  const showNext = useCallback(() => {
    setActive((current) =>
      current === null ? current : (current + 1) % photos.length,
    );
  }, [photos.length]);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, close, showPrev, showNext]);

  if (photos.length === 0) return null;

  const activePhoto: Photo | null =
    active === null ? null : (photos[active] ?? null);

  return (
    <section aria-label="Galerie salonu" className="section bg-cream">
      <div className="wrap">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {photos.map((photo, index) => (
            <li key={`${photo.src}-${photo.alt}`}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Zvětšit fotku: ${photo.alt}`}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] bg-mist text-left shadow-sm ring-1 ring-forest/8 transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                <SiteImage
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activePhoto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-forest/88 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-cream/35 text-cream transition hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light"
            aria-label="Zavřít"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
            className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/35 text-cream transition hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light md:left-6"
            aria-label="Předchozí fotka"
          >
            ‹
          </button>

          <div
            className="relative aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-[var(--radius)] bg-ink/40"
            onClick={(event) => event.stopPropagation()}
          >
            <SiteImage
              src={activePhoto.src}
              alt={activePhoto.alt}
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/35 text-cream transition hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light md:right-6"
            aria-label="Další fotka"
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
