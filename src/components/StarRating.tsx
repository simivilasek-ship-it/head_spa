const STAR_PATH =
  "M12 2.6l2.84 5.97 6.56.86-4.8 4.55 1.2 6.5L12 17.27 6.2 20.48l1.2-6.5-4.8-4.55 6.56-.86z";

type StarState = "full" | "half" | "empty";

function StarSvg({ filled, className }: { filled: boolean; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      strokeLinejoin="round"
    >
      <path d={STAR_PATH} />
    </svg>
  );
}

function Star({ state, size }: { state: StarState; size: string }) {
  if (state === "half") {
    return (
      <span className={`relative inline-block ${size}`}>
        <StarSvg filled={false} className="absolute inset-0 h-full w-full text-forest/55" />
        <span className="absolute inset-y-0 left-0 w-1/2 overflow-hidden">
          <StarSvg filled className="h-full w-[200%] max-w-none text-forest" />
        </span>
      </span>
    );
  }
  return (
    <StarSvg
      filled={state === "full"}
      className={`${size} ${state === "full" ? "text-forest" : "text-forest/55"}`}
    />
  );
}

/** Zaokrouhlení na půl hvězdy: 4.7 → 4.5, 4.8 → 5. */
function toStates(rating: number): StarState[] {
  const halves = Math.round(rating * 2);
  return Array.from({ length: 5 }, (_, i) => {
    const remaining = halves - i * 2;
    return remaining >= 2 ? "full" : remaining === 1 ? "half" : "empty";
  });
}

interface StarRatingProps {
  /** null = žádné skóre: vykreslí se jen neutrální obrysy, bez aria-label. */
  rating: number | null;
  /** Tailwind třídy velikosti jedné hvězdy, např. "h-5 w-5". */
  size?: string;
  /** Hodnota do aria-label (např. „4,9“); výchozí z čísla. */
  label?: string;
  className?: string;
}

export function StarRating({
  rating,
  size = "h-5 w-5",
  label,
  className = "",
}: StarRatingProps) {
  const states = toStates(rating ?? 0);
  const a11y =
    rating === null
      ? { "aria-hidden": true as const }
      : { role: "img" as const, "aria-label": label ?? `Hodnocení ${rating} z 5` };

  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} {...a11y}>
      {states.map((state, i) => (
        <Star key={i} state={state} size={size} />
      ))}
    </span>
  );
}
