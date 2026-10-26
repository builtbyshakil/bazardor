import { formatPercent } from "@/lib/bn";

export function getChangeStyle(change: number) {
  if (change > 0.049) return { arrow: "▲", color: "#d03739" };
  if (change < -0.049) return { arrow: "▼", color: "#1a9951" };
  return { arrow: "—", color: "#6b7a6e" };
}

export function PriceBadge({ change, size = "sm" }: { change: number; size?: "sm" | "md" }) {
  const { arrow, color } = getChangeStyle(change);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-[#f0f5f0] px-2 font-semibold ${
        size === "md" ? "py-1 text-sm" : "py-1 text-xs"
      }`}
      style={{ color }}
    >
      <span>{arrow}</span>
      <span>{formatPercent(change)}</span>
    </span>
  );
}
