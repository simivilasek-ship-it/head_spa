import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeader } from "@/components/SectionHeader";
import { StarRating } from "@/components/StarRating";
import { copy, site } from "@/lib/content";
import {
  formatRating,
  formatReviewDate,
  getReviewsView,
  reviewCountLabel,
} from "@/lib/reviews";

const buttonBase =
  "btn-press inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] px-6 py-3 text-[var(--text-sm)] font-semibold tracking-[0.02em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage";

function GoogleButtons() {
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
      <a
        href={site.googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBase} bg-forest text-cream hover:bg-forest-hover`}
      >
        {copy.reviews.ctaRead}
      </a>
      <a
        href={site.googleWriteReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBase} border border-forest/25 bg-transparent text-forest hover:border-forest/40 hover:bg-mist`}
      >
        {copy.reviews.ctaWrite}
      </a>
    </div>
  );
}

/**
 * Sekce Google recenzí. Data: src/data/reviews.ts.
 * Bez karet = jednoduchá verze (obrysové hvězdy + odkaz na Google).
 */
export function Reviews() {
  const view = getReviewsView();
  if (!view.enabled) return null;

  const cards = view.reviews;

  return (
    <section
      id="recenze"
      aria-labelledby="recenze-heading"
      className="section bg-ivory"
    >
      <div className="wrap">
        <Reveal>
          <SectionHeader
            id="recenze-heading"
            kicker={copy.reviews.kicker}
            title={copy.reviews.title}
            subtitle={copy.reviews.subtitle}
            center
          />
        </Reveal>

        {view.mode === "full" && view.rating !== null ? (
          <>
            <Reveal delay={80}>
              <div className="section-stack flex flex-col items-center text-center">
                <p
                  className="nums text-[clamp(3rem,9vw,4rem)] font-semibold leading-none tracking-[-0.03em] text-ink"
                  aria-hidden="true"
                >
                  {formatRating(view.rating)}
                </p>
                <StarRating
                  rating={view.rating}
                  size="h-6 w-6"
                  label={`Průměrné hodnocení ${formatRating(view.rating)} z 5`}
                  className="mt-3"
                />
                {view.count !== null ? (
                  <p className="mt-3 text-[var(--text-sm)] text-ink/70">
                    {reviewCountLabel(view.count)} na Google
                  </p>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-8 text-center text-[var(--text-xs)] font-medium uppercase tracking-[0.14em] text-ink/55 md:mt-10">
                Z Google recenzí
              </p>
              <ul
                role="list"
                aria-label="Recenze z Google"
                className={`mt-5 grid gap-5 ${
                  cards.length === 1
                    ? "mx-auto max-w-md"
                    : cards.length === 2
                      ? "md:grid-cols-2"
                      : "md:grid-cols-3"
                }`}
              >
                {cards.map((review, index) => (
                  <li key={`${review.name}-${index}`}>
                    <ReviewCard
                      name={review.name}
                      rating={review.rating}
                      text={review.text}
                      source={review.source}
                      date={formatReviewDate(review.date)}
                      url={review.url}
                    />
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10 flex justify-center md:mt-12">
                <GoogleButtons />
              </div>
            </Reveal>
          </>
        ) : (
          <Reveal delay={80}>
            <div className="section-stack mx-auto flex max-w-md flex-col items-center text-center">
              <StarRating rating={null} size="h-7 w-7" />
              <div className="mt-10 flex w-full justify-center">
                <GoogleButtons />
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
