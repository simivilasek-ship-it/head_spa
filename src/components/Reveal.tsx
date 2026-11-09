"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  /** pořadí v řadě karet — stagger max. 80 ms, nejvýš 3 karty za sebou */
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }

    const show = () => node.classList.add("is-visible");

    // už nad ohybem / mimo viewport nahoru → rovnou ukázat (ať nezůstane invisible)
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={index ? { transitionDelay: `${(index % 3) * 80}ms` } : undefined}
    >
      {children}
    </div>
  );
}
