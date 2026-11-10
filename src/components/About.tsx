import { AboutText } from "@/components/AboutText";
import { Reveal } from "@/components/Reveal";
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
          <Reveal>
            <div className="relative aspect-[2/1] overflow-hidden rounded-[var(--radius)] md:aspect-[3/4]">
              <SiteImage
                src={images.about.src}
                alt={images.about.alt}
                sizes="(max-width: 768px) 100vw, 22rem"
              />
            </div>
          </Reveal>

          <div>
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
