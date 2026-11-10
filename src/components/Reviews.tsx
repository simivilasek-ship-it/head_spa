import { googleReviews } from "@/lib/content";

function reviewSummary(rating: number | null, count: number | null) {
  if (rating == null || count == null) return null;
  const ratingLabel = String(rating).replace(".", ",");
  return `${ratingLabel} ★ · ${count} recenzí`;
}

/** Recenze. Číslo se vykreslí jen z ověřených hodnot v `googleReviews`. */
export function Reviews() {
  const summary = reviewSummary(googleReviews.rating, googleReviews.count);

  return (
    <section
      id="recenze"
      aria-labelledby="recenze-heading"
      className="section reviews-section bg-cream"
    >
      <div className="wrap">
        <h2 id="recenze-heading" className="heading">
          Recenze
        </h2>
        {summary ? (
          <p className="nums mt-3 text-[var(--text-sm)] text-ink">{summary}</p>
        ) : null}
        <a
          href={googleReviews.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-11 items-center text-[var(--text-sm)] font-medium text-sage no-underline transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
        >
          Číst na Google
        </a>
      </div>
    </section>
  );
}
