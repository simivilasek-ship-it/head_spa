/**
 * Static export na GitHub Pages potřebuje prefixovat cesty k obrázkům basePath.
 * (next/image + unoptimized jinak generuje `/images/...` bez `/head_spa`.)
 */
export default function imageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}
