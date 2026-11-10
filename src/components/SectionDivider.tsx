type Tone = "cream" | "ivory" | "mist" | "forest";

const bg: Record<Tone, string> = {
  cream: "bg-cream",
  ivory: "bg-ivory",
  mist: "bg-mist",
  forest: "bg-forest",
};

const fill: Record<Tone, string> = {
  cream: "text-cream",
  ivory: "text-ivory",
  mist: "text-mist",
  forest: "text-forest",
};

const paths = {
  wave: "M0 40 C240 8 480 8 720 32 S1200 64 1440 24 V72 H0 Z",
  curve: "M0 48 Q720 0 1440 48 V72 H0 Z",
};

export function SectionDivider({
  from,
  to,
  variant = "wave",
  flip = false,
}: {
  from: Tone;
  to: Tone;
  variant?: "wave" | "curve";
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`relative z-[1] -my-px leading-none ${bg[from]} ${fill[to]}`}
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className={`block h-7 w-full md:h-12 ${flip ? "-scale-x-100" : ""}`}
      >
        <path d={paths[variant]} fill="currentColor" />
      </svg>
    </div>
  );
}
