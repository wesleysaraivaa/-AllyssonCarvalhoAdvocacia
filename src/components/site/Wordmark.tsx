import { Link } from "@tanstack/react-router";

export function Wordmark({
  size = "sm",
  className = "",
  light = false,
}: {
  size?: "sm" | "lg";
  className?: string;
  light?: boolean;
}) {
  const inkClass = light ? "text-paper" : "text-ink";
  const mutedClass = light ? "text-paper/60" : "text-ink-muted";

  return (
    <Link to="/" className={`inline-block leading-none ${className}`} aria-label="Allysson Carvalho Advocacia — início">
      <span
        className={`font-display block ${inkClass}`}
        style={{
          fontSize: size === "lg" ? "clamp(1.9rem,3.2vw,2.7rem)" : "1.25rem",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        Allysson Carvalho
      </span>
      <span
        className={`block font-mono uppercase ${mutedClass}`}
        style={{
          fontSize: size === "lg" ? "10px" : "8.5px",
          letterSpacing: "0.28em",
          marginTop: size === "lg" ? "0.55rem" : "0.35rem",
        }}
      >
        Advocacia
      </span>
    </Link>
  );
}
