"use client";

import { useEffect, useState } from "react";
import { BookingButton } from "@/components/Button";
import { site } from "@/lib/content";

/** Spodní mobilní lišta: po hero, skrytá u Kontaktu. */
export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("uvod");
    const contact = document.getElementById("kontakt");
    if (!hero || !contact) return;

    let pastHero = false;
    let inContact = false;

    const sync = () => {
      const show = pastHero && !inContact;
      setVisible(show);
      document.documentElement.classList.toggle("mobile-cta-visible", show);
    };

    const heroObs = new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );

    const contactObs = new IntersectionObserver(
      ([entry]) => {
        inContact = entry.isIntersecting;
        sync();
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    heroObs.observe(hero);
    contactObs.observe(contact);
    return () => {
      heroObs.disconnect();
      contactObs.disconnect();
      document.documentElement.classList.remove("mobile-cta-visible");
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-cream/15 bg-forest px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-300 md:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-2 items-center gap-2">
        <BookingButton tone="dark" className="w-full" />
        <a
          href={site.phoneHref}
          className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-cream/75 bg-transparent px-3 text-[var(--text-sm)] font-semibold tracking-[0.02em] text-cream transition-colors hover:border-cream hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light"
        >
          Zavolat
        </a>
      </div>
    </div>
  );
}
