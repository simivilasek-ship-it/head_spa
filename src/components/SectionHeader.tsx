type SectionHeaderProps = {
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
};

export function SectionHeader({
  id,
  kicker,
  title,
  subtitle,
  center = false,
  dark = false,
}: SectionHeaderProps) {
  return (
    <header className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`kicker ${dark ? "text-sage-light" : ""}`}>{kicker}</p>
      <h2 id={id} className={`heading mt-3 ${dark ? "text-cream" : ""}`}>
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-[var(--text-base)] leading-7 ${
            center ? "mx-auto max-w-xl" : "max-w-xl"
          } ${dark ? "text-cream/80" : "text-ink/70"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
