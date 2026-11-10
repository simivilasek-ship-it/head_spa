import { BookingButton } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { copy, site } from "@/lib/content";

const mapQuery = encodeURIComponent(
  `${site.street}, ${site.postalCode} ${site.city}`,
);

/** Embed bez API klíče — Maps iframe nesmí být v parentu s CSS transform (Reveal). */
const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&z=16&hl=cs&output=embed`;

export function Contact() {
  const cards = [
    { label: "Telefon", value: site.phone, href: site.phoneHref },
    { label: "Instagram", value: site.instagram, href: site.instagramUrl },
    {
      label: "Adresa",
      value: `${site.street}, ${site.city}`,
      href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    },
  ];

  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-heading"
      className="section bg-mist"
    >
      <div className="wrap">
        <Reveal>
          <SectionHeader
            id="kontakt-heading"
            kicker={copy.contact.kicker}
            title={copy.contact.title}
            subtitle={copy.contact.body}
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8 lg:items-stretch">
          <Reveal className="flex flex-col gap-2.5">
            {cards.map((card) => (
              <a
                key={card.label}
                href={card.href}
                {...(card.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="card block px-5 py-4 transition-colors hover:border-forest/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
              >
                <span className="kicker block text-forest/80">{card.label}</span>
                <span className="nums mt-2 block text-[var(--text-base)] font-semibold tracking-[-0.01em] text-ink underline decoration-forest/25 underline-offset-4">
                  {card.value}
                </span>
              </a>
            ))}
            {site.openingHours.label ? (
              <div className="card px-5 py-4">
                <span className="kicker block text-forest/80">
                  Otevírací doba
                </span>
                <span className="mt-2 block font-semibold tracking-[-0.01em] text-ink">
                  {site.openingHours.label}
                </span>
              </div>
            ) : null}
            <BookingButton className="mt-3 self-start" />
          </Reveal>

          <div className="card overflow-hidden">
            <iframe
              title={`Mapa: ${site.street}, ${site.city}`}
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-64 w-full border-0 grayscale-[0.25] contrast-[1.05] md:h-full md:min-h-[22rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
