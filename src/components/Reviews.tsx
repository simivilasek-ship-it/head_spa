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
 * Sekce Google recenzí. Data jsou v src/data/reviews.ts.
 * Bez vyplněného hodnocení nebo recenzí se zobrazí jen jednoduchá verze (hvězdy + tlačítka).
 */
export function Reviews() {
  const view = getReviewsView();

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
                <p className="mt-3 text-[var(--text-sm)] text-ink/70">
                  {view.count !== null
                    ? `${reviewCountLabel(view.count)} na Google`
                    : "Průměrné hodnocení na Google"}
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul
                role="list"
                tabIndex={0}
                aria-label="Recenze z Google"
                className="-mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage md:mx-0 md:mt-12 md:flex-wrap md:justify-center md:gap-6 md:overflow-visible md:px-0 md:pb-0"
              >
                {view.reviews.map((review, index) => (
                  <li
                    key={`${review.name}-${index}`}
                    className="flex basis-[85%] shrink-0 snap-start md:basis-[calc((100%-3rem)/3)]"
                  >
                    <ReviewCard
                      name={review.name}
                      rating={review.rating}
                      text={review.text}
                      date={formatReviewDate(review.date)}
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
              <p className="mt-5 text-[var(--text-base)] text-ink/75">
                Recenze a hvězdičky najdete na našem Google profilu.
              </p>
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
