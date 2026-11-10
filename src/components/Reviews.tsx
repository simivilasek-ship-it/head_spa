import { SectionHeader } from "@/components/SectionHeader";
import { copy, reviews } from "@/lib/content";

export function Reviews() {
  return (
    <section
      id="recenze"
      aria-labelledby="recenze-heading"
      className="section bg-ivory"
    >
      <div className="wrap">
        <SectionHeader
          id="recenze-heading"
          kicker={copy.reviews.kicker}
          title={copy.reviews.title}
          subtitle={copy.reviews.subtitle}
          center
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {reviews.map((item, index) => (
            <li key={`review-${index}`} className="card px-5 py-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold tracking-[-0.01em] text-ink">
                  {item.name}
                </p>
                <p
                  className="nums text-[var(--text-sm)] tracking-[0.08em] text-forest"
                  aria-label={`${item.rating} z 5 hvězdiček`}
                >
                  {"★".repeat(item.rating)}
                  <span className="text-forest/25" aria-hidden>
                    {"★".repeat(5 - item.rating)}
                  </span>
                </p>
              </div>
              <p className="mt-3 text-[var(--text-sm)] leading-6 text-ink/75">
                {item.text}
              </p>
              {/* TODO: nahradit zástupný text reálnou recenzí od klientky/klienta */}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
