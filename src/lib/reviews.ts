import {
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_REVIEWS_URL,
  REVIEWS,
  type Review,
} from "@/data/reviews";

export interface ReviewsView {
  /** true = sekce Recenze se má vykreslit (jsou karty). */
  enabled: boolean;
  rating: number | null;
  count: number | null;
  reviewsUrl: string;
  reviews: Review[];
}

function isValidReview(r: Review): boolean {
  return (
    r.name.trim().length > 0 &&
    r.text.trim().length > 0 &&
    r.source.trim().length > 0 &&
    Number.isFinite(r.rating) &&
    r.rating >= 1 &&
    r.rating <= 5
  );
}

/**
 * Jediné místo, které z dat rozhoduje, jestli Recenze existují.
 * Prázdné REVIEWS = sekce, menu i kotva #recenze pryč.
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
  const reviews = REVIEWS.filter(isValidReview)
    .slice(0, 3)
    .map((r) => ({
      ...r,
      rating: Math.round(r.rating),
      name: r.name.trim(),
      text: r.text.trim(),
      source: r.source.trim(),
    }));

  return {
    enabled: reviews.length > 0,
    rating,
    count,
    reviewsUrl: GOOGLE_REVIEWS_URL.trim(),
    reviews,
  };
}

/** 4.9 → „4,9“ */
export function formatRating(value: number): string {
  return (Math.round(value * 10) / 10).toFixed(1).replace(".", ",");
}

export function reviewCountLabel(count: number): string {
  if (count === 1) return "1 recenze";
  if (count >= 2 && count <= 4) return `${count} recenze`;
  return `${count} recenzí`;
}

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
