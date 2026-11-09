import { BookingButton } from "@/components/Button";
import { SiteImage } from "@/components/SiteImage";
import { copy, facts } from "@/lib/content";
import { images } from "@/lib/images";

export function Hero() {
  return (
    <section
      id="uvod"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-forest md:min-h-screen"
    >
      <SiteImage
        src={images.hero.src}
        alt={images.hero.alt}
        priority
        sizes="100vw"
        quality={100}
        className="hero-photo object-cover object-[center_55%]"
      />
      <div className="hero-overlay absolute inset-0" aria-hidden />
      <div className="hero-text-scrim absolute inset-0" aria-hidden />

      <div className="relative z-10 wrap max-w-3xl pb-28 pt-28 md:pb-24 md:pt-32">
        <p className="kicker inline-flex w-fit text-cream">
          {copy.hero.kicker}
        </p>
        <h1
          id="hero-heading"
          className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.35rem,6.2vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-cream drop-shadow-[0_1px_12px_rgba(20,28,24,0.35)]"
        >
          {copy.hero.title}
        </h1>
        <p className="mt-5 max-w-lg text-[var(--text-sm)] leading-7 text-cream/95 md:text-[1.125rem] md:leading-8">
          {copy.hero.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
          {/* primární CTA = krémové (stejné jako v hlavičce nad fotkou) */}
          <BookingButton tone="dark" className="px-7 py-3.5" />
          <a
            href="#procedury"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] border border-cream/60 bg-transparent px-7 py-3.5 text-[var(--text-sm)] font-semibold tracking-[0.02em] text-cream no-underline transition-colors hover:border-cream hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light"
          >
            {copy.hero.ctaSecondary} →
          </a>
        </div>

        <ul
          aria-label="Základní informace"
          className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8"
        >
          {facts.map((item) => (
            <li
              key={item.value}
              className="flex items-center gap-2.5 text-[var(--text-sm)] font-medium text-cream"
            >
              <span
                aria-hidden
                className="flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full border border-cream/70 text-[9px] leading-none text-cream"
              >
                ✓
              </span>
              <span className="nums leading-none tracking-[0.01em]">
                {item.value}
                <span className="text-cream/75"> · {item.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
