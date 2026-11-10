"use client";

import { useEffect, useRef } from "react";

function canUseCustomCursor() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** Stejný kurzor jako na zatepleni-vilasek.cz / simivilasek.cz */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        t?.closest("a, button, [role=button], input, textarea, select, label"),
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

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
