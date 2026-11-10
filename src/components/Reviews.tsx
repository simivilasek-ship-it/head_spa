import { SectionHeader } from "@/components/SectionHeader";
import { copy, site } from "@/lib/content";

function parseRating(value: string) {
  const n = Number(value.replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.min(5, Math.max(0, n));
}

function reviewCountLabel(count: number) {
  if (count === 1) return "1 recenze";
  if (count >= 2 && count <= 4) return `${count} recenze`;
  return `${count} recenzí`;
}

function StarRow({ rating }: { rating: number }) {
  const filled = Math.round(rating);

  return (
    <p
      className="nums flex items-center justify-center gap-1 text-[1.75rem] leading-none tracking-[0.12em] text-forest"
      aria-label={`${rating.toLocaleString("cs-CZ", { maximumFractionDigits: 1 })} z 5 hvězdiček`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <span
          key={index}
          aria-hidden
          className={index < filled ? "text-forest" : "text-forest/20"}
        >
          ★
        </span>
      ))}
    </p>
  );
}

/** Shrnutí Google recenzí. Bez ověřeného skóre se nevykreslí číslo ani plné hvězdy. */
export function Reviews() {
  const rating = parseRating(site.googleRating);
  const count = site.googleReviewCount.replace(/\D/g, "");
  const href = site.googleReviewsUrl;

  return (
    <section
      id="recenze"
      aria-labelledby="recenze-heading"
      className="section reviews-section bg-ivory"
    >
      <div className="wrap">
        <SectionHeader
          id="recenze-heading"
          kicker={copy.reviews.kicker}
          title={copy.reviews.title}
          subtitle={copy.reviews.subtitle}
          center
        />

        <div className="mx-auto mt-8 flex max-w-md flex-col items-center text-center md:mt-10">
          {rating !== null ? (
            <>
              <StarRow rating={rating} />
              <p className="nums mt-4 text-[clamp(2.5rem,8vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-ink">
                {rating.toLocaleString("cs-CZ", {
                  minimumFractionDigits: rating % 1 === 0 ? 0 : 1,
                  maximumFractionDigits: 1,
                })}
              </p>
              <p className="mt-3 text-[var(--text-sm)] text-ink/70">
                {count
                  ? `na základě ${reviewCountLabel(Number(count))} na Google`
                  : "průměrné hodnocení na Google"}
              </p>
            </>
          ) : (
            <p className="text-[var(--text-base)] text-ink/75">
              Recenze a hvězdičky najdete na našem Google profilu.
            </p>
          )}

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] bg-forest px-6 py-3 text-[var(--text-sm)] font-semibold tracking-[0.02em] text-cream transition-colors hover:bg-forest-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              {copy.reviews.ctaRead}
            </a>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius)] border border-forest/25 bg-transparent px-6 py-3 text-[var(--text-sm)] font-semibold tracking-[0.02em] text-forest transition-colors hover:border-forest/40 hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              {copy.reviews.ctaWrite}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
