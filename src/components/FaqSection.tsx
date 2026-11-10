import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section bg-ivory"
    >
      <div className="wrap max-w-3xl">
        <Reveal>
          <Faq />
        </Reveal>
      </div>
    </section>
  );
}
