/**
 * JEDINÝ ZDROJ Google recenzí pro web (sekce Recenze, JSON-LD, odkazy).
 * Env proměnné NEXT_PUBLIC_GOOGLE_* se už nepoužívají.
 *
 * TODO: doplnit reálné údaje z Google profilu.
 * Nevymýšlet jména ani texty. Dokud je REVIEWS prázdné nebo GOOGLE_RATING null,
 * zobrazí se jen jednoduchá verze (hvězdy + tlačítka) a do JSON-LD se nic nepřidá.
 */

export interface Review {
  /** Jméno tak, jak je uvedeno na Google. */
  name: string;
  /** Celé číslo 1–5. */
  rating: number;
  /** Text recenze doslovně. */
  text: string;
  /** Datum ve formátu ISO (RRRR-MM-DD), nepovinné. */
  date?: string;
}

/** Průměrné hodnocení z Google profilu, např. 4.9. null = nevyplněno. */
export const GOOGLE_RATING: number | null = null; // TODO: doplnit reálné údaje z Google profilu

/** Celkový počet recenzí na Google profilu. null = nevyplněno. */
export const GOOGLE_REVIEW_COUNT: number | null = null; // TODO: doplnit reálné údaje z Google profilu

/** Odkaz na všechny recenze (Google Maps → Sdílet). Prázdné = záložní odkaz na vyhledání profilu. */
export const GOOGLE_REVIEWS_URL = ""; // TODO: doplnit reálné údaje z Google profilu

/** Odkaz pro napsání recenze (Google Business → „Získat další recenze“). Prázdné = použije se GOOGLE_REVIEWS_URL. */
export const GOOGLE_WRITE_REVIEW_URL = ""; // TODO: doplnit reálné údaje z Google profilu

/** Vybrané recenze k zobrazení. Každou vložit doslovně z Google. */
export const REVIEWS: Review[] = [
  // TODO: doplnit reálné údaje z Google profilu
  // { name: "…", rating: 5, text: "…", date: "2026-01-31" },
];
