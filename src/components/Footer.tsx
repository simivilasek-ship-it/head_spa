import Link from "next/link";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/content";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      width={18}
      height={18}
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest pb-12 pt-14 text-[var(--text-sm)] text-cream/75 md:pb-14 md:pt-16">
      <div className="wrap">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <Logo size={56} showWordmark tone="light" />
            <div className="nums space-y-1.5">
              <p className="font-semibold tracking-[-0.01em] text-cream">
                {site.legalName}
              </p>
              {site.operatorName ? (
                <p>{site.operatorName}</p>
              ) : null}
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
              {site.email && site.emailHref ? (
                <p>
                  <a
                    href={site.emailHref}
                    className="transition-colors hover:text-cream"
                  >
                    {site.email}
                  </a>
                </p>
              ) : null}
              {site.ico ? <p>IČO: {site.ico}</p> : null}
              <p>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light"
                >
                  <InstagramIcon />
                  <span>{site.instagram}</span>
                </a>
              </p>
            </div>
          </div>
          <Link
            href="/ochrana-osobnich-udaju"
            className="text-sage-light transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light"
          >
            Ochrana osobních údajů
          </Link>
        </div>

        <p className="mt-12 border-t border-cream/12 pt-7 text-[var(--text-xs)] tracking-[0.02em]">
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
