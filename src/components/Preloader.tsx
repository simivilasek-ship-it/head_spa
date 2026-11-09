"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sarya_has_loaded";
const MIN_MS = 700;
const MAX_MS = 2200;

function shouldSkipPreloader() {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return true;
    if (document.documentElement.dataset.saryaLoaded === "1") return true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

function whenHeroReady(): Promise<void> {
  return new Promise((resolve) => {
    const hero =
      document.querySelector<HTMLImageElement>("#uvod img") ??
      document.querySelector<HTMLImageElement>('img[src*="hero"]');

    if (!hero) {
      if (document.readyState === "complete") {
        resolve();
        return;
      }
      window.addEventListener("load", () => resolve(), { once: true });
      return;
    }

    if (hero.complete && hero.naturalWidth > 0) {
      resolve();
      return;
    }

    const done = () => resolve();
    hero.addEventListener("load", done, { once: true });
    hero.addEventListener("error", done, { once: true });
  });
}

export function Preloader() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (shouldSkipPreloader()) {
      document.documentElement.classList.remove("preloader-pending");
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let cancelled = false;
    let settled = false;
    let minTimer = 0;
    let fadeTimer = 0;
    let hardTimer = 0;

    const show = window.setTimeout(() => {
      if (cancelled) return;
      setVisible(true);
      document.documentElement.classList.remove("preloader-pending");
      document.documentElement.classList.add("preloader-active");
    }, 0);

    const started = performance.now();

    const dismiss = () => {
      if (cancelled || settled) return;
      settled = true;
      window.clearTimeout(hardTimer);

      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      minTimer = window.setTimeout(() => {
        if (cancelled) return;
        setLeaving(true);
        document.documentElement.classList.add("site-revealing");

        fadeTimer = window.setTimeout(() => {
          if (cancelled) return;
          try {
            sessionStorage.setItem(STORAGE_KEY, "1");
            document.documentElement.dataset.saryaLoaded = "1";
          } catch {
            /* ignore */
          }
          document.documentElement.classList.remove("preloader-active");
          document.documentElement.classList.add("site-ready");
          document.body.style.overflow = previousOverflow;
          setVisible(false);
        }, 480);
      }, wait);
    };

    void whenHeroReady().then(dismiss);
    hardTimer = window.setTimeout(dismiss, MAX_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(show);
      window.clearTimeout(minTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hardTimer);
      document.body.style.overflow = previousOverflow;
      document.documentElement.classList.remove(
        "preloader-pending",
        "preloader-active",
        "site-revealing",
      );
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`preloader fixed inset-0 z-[9999] flex items-center justify-center ${
        leaving ? "is-leaving" : ""
      }`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="preloader-inner text-center">
        <p className="preloader-brand font-[family-name:var(--font-display)]">
          <span className="block text-[clamp(1.75rem,5vw,2.5rem)] font-semibold tracking-[0.32em]">
            SARYA
          </span>
          <span className="mt-2 block text-[0.65rem] font-medium tracking-[0.36em] uppercase">
            Head Spa
          </span>
        </p>
        <p className="preloader-tagline mt-8 text-[var(--text-sm)] tracking-wide">
          Chvíle klidu začíná…
        </p>
        <div className="preloader-line mx-auto mt-8" aria-hidden />
      </div>
    </div>
  );
}
