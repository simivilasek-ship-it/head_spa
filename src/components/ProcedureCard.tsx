import { BookingButton } from "@/components/Button";

export type ProcedureCardProps = {
  name: string;
  duration: string;
  price: string;
  description: string;
  featured?: boolean;
};

export function ProcedureCard({
  name,
  duration,
  price,
  description,
  featured = false,
}: ProcedureCardProps) {
  return (
    <article
      className={`card card-hover flex h-full flex-col p-5 md:p-6 ${
        featured ? "ring-1 ring-forest/25" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="nums text-[var(--text-xs)] font-semibold tracking-wide text-sage">
          {duration}
        </span>
        {featured ? (
          <span className="rounded-md bg-forest px-2 py-0.5 text-[0.6875rem] font-semibold tracking-[0.06em] text-cream">
            Nejoblíbenější
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="text-[1.125rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
          {name}
        </h3>
        <p className="nums shrink-0 text-[1.125rem] font-semibold text-forest">
          {price}
        </p>
      </div>

      <p className="mt-3 flex-1 text-[var(--text-sm)] leading-6 text-ink/70">
        {description}
      </p>

      <div className="mt-auto pt-6">
        <BookingButton className="w-full" />
      </div>
    </article>
  );
}
