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
      <div className="hero-media absolute inset-0">
        <SiteImage
          src={images.hero.src}
          alt={images.hero.alt}
          priority
          sizes="100vw"
          quality={100}
          className="hero-photo object-cover object-[center_55%]"
        />
      </div>
      <div className="hero-overlay absolute inset-0" aria-hidden />
      <div className="hero-text-scrim absolute inset-0" aria-hidden />

      <div className="relative z-10 wrap max-w-3xl pb-28 pt-28 md:pb-24 md:pt-32">
        <p className="hero-enter hero-enter-1 kicker inline-flex w-fit text-cream">
          {copy.hero.kicker}
        </p>
        <h1
          id="hero-heading"
          className="hero-enter hero-enter-2 mt-4 font-[family-name:var(--font-display)] text-[clamp(2.35rem,6.2vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-cream drop-shadow-[0_1px_12px_rgba(20,28,24,0.35)]"
        >
          {copy.hero.title}
        </h1>
        <p className="hero-enter hero-enter-3 hero-subtitle mt-5 max-w-lg text-[var(--text-sm)] leading-7 text-cream/95 md:text-[1.125rem] md:leading-8">
          {copy.hero.subtitle}
        </p>
        <div className="hero-enter hero-enter-4 mt-8 flex flex-wrap items-center gap-3 md:gap-4">
          <BookingButton tone="dark" className="px-7 py-3.5" />
          <a
            href="#procedury"
            className="btn-press inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] border border-cream/60 bg-transparent px-7 py-3.5 text-[var(--text-sm)] font-semibold tracking-[0.02em] text-cream no-underline transition-colors hover:border-cream hover:bg-cream/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light"
          >
            {copy.hero.ctaSecondary} →
          </a>
        </div>

        <ul
          aria-label="Základní informace"
          className="hero-enter hero-enter-5 mt-10 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8"
        >
          {facts.map((item) => (
            <li
              key={item.value}
              className="flex items-center gap-2.5 text-[var(--text-sm)] font-medium text-cream drop-shadow-[0_1px_8px_rgba(20,28,24,0.55)]"
            >
              <span
                aria-hidden
                className="flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-full border border-cream/85 text-[9px] leading-none text-cream"
              >
                ✓
              </span>
              <span className="nums leading-none tracking-[0.01em]">
                {item.value}
                <span className="text-cream/90"> · {item.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#procedury"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/75 transition-colors duration-300 hover:text-cream"
        aria-label="Přejít na procedury"
      >
        <span className="block h-8 w-5 rounded-full border border-current p-1">
          <span className="scroll-cue-dot mx-auto block h-1.5 w-1 rounded-full bg-current" />
        </span>
      </a>
    </section>
  );
}
