"use client";

import { useEffect, useRef, useState } from "react";
import { SiteImage } from "@/components/SiteImage";
import { images } from "@/lib/images";

/** Galerie salonu ze skutečných fotek. */
export function Gallery() {
  const photos = images.gallery;
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const slides = [...root.querySelectorAll<HTMLElement>("[data-slide]")];
    if (slides.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = slides.indexOf(visible.target as HTMLElement);
        if (next >= 0) setIndex(next);
      },
      { root, threshold: [0.55, 0.75] },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [photos.length]);

  if (photos.length === 0) return null;

  const scrollTo = (next: number) => {
    const root = scrollerRef.current;
    const slide = root?.querySelectorAll<HTMLElement>("[data-slide]")[next];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    slide?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  return (
    <section aria-label="Galerie salonu" className="section gallery-section bg-cream">
      <ul
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-pl-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo) => (
          <li
            key={photo.src}
            data-slide
            className="w-[85vw] shrink-0 snap-start md:w-[min(85vw,40rem)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)]">
              <SiteImage
                src={photo.src}
                alt={photo.alt}
                sizes="(max-width: 768px) 85vw, 40rem"
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-center gap-3 px-5">
        <div className="flex items-center gap-1.5" role="group" aria-label="Fotky v galerii">
          {photos.map((photo, photoIndex) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Fotka ${photoIndex + 1} z ${photos.length}`}
              aria-current={photoIndex === index ? "true" : undefined}
              onClick={() => scrollTo(photoIndex)}
              className={`h-1.5 rounded-full transition-all ${
                photoIndex === index ? "w-4 bg-forest" : "w-1.5 bg-forest/30"
              }`}
            />
          ))}
        </div>
        <p className="nums text-[var(--text-xs)] text-sage" aria-live="polite">
          {index + 1}/{photos.length}
        </p>
      </div>
    </section>
  );
}
