"use client";

import { useEffect, useId, useRef, useState } from "react";
import { StarRating } from "@/components/StarRating";
import { formatRating } from "@/lib/reviews";

interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
  source?: string;
  /** Už naformátované datum (např. „31. 1. 2026“). */
  date?: string;
  url?: string;
}

/** Karta jedné recenze. Text je omezený na 4 řádky, zbytek se rozbalí tlačítkem. */
export function ReviewCard({
  name,
  rating,
  text,
  source = "Google",
  date,
  url,
}: ReviewCardProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const textId = useId();
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);

  useEffect(() => {
    const node = textRef.current;
    if (!node) return;
    const measure = () => {
      if (!expanded) setTruncated(node.scrollHeight > node.clientHeight + 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [expanded, text]);

  const title = (
    <h3 className="truncate text-[var(--text-base)] font-semibold leading-snug text-ink">
      {name}
    </h3>
  );

  return (
    <article className="card flex h-full w-full min-w-0 flex-col p-6 md:p-7">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-forest"
            >
              {title}
            </a>
          ) : (
            title
          )}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <StarRating
              rating={rating}
              size="h-4 w-4"
              label={`Hodnocení ${formatRating(rating)} z 5`}
            />
            {date ? (
              <span className="nums text-[var(--text-xs)] text-ink/70">{date}</span>
            ) : null}
          </div>
        </div>
        <span className="shrink-0 pt-0.5 text-[var(--text-xs)] font-medium uppercase tracking-[0.14em] text-ink/55">
          {source}
        </span>
      </div>

      <p
        ref={textRef}
        id={textId}
        className={`mt-4 text-[var(--text-sm)] leading-7 text-ink/85 ${
          expanded ? "" : "line-clamp-4"
        }`}
      >
        {text}
      </p>

      {truncated || expanded ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={textId}
          className="mt-2 inline-flex min-h-11 items-center self-start text-[var(--text-sm)] font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          {expanded ? "Zobrazit méně" : "Zobrazit více"}
        </button>
      ) : null}
    </article>
  );
}
