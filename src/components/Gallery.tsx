"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteImage } from "@/components/SiteImage";
import { copy } from "@/lib/content";
import { images } from "@/lib/images";

/** Galerie — nakloněné karty jako u uměleckých webů, šipky + lightbox. */
export function Gallery() {
  const titleId = useId();
  const photos = images.gallery;
  const count = photos.length;
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    setActive((current) => (current - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setActive((current) => (current + 1) % count);
  }, [count]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (openIndex !== null) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext, openIndex]);

  if (count === 0) return null;

  const onCardKeyDown = (e: ReactKeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (index === active) setOpenIndex(index);
      else setActive(index);
    }
  };

  const onTouchStart = (e: ReactTouchEvent) => {
    const t = e.changedTouches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };

  const onTouchEnd = (e: ReactTouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  return (
    <section
      id="galerie"
      aria-labelledby={titleId}
      className="section gallery-section bg-cream"
    >
      <div className="wrap">
        <Reveal>
          <SectionHeader
            id={titleId}
            kicker={copy.gallery.kicker}
            title={copy.gallery.title}
            subtitle={copy.gallery.subtitle}
            center
          />
        </Reveal>

        <Reveal className="section-stack">
          <div
            ref={stageRef}
            className="gallery-deck relative mx-auto w-full max-w-3xl outline-none"
            tabIndex={0}
            role="group"
            aria-roledescription="karusel"
            aria-label="Galerie salonu"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="gallery-deck-stage relative mx-auto h-[min(68vw,22rem)] w-full sm:h-[24rem] md:h-[26rem]">
              {photos.map((photo, index) => {
                const raw = index - active;
                const half = Math.floor(count / 2);
                let offset = raw;
                if (offset > half) offset -= count;
                if (offset < -half) offset += count;

                const abs = Math.abs(offset);
                const hidden = abs > 2;
                const near = abs <= 2;

                return (
                  <button
                    key={photo.src}
                    type="button"
                    className={`gallery-card group absolute left-1/2 top-1/2 w-[min(78%,20rem)] overflow-hidden rounded-[var(--radius)] bg-mist text-left shadow-[0_18px_40px_rgba(52,68,58,0.18)] ring-1 ring-forest/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage sm:w-[22rem] md:w-[24rem] ${
                      offset === 0 ? "gallery-card-active" : ""
                    } ${abs === 2 ? "gallery-card-far" : ""}`}
                    style={
                      {
                        "--offset": offset,
                        "--abs": abs,
                        zIndex: hidden ? 0 : 10 - abs,
                        opacity: hidden ? 0 : offset === 0 ? 1 : 0.85,
                        pointerEvents: hidden ? "none" : "auto",
                      } as CSSProperties
                    }
                    aria-hidden={hidden || undefined}
                    tabIndex={offset === 0 ? 0 : -1}
                    aria-label={
                      offset === 0
                        ? `Otevřít foto ${index + 1} z ${count}`
                        : `Přejít na foto ${index + 1}`
                    }
                    aria-current={offset === 0 ? "true" : undefined}
                    onClick={() => {
                      if (offset === 0) setOpenIndex(index);
                      else setActive(index);
                    }}
                    onKeyDown={(e) => onCardKeyDown(e, index)}
                  >
                    <span className="relative block aspect-[4/3]">
                      <SiteImage
                        src={photo.src}
                        alt={photo.alt}
                        loading={near ? "eager" : "lazy"}
                        sizes="(max-width: 640px) 78vw, 24rem"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10">
              <button
                type="button"
                onClick={goPrev}
                className="btn-press inline-flex h-12 w-12 items-center justify-center rounded-full border border-forest/20 bg-cream text-xl text-forest transition-colors hover:border-forest/35 hover:bg-mist"
                aria-label="Předchozí foto"
              >
                ‹
              </button>
              <p
                className="nums min-w-[4.5rem] text-center text-[var(--text-sm)] text-ink/65"
                aria-live="polite"
              >
                {active + 1} / {count}
              </p>
              <button
                type="button"
                onClick={goNext}
                className="btn-press inline-flex h-12 w-12 items-center justify-center rounded-full border border-forest/20 bg-cream text-xl text-forest transition-colors hover:border-forest/35 hover:bg-mist"
                aria-label="Další foto"
              >
                ›
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <GalleryLightbox
        items={photos}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </section>
  );
}
