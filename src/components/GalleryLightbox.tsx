"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  type TouchEvent as ReactTouchEvent,
} from "react";

type GalleryItem = {
  src: string;
  alt: string;
};

type GalleryLightboxProps = {
  items: GalleryItem[];
  openIndex: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function GalleryLightbox({
  items,
  openIndex,
  onClose,
  onChange,
}: GalleryLightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const isOpen = openIndex !== null;
  const active = openIndex !== null ? items[openIndex] : null;

  const goPrev = useCallback(() => {
    if (openIndex === null || items.length === 0) return;
    onChange((openIndex - 1 + items.length) % items.length);
  }, [openIndex, items.length, onChange]);

  const goNext = useCallback(() => {
    if (openIndex === null || items.length === 0) return;
    onChange((openIndex + 1) % items.length);
  }, [openIndex, items.length, onChange]);

  useEffect(() => {
    if (!isOpen) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus();
    };
  }, [isOpen, onClose, goPrev, goNext]);

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
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  if (!isOpen || !active || openIndex === null) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${openIndex + 1} z ${items.length}`}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-forest/92 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream transition hover:bg-cream/20"
        aria-label="Zavřít"
      >
        ×
      </button>

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-3xl text-cream transition hover:bg-cream/20 md:left-6"
        aria-label="Předchozí"
      >
        ‹
      </button>

      <figure className="relative flex max-h-[90vh] w-full max-w-5xl flex-col items-center">
        <div className="relative h-[min(78vh,36rem)] w-full overflow-hidden rounded-[var(--radius)]">
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="(max-width: 1024px) 95vw, 1024px"
            quality={92}
            priority
            className="object-contain"
          />
        </div>
        <figcaption className="nums mt-4 text-center text-[var(--text-sm)] text-cream/75">
          {openIndex + 1} / {items.length}
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={goNext}
        className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-3xl text-cream transition hover:bg-cream/20 md:right-6"
        aria-label="Další"
      >
        ›
      </button>
    </div>
  );
}
