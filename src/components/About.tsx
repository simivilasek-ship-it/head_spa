import { AboutText } from "@/components/AboutText";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteImage } from "@/components/SiteImage";
import { copy } from "@/lib/content";
import { images } from "@/lib/images";

export function About() {
  return (
    <section
      id="o-salonu"
      aria-labelledby="o-salonu-heading"
      className="section bg-forest text-cream"
    >
      <div className="wrap">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-14 lg:grid-cols-[minmax(0,22rem)_1fr]">
          {/* Desktop: foto vlevo. Mobil: menší, pod textem. */}
          <div className="order-2 md:order-1">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[17.5rem] overflow-hidden rounded-[var(--radius)] sm:max-w-[19rem] md:mx-0 md:max-w-none">
              <SiteImage
                src={images.about.src}
                alt={images.about.alt}
                sizes="(max-width: 768px) 19rem, 22rem"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <SectionHeader
              id="o-salonu-heading"
              kicker={copy.about.kicker}
              title={copy.about.title}
              dark
            />
            <p className="subheading mt-6 text-cream">{copy.about.greeting}</p>
            <AboutText paragraphs={copy.about.paragraphs} />
            <p className="mt-5 text-[var(--text-sm)] leading-6 text-cream/80">
              {copy.cosmetics.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
