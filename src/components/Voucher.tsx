import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { copy, site } from "@/lib/content";

export function Voucher() {
  return (
    <section
      id="poukazy"
      aria-labelledby="poukazy-heading"
      className="section section-tight bg-cream"
    >
      <div className="wrap">
        <Reveal>
          <div className="card flex flex-col gap-6 border-l-[3px] border-sage px-6 py-7 md:flex-row md:items-center md:justify-between md:px-8 md:py-9">
            <div>
              <p className="kicker">{copy.voucher.kicker}</p>
              <h2 id="poukazy-heading" className="subheading mt-3 text-ink">
                {copy.voucher.title}
              </h2>
              <p className="mt-3 max-w-xl text-[var(--text-sm)] leading-7 text-ink/70">
                {copy.voucher.body}
              </p>
            </div>
            <Button
              href={site.phoneHref}
              className="shrink-0 self-start md:self-auto"
            >
              {copy.voucher.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
