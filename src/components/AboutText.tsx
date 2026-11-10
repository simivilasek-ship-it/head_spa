"use client";

import { useId, useState } from "react";

const VISIBLE_ON_MOBILE = 2;

export function AboutText({ paragraphs }: { paragraphs: readonly string[] }) {
  const [expanded, setExpanded] = useState(false);
  const restId = useId();
  const hasMore = paragraphs.length > VISIBLE_ON_MOBILE;

  return (
    <div className="mt-4">
      <div className="text-[var(--text-base)] leading-7 text-cream/90 lg:columns-2 lg:gap-10">
        {paragraphs.map((paragraph, index) => {
          const collapsed = index >= VISIBLE_ON_MOBILE && !expanded;
          return (
            <p
              key={paragraph}
              id={index === VISIBLE_ON_MOBILE ? restId : undefined}
              className={`mb-4 break-inside-avoid ${
                collapsed ? "hidden md:block" : ""
              }`}
            >
              {paragraph}
            </p>
          );
        })}
      </div>
      {hasMore ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={restId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-3 inline-flex min-h-11 items-center text-[var(--text-sm)] font-semibold text-cream underline decoration-cream/70 underline-offset-4 transition-colors hover:decoration-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light md:hidden"
        >
          {expanded ? "Skrýt" : "Číst dál"}
        </button>
      ) : null}
    </div>
  );
}
