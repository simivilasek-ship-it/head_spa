/**
 * Prefixuje cesty k obrázkům o NEXT_PUBLIC_BASE_PATH (jen když je nastavený).
 * Na sarya-headspa.cz je basePath prázdný.
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
