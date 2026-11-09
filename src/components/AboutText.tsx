"use client";

import { useState } from "react";

const VISIBLE_ON_MOBILE = 2;

export function AboutText({ paragraphs }: { paragraphs: readonly string[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-4">
      <div className="text-[var(--text-base)] leading-7 text-cream/90 lg:columns-2 lg:gap-10">
        {paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            className={`mb-4 break-inside-avoid ${
              index >= VISIBLE_ON_MOBILE && !expanded ? "hidden md:block" : ""
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
      {expanded ? null : (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-3 inline-flex min-h-11 items-center text-[var(--text-sm)] text-sage-light transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light md:hidden"
        >
          Číst dál
        </button>
      )}
    </div>
  );
}
