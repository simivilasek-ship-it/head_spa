import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { copy, site } from "@/lib/content";

export function Voucher() {
  return (
    <section
      id="poukazy"
      aria-labelledby="poukazy-heading"
      className="section bg-cream"
    >
      <div className="wrap">
        <Reveal>
          <div className="card flex flex-col gap-5 border-l-[3px] border-sage px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-7">
            <div>
              <p className="kicker">{copy.voucher.kicker}</p>
              <h2 id="poukazy-heading" className="subheading mt-2 text-ink">
                {copy.voucher.title}
              </h2>
              <p className="mt-2 max-w-xl text-[var(--text-sm)] leading-6 text-ink/70">
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
