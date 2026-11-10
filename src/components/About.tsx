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
        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-12 lg:grid-cols-[minmax(0,22rem)_1fr]">
          {/* Desktop: foto vlevo. Mobil: pod textem. */}
          <div className="order-2 md:order-1">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[var(--radius)] md:mx-0 md:max-w-none">
              <SiteImage
                src={images.about.src}
                alt={images.about.alt}
                sizes="(max-width: 768px) 100vw, 22rem"
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
            <p className="subheading mt-5 text-cream">{copy.about.greeting}</p>
            <AboutText paragraphs={copy.about.paragraphs} />
          </div>
        </div>

        <p className="mt-10 text-[var(--text-xs)] font-medium uppercase tracking-[0.16em] text-sage-light/90">
          {copy.cosmetics.body}
        </p>
      </div>
    </section>
  );
}
