"use client";

import { useId, useState } from "react";

export function AboutText({ paragraphs }: { paragraphs: readonly string[] }) {
  const [expanded, setExpanded] = useState(false);
  const restId = useId();
  const previewCount = Math.max(2, Math.ceil(paragraphs.length / 2));
  const preview = paragraphs.slice(0, previewCount);
  const rest = paragraphs.slice(previewCount);
  const hasMore = rest.length > 0;

  return (
    <div className="mt-5">
      <div className="relative">
        <div
          className={
            expanded
              ? "space-y-3 text-[var(--text-base)] leading-7 text-cream/90 md:columns-2 md:gap-10 md:space-y-0"
              : "max-w-[65ch] space-y-3 text-[var(--text-base)] leading-7 text-cream/90"
          }
        >
          {preview.map((paragraph) => (
            <p
              key={paragraph}
              className={expanded ? "md:mb-3 md:break-inside-avoid" : undefined}
            >
              {paragraph}
            </p>
          ))}

          {hasMore && expanded
            ? rest.map((paragraph, index) => (
                <p
                  key={paragraph}
                  id={index === 0 ? restId : undefined}
                  className="md:mb-3 md:break-inside-avoid"
                >
                  {paragraph}
                </p>
              ))
            : null}
        </div>

        {hasMore && !expanded ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-forest via-forest/85 to-transparent"
          />
        ) : null}
      </div>

      {hasMore ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={hasMore ? restId : undefined}
          onClick={() => setExpanded((value) => !value)}
          className="relative z-10 mt-5 inline-flex min-h-11 items-center gap-2 text-[var(--text-sm)] font-semibold tracking-[0.02em] text-cream underline decoration-cream/55 underline-offset-4 transition-colors hover:decoration-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light"
        >
          <span>{expanded ? "Zobrazit méně" : "Číst dál"}</span>
          <span aria-hidden className="text-cream/70">
            {expanded ? "↑" : "↓"}
          </span>
        </button>
      ) : null}
    </div>
  );
}
