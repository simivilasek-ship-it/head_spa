import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  // absolute: šablona v layoutu by jinak přidala „| Sarya Head Spa“ podruhé
  title: { absolute: "Ochrana osobních údajů | Sarya Head Spa" },
  description: "Informace o zpracování osobních údajů v Sarya Head Spa Opava.",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="bg-cream text-ink">
        <div className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-24">
          <h1 className="heading">Ochrana osobních údajů</h1>
          {/* TODO: nechat zkontrolovat právníkem před ostrým spuštěním */}
          <div className="mt-8 space-y-5 text-[var(--text-base)] leading-8 text-ink/90">
            <p>
              Správcem osobních údajů je{" "}
              {site.operatorName || site.legalName}
              {site.ico ? `, IČO ${site.ico}` : ""}, {site.street},{" "}
              {site.postalCode} {site.city}. Kontakt:{" "}
              <a href={site.phoneHref} className="underline underline-offset-2">
                {site.phone}
              </a>
              {site.email && site.emailHref ? (
                <>
                  ,{" "}
                  <a
                    href={site.emailHref}
                    className="underline underline-offset-2"
                  >
                    {site.email}
                  </a>
                </>
              ) : null}
              .
            </p>
            <p>
              Zpracováváme údaje potřebné k rezervaci (jméno, telefon, e-mail,
              poznámky k proceduře) a komunikaci se zákazníkem.
            </p>
            <p>
              Údaje držíme jen po dobu nutnou k rezervaci a zákonným
              povinnostem. Máte právo na přístup, opravu, výmaz a stížnost u
              ÚOOÚ.
            </p>
          </div>

          <Link
            href="/"
            className="mt-10 inline-flex min-h-11 items-center text-[var(--text-sm)] text-sage transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
