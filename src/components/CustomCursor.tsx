"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Kurzor tečka + kroužek (jen desktop s jemným pointerem).
 * Na touch / reduced-motion se neaktivuje.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canUse = () => fine.matches && !reduce.matches;

    const syncActive = () => {
      const on = canUse();
      setActive(on);
      document.documentElement.classList.toggle("has-custom-cursor", on);
    };
    syncActive();

    fine.addEventListener("change", syncActive);
    reduce.addEventListener("change", syncActive);
    return () => {
      fine.removeEventListener("change", syncActive);
      reduce.removeEventListener("change", syncActive);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    if (!active) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let hovering = false;
    let visible = false;
    let raf = 0;

    const paint = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hovering ? 1.55 : 1})`;
      raf = requestAnimationFrame(paint);
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      hovering = Boolean(
        target?.closest(
          "a, button, [role='button'], input, textarea, select, label, summary",
        ),
      );
      document.documentElement.classList.toggle("cursor-hover", hovering);
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("cursor-hover");
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="custom-cursor" aria-hidden>
      <span ref={ringRef} className="custom-cursor-ring" />
      <span ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
