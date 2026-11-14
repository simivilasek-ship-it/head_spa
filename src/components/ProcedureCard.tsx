"use client";

import { useId, useState } from "react";
import { BookingButton } from "@/components/Button";

export type ProcedureCardProps = {
  name: string;
  duration: string;
  price: string;
  description: string;
  note?: string;
  steps?: readonly string[];
  featured?: boolean;
  /** Prázdné = fallback na stránku salonu na Notinu. */
  bookingUrl?: string;
};

export function ProcedureCard({
  name,
  duration,
  price,
  description,
  note,
  steps = [],
  featured = false,
  bookingUrl = "",
}: ProcedureCardProps) {
  const [expanded, setExpanded] = useState(false);
  const stepsId = useId();
  const hasSteps = steps.length > 0;

  return (
    <article
      className={`card card-hover flex h-full w-full flex-col p-6 md:p-7 ${
        featured ? "ring-1 ring-forest/25" : ""
      }`}
    >
      <div data-procedure-body>
        <div className="flex items-center justify-between gap-3">
          <span className="nums text-[var(--text-xs)] font-semibold tracking-wide text-sage">
            {duration}
          </span>
          {featured ? (
            <span className="rounded-md bg-forest px-2 py-0.5 text-[0.6875rem] font-semibold tracking-[0.06em] text-cream">
              Nejčastější
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-baseline justify-between gap-3">
          <h3 className="text-[1.125rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
            {name}
          </h3>
          <p className="nums shrink-0 text-[1.125rem] font-semibold text-forest">
            {price}
          </p>
        </div>

        {note ? (
          <p className="mt-2 text-[var(--text-xs)] font-medium leading-5 text-sage">
            {note}
          </p>
        ) : null}

        <p className="mt-3.5 text-[var(--text-sm)] leading-7 text-ink/70">
          {description}
        </p>
      </div>

      <div data-procedure-foot className="mt-auto flex flex-col pt-4">
        {hasSteps ? (
          <>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={stepsId}
              onClick={() => setExpanded((value) => !value)}
              className="inline-flex min-h-10 items-center gap-1.5 self-start text-[var(--text-sm)] font-semibold text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:decoration-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              <span>{expanded ? "Zobrazit méně" : "Celý průběh"}</span>
              <span aria-hidden className="text-forest/60">
                {expanded ? "↑" : "↓"}
              </span>
            </button>

            <div
              id={stepsId}
              data-procedure-steps
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <ul
                  aria-hidden={!expanded}
                  className="space-y-2 pt-3 text-[var(--text-sm)] leading-6 text-ink/75"
                >
                  {steps.map((step) => (
                    <li key={step} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sage"
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : null}

        <div className="pt-6">
          <BookingButton className="w-full" href={bookingUrl} />
        </div>
      </div>
    </article>
  );
}
