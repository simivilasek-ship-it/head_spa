/**
 * JEDINÝ ZDROJ recenzí pro web (sekce Recenze, JSON-LD, odkazy).
 *
 * Ruční doplnění: recenze musí dodat majitelka se souhlasem autorů.
 * Nevymýšlet jména ani texty. Dokud je REVIEWS prázdné, sekce Recenze
 * (včetně položky v menu) se na webu vůbec nevykreslí.
 */

export interface Review {
  /** Text recenze doslovně. */
  text: string;
  /** Jméno tak, jak je uvedeno na Google (např. „Petra K.“). */
  name: string;
  /** Zdroj, typicky „Google“. */
  source: string;
  /** Celé číslo 1–5. */
  rating: number;
  /** Volitelný odkaz na konkrétní recenzi. */
  url?: string;
  /** Datum ve formátu ISO (RRRR-MM-DD), nepovinné. */
  date?: string;
}

/** Průměrné hodnocení z Google profilu, např. 5. null = nevyplněno. */
export const GOOGLE_RATING: number | null = null;

/** Celkový počet recenzí na Google profilu. null = nevyplněno. */
export const GOOGLE_REVIEW_COUNT: number | null = null;

/** Odkaz na všechny recenze (Google Maps → Sdílet). Prázdné = odkaz „Všechny recenze“ se nezobrazí. */
export const GOOGLE_REVIEWS_URL = "";

/** Odkaz pro napsání recenze. Prázdné = použije se GOOGLE_REVIEWS_URL, pokud je vyplněné. */
export const GOOGLE_WRITE_REVIEW_URL = "";

/**
 * Vybrané recenze k zobrazení (2–3 karty).
 *
 * Šablona (příklady — nechat zakomentované, dokud majitelka nedodá souhlas):
 * // {
 * //   name: "Petra K.",
 * //   source: "Google",
 * //   rating: 5,
 * //   text: "…doslovný text z Google…",
 * //   date: "2026-01-31",
 * //   url: "https://…",
 * // },
 * // {
 * //   name: "Jana M.",
 * //   source: "Google",
 * //   rating: 5,
 * //   text: "…doslovný text z Google…",
 * // },
 */
export const REVIEWS: Review[] = [];
