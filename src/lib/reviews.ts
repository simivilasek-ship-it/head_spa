import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  REVIEWS,
  type Review,
} from "@/data/reviews";

export interface ReviewsView {
  /** Vyplněná data → souhrn + karty. Jinak jen jednoduchá verze. */
  mode: "full" | "simple";
  rating: number | null;
  /** Celkový počet recenzí na Google (null = nevyplněno). */
  count: number | null;
  reviews: Review[];
}

function isValidReview(r: Review): boolean {
  return (
    r.name.trim().length > 0 &&
    r.text.trim().length > 0 &&
    Number.isFinite(r.rating) &&
    r.rating >= 1 &&
    r.rating <= 5
  );
}

/**
 * Jediné místo, které z dat rozhoduje, co je „vyplněno“.
 * Sekci Recenze i JSON-LD čtou stejný výsledek, takže spolu vždy sedí.
 */
export function getReviewsView(): ReviewsView {
  const rating =
    GOOGLE_RATING !== null &&
    Number.isFinite(GOOGLE_RATING) &&
    GOOGLE_RATING >= 1 &&
    GOOGLE_RATING <= 5
      ? GOOGLE_RATING
      : null;
  const count =
    GOOGLE_REVIEW_COUNT !== null &&
    Number.isInteger(GOOGLE_REVIEW_COUNT) &&
    GOOGLE_REVIEW_COUNT > 0
      ? GOOGLE_REVIEW_COUNT
      : null;
  const reviews = REVIEWS.filter(isValidReview).map((r) => ({
    ...r,
    rating: Math.round(r.rating),
    name: r.name.trim(),
    text: r.text.trim(),
  }));

  if (rating === null || reviews.length === 0) {
    return { mode: "simple", rating: null, count: null, reviews: [] };
  }
  return { mode: "full", rating, count, reviews };
}

/** 4.9 → „4,9“ (čárka vždy, bez závislosti na ICU). */
export function formatRating(value: number): string {
  return (Math.round(value * 10) / 10).toFixed(1).replace(".", ",");
}

/** „1 recenze“, „3 recenze“, „27 recenzí“ */
export function reviewCountLabel(count: number): string {
  if (count === 1) return "1 recenze";
  if (count >= 2 && count <= 4) return `${count} recenze`;
  return `${count} recenzí`;
}

/** Datum jen ve formátu RRRR-MM-DD, jinak undefined (do schema.org i na web). */
export function validIsoDate(value: string | undefined): string | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  return Number.isNaN(Date.parse(value)) ? undefined : value;
}

export function formatReviewDate(value: string | undefined): string | undefined {
  const iso = validIsoDate(value);
  if (!iso) return undefined;
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}. ${m}. ${y}`;
}
