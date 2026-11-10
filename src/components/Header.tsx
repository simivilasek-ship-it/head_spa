"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BookingButton } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/content";

function hrefFor(linkHref: string, onHome: boolean) {
  return onHome ? linkHref : `/${linkHref}`;
}

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const solid = scrolled || open || !onHome;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
          solid
            ? "border-b border-forest/8 bg-cream text-ink shadow-[0_8px_24px_rgba(52,68,58,0.07)]"
            : "bg-transparent text-cream shadow-none"
        }`}
      >
        <nav
          aria-label="Hlavní navigace"
          className="wrap flex h-[var(--header-h)] items-center justify-between gap-4"
        >
          <a
            href={onHome ? "#uvod" : "/"}
            className="shrink-0"
            aria-label={site.name}
            onClick={close}
          >
            <Logo size={64} showWordmark tone={solid ? "dark" : "light"} />
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={hrefFor(item.href, onHome)}
                  className="text-[var(--text-sm)] font-medium tracking-[0.01em] opacity-85 transition hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              {/* nad fotkou i po scrollu stejné krémové CTA jako v hero */}
              <BookingButton
                tone="dark"
                className={
                  solid
                    ? "ring-1 ring-forest/20 shadow-sm shadow-forest/10"
                    : undefined
                }
              />
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-current/30 md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <HamburgerIcon open={open} />
            </button>
          </div>
        </nav>

        <div
          ref={menuRef}
          id={menuId}
          className={`border-t border-sage/15 bg-cream md:hidden ${open ? "block" : "hidden"}`}
          role={open ? "dialog" : undefined}
          aria-modal={open ? true : undefined}
          aria-label={open ? "Mobilní menu" : undefined}
        >
          <ul className="wrap flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={hrefFor(item.href, onHome)}
                  className="block rounded-lg px-3 py-3 text-[var(--text-base)] font-medium text-ink hover:bg-mist"
                  onClick={close}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <BookingButton className="w-full" tone="light" onClick={close} />
            </li>
            <li className="pt-1">
              <a
                href={site.phoneHref}
                className="flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-forest/20 px-4 py-3 text-[var(--text-sm)] font-semibold text-forest transition-colors hover:bg-mist"
                onClick={close}
              >
                Zavolat {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </header>

    </>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden>
      <span
        className={`absolute left-0 top-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
          open ? "translate-y-[6px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[6px] block h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[12px] block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
          open ? "-translate-y-[6px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}
