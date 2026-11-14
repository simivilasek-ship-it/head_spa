import { BookingButton } from "@/components/Button";
import { SiteImage } from "@/components/SiteImage";

export type ProcedureCardProps = {
  name: string;
  duration: string;
  price: string;
  description: string;
  image: { src: string; alt: string };
  featured?: boolean;
  /** Prázdné = fallback na stránku salonu na Notinu. */
  bookingUrl?: string;
};

export function ProcedureCard({
  name,
  duration,
  price,
  description,
  image,
  featured = false,
  bookingUrl = "",
}: ProcedureCardProps) {
  return (
    <article
      className={`card card-hover flex h-full flex-col overflow-hidden ${
        featured ? "ring-1 ring-forest/25" : ""
      }`}
    >
      <div className="relative aspect-[4/3] w-full bg-mist">
        <SiteImage
          src={image.src}
          alt={image.alt}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover"
        />
        {featured ? (
          <span className="absolute left-3 top-3 rounded-md bg-forest px-2 py-0.5 text-[0.6875rem] font-semibold tracking-[0.06em] text-cream">
            Nejčastější
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <span className="nums text-[var(--text-xs)] font-semibold tracking-wide text-sage">
          {duration}
        </span>

        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h3 className="text-[1.125rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
            {name}
          </h3>
          <p className="nums shrink-0 text-[1.125rem] font-semibold text-forest">
            {price}
          </p>
        </div>

        <p className="mt-3.5 flex-1 text-[var(--text-sm)] leading-7 text-ink/70">
          {description}
        </p>

        <div className="mt-auto pt-7">
          <BookingButton className="w-full" href={bookingUrl} />
        </div>
      </div>
    </article>
  );
}
