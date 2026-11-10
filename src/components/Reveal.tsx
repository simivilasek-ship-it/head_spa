"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** pořadí v řadě karet — stagger max. 80 ms, nejvýš 3 karty za sebou */
  index?: number;
  delay?: number;
  stagger?: boolean;
  rootMargin?: string;
  threshold?: number;
} & Omit<HTMLAttributes<HTMLDivElement>, "ref" | "style"> & {
    style?: CSSProperties;
  };

export function Reveal({
  children,
  className = "",
  index = 0,
  delay = 0,
  stagger = false,
  rootMargin = "0px 0px -6% 0px",
  threshold = 0.08,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("is-visible");
      return;
    }

    const show = () => node.classList.add("is-visible");

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
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const resolvedDelay = delay || (index ? (index % 3) * 80 : 0);

  const mergedStyle: CSSProperties = {
    ...style,
    ...(resolvedDelay
      ? ({ ["--reveal-delay" as string]: `${resolvedDelay}ms` } as CSSProperties)
      : {}),
  };

  return (
    <div
      ref={ref}
      className={`reveal${stagger ? " reveal-stagger" : ""}${className ? ` ${className}` : ""}`}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </div>
  );
}
