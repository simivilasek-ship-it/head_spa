import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-forest pb-24 pt-12 text-[var(--text-sm)] text-cream/75 md:pb-12">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Logo size={56} showWordmark tone="light" />
            <div className="nums space-y-1.5">
              <p className="font-semibold tracking-[-0.01em] text-cream">
                {site.legalName}
              </p>
              <p>
                {site.street}, {site.postalCode} {site.city}
              </p>
              <p>
                <a
                  href={site.phoneHref}
                  className="transition-colors hover:text-cream"
                >
                  {site.phone}
                </a>
              </p>
              {site.ico ? <p>IČO: {site.ico}</p> : null}
            </div>
          </div>
          <Link
            href="/ochrana-osobnich-udaju"
            className="text-sage-light transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light"
          >
            Ochrana osobních údajů
          </Link>
        </div>

        <p className="mt-10 border-t border-cream/12 pt-6 text-[var(--text-xs)] tracking-[0.02em]">
          © 2026 {site.legalName} · Web vytvořil{" "}
          <a
            href="https://simivilasek.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage-light transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light"
          >
            Simon Vilášek
          </a>
        </p>
      </div>
    </footer>
  );
}
