import Image, { type ImageProps } from "next/image";

type SiteImageProps = Omit<ImageProps, "alt" | "fill"> & {
  alt: string;
};

/** Fotka vyplňující nejbližšího předka s `position: relative`. */
export function SiteImage({
  alt,
  priority,
  loading,
  sizes,
  quality,
  className = "",
  ...props
}: SiteImageProps) {
  return (
    <Image
      alt={alt}
      fill
      priority={priority}
      loading={priority ? undefined : (loading ?? "lazy")}
      fetchPriority={priority ? "high" : undefined}
      sizes={sizes}
      quality={quality ?? (priority ? 80 : 75)}
      className={`object-cover ${className}`.trim()}
      {...props}
    />
  );
}
