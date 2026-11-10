"use client";

import { useId, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { copy, faqs } from "@/lib/content";

export function Faq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <SectionHeader
        id="faq-heading"
        kicker={copy.faq.kicker}
        title={copy.faq.title}
      />
      <div className="section-stack divide-y divide-forest/10 border-y border-forest/10">
        {faqs.slice(0, 5).map((item, index) => {
          const expanded = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenIndex((current) => (current === index ? null : index))
                  }
                  className="flex min-h-12 w-full items-center justify-between gap-4 py-5 text-left text-[var(--text-base)] font-semibold tracking-[-0.01em] text-ink transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                >
                  <span>{item.q}</span>
                  <span
                    aria-hidden
                    className={`shrink-0 text-xl font-light leading-none text-forest/60 transition-transform duration-200 ${
                      expanded ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!expanded}
              >
                <p className="pb-6 pr-10 text-[var(--text-sm)] leading-7 text-ink/70">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
