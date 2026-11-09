import Image from "next/image";
import { site } from "@/lib/content";

type LogoProps = {
  size?: number;
  className?: string;
  /** horizontální wordmark (ikona + SARYA HEAD SPA); jinak kruhové logo */
  showWordmark?: boolean;
  tone?: "light" | "dark";
};

const WORDMARK_ASPECT = 1024 / 375;

export function Logo({
  size = 56,
  className = "",
  showWordmark = false,
  tone = "dark",
}: LogoProps) {
  if (showWordmark) {
    const src =
      tone === "light"
        ? "/logo-wordmark-sm-v3.png"
        : "/logo-wordmark-dark-sm-v3.png";
    const height = size;
    const width = Math.round(height * WORDMARK_ASPECT);

    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src={src}
          alt={site.name}
          width={width}
          height={height}
          className="h-[var(--logo-h,2.75rem)] w-auto"
          priority
        />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt={site.name}
        width={size}
        height={size}
        className="rounded-full"
        priority
      />
    </span>
  );
}
