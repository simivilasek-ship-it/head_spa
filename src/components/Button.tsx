import Link from "next/link";
import type { ReactNode } from "react";
import { bookingIsExternal, copy, site } from "@/lib/content";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

const tones = {
  light: "bg-forest text-cream hover:bg-forest-hover",
  dark: "bg-cream text-forest hover:bg-mist",
} as const;

type Tone = keyof typeof tones;

export function Button({
  href,
  children,
  className = "",
  external = false,
  onClick,
  tone = "light",
}: ButtonProps & {
  tone?: Tone;
}) {
  const classes = `btn-press inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] px-6 py-3 text-[var(--text-sm)] font-semibold tracking-[0.02em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${tones[tone]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

export function BookingButton({
  tone = "light",
  className = "",
  onClick,
}: {
  tone?: Tone;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      href={site.bookingUrl}
      external={bookingIsExternal}
      tone={tone}
      className={className}
      onClick={onClick}
    >
      {copy.hero.ctaPrimary}
    </Button>
  );
}

export function TextLink({
  href,
  children,
  className = "",
  external = false,
}: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center text-[var(--text-sm)] font-medium text-sage no-underline transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
