import { ProcedureCard } from "@/components/ProcedureCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { copy, procedures } from "@/lib/content";

export function Procedures() {
  return (
    <section
      id="procedury"
      aria-labelledby="procedury-heading"
      className="section bg-ivory"
    >
      <div className="wrap">
        <SectionHeader
          id="procedury-heading"
          kicker={copy.procedures.kicker}
          title={copy.procedures.title}
          subtitle={copy.procedures.subtitle}
          center
        />

        <ul className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-6">
          {procedures.map((item, index) => (
            <li key={item.name} className="h-full">
              <Reveal index={index} className="h-full">
                <ProcedureCard
                  name={item.name}
                  duration={item.duration}
                  price={item.price}
                  description={item.description}
                  featured={item.name === "Sarya Basic"}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
