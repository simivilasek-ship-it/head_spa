"use client";

import { useEffect, useRef } from "react";

/**
 * Feature flag: vlastní kurzor (tečka + kroužek).
 * Vypnout = false, pokud ruší čitelnost textu.
 */
export const ENABLE_CUSTOM_CURSOR = true;

function canUseCustomCursor() {
  if (!ENABLE_CUSTOM_CURSOR) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Volitelný kurzor. Nad odkazy/tlačítky/mapou/formáři zůstává systémový kurzor. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ENABLE_CUSTOM_CURSOR) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let mouseX = -999;
    let mouseY = -999;
    let ringX = -999;
    let ringY = -999;
    let rafId = 0;
    let hovered = false;
    let attached = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        t?.closest(
          "a, button, [role=button], input, textarea, select, label, iframe",
        ),
      );
      if (isInteractive && !hovered) {
        hovered = true;
        ring.classList.add("cursor-ring-hovered");
      } else if (!isInteractive && hovered) {
        hovered = false;
        ring.classList.remove("cursor-ring-hovered");
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    const detach = () => {
      if (!attached) return;
      attached = false;
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
      ring.classList.remove("cursor-ring-hovered");
    };

    const attach = () => {
      if (attached) return;
      attached = true;
      document.documentElement.classList.add("has-custom-cursor");
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseover", onOver);
      rafId = requestAnimationFrame(tick);
    };

    const sync = () => {
      if (canUseCustomCursor()) attach();
      else detach();
    };

    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);

    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      detach();
    };
  }, []);

  if (!ENABLE_CUSTOM_CURSOR) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
