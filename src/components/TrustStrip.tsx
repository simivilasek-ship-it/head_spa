import { facts } from "@/lib/content";

export function TrustStrip() {
  return (
    <section
      aria-label="Základní informace"
      className="border-b border-forest/8 bg-mist"
    >
      <div className="wrap py-8 md:py-10">
        <dl className="flex flex-col gap-6 sm:flex-row sm:items-baseline sm:justify-center sm:gap-x-14 md:gap-x-20">
          {facts.map((item) => (
            <div
              key={item.value}
              className="flex flex-col gap-1 sm:items-center sm:text-center"
            >
              <dt className="order-2 text-[var(--text-xs)] font-medium uppercase tracking-[0.12em] text-sage">
                {item.label}
              </dt>
              <dd className="order-1 nums text-[clamp(1.25rem,2.8vw,1.625rem)] font-semibold leading-none tracking-[-0.02em] text-ink">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
