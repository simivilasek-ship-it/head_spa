import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { copy, visitSteps } from "@/lib/content";

export function Process() {
  return (
    <section
      id="postup"
      aria-labelledby="postup-heading"
      className="section bg-mist"
    >
      <div className="wrap">
        <SectionHeader
          id="postup-heading"
          kicker={copy.visit.kicker}
          title={copy.visit.title}
          center
        />
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {visitSteps.map((item, index) => (
            <li key={item.step}>
              <Reveal
                index={index}
                className="flex gap-4 md:flex-col md:items-center md:text-center"
              >
                <span className="nums flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest/25 text-[var(--text-sm)] font-medium tracking-wide text-forest">
                  {item.step}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[var(--text-base)] font-semibold tracking-[-0.01em] text-ink md:mt-4">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[var(--text-sm)] leading-6 text-ink/70 md:mx-auto md:max-w-[16rem]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
