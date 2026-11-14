"use client";

import { useCallback, useRef } from "react";
import { ProcedureCard } from "@/components/ProcedureCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { copy, procedures } from "@/lib/content";

/**
 * Equalises collapsed cards in the same row. An open step list grows only
 * that card — siblings keep the collapsed row height, with the button at the bottom.
 */
function syncProcedureRowHeights(root: HTMLElement) {
  const cards = [...root.querySelectorAll<HTMLElement>("article")];
  const measurements = cards.map((card) => {
    const body = card.querySelector<HTMLElement>("[data-procedure-body]");
    const foot = card.querySelector<HTMLElement>("[data-procedure-foot]");
    const steps = card.querySelector<HTMLElement>("[data-procedure-steps]");
    const top = Math.round(card.getBoundingClientRect().top);
    if (!body || !foot) return { card, top, height: 0 };
    const cs = getComputedStyle(card);
    const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    const height =
      body.offsetHeight +
      foot.offsetHeight -
      (steps?.offsetHeight ?? 0) +
      padY +
      borderY;
    return { card, top, height };
  });

  const rows: { top: number; items: typeof measurements }[] = [];
  for (const item of measurements) {
    const row = rows.find((candidate) => Math.abs(candidate.top - item.top) < 4);
    if (row) row.items.push(item);
    else rows.push({ top: item.top, items: [item] });
  }

  for (const row of rows) {
    const max = Math.ceil(Math.max(...row.items.map((item) => item.height)));
    for (const item of row.items) {
      item.card.style.minHeight = row.items.length > 1 ? `${max}px` : "";
    }
  }
}

export function Procedures() {
  const cleanupRef = useRef<(() => void) | null>(null);
  const listRef = useCallback((node: HTMLUListElement | null) => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    if (!node) return;

    const sync = () => syncProcedureRowHeights(node);
    sync();
    const observer = new ResizeObserver(sync);
    node.querySelectorAll("[data-procedure-body]").forEach((body) => observer.observe(body));
    window.addEventListener("resize", sync);
    cleanupRef.current = () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section
      id="procedury"
      aria-labelledby="procedury-heading"
      className="section bg-ivory"
    >
      <div className="wrap">
        <SectionHeader
          id="procedury-heading"
          kicker={copy.procedures.kicker}
          title={copy.procedures.title}
          subtitle={copy.procedures.subtitle}
          center
        />

        <ul
          ref={listRef}
          className="section-stack grid items-start gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-6"
        >
          {procedures.map((item, index) => (
            <li key={item.name} className="flex">
              <Reveal index={index} className="flex w-full">
                <ProcedureCard
                  name={item.name}
                  duration={item.duration}
                  price={item.price}
                  description={item.description}
                  note={item.note}
                  steps={item.steps}
                  bookingUrl={item.bookingUrl}
                  featured={item.name === "Sarya Relax"}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
