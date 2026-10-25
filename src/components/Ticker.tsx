"use client";
import { formatBnNumber, shortUnit } from "@/lib/bn";
import { getChangeStyle } from "./PriceChange";
import { formatPercent } from "@/lib/bn";
import { useMarket } from "./MarketProvider";

// Infinite scrolling price strip under the navbar
export function Ticker() {
  const { products, loading } = useMarket();

  if (loading) {
    return (
      <div className="border-b border-[#e1e8e1] bg-[#fafcfa]">
        <div className="skeleton h-9 w-full rounded-none" />
      </div>
    );
  }

  const items = products.map((p) => {
    const { arrow, color } = getChangeStyle(p.change);
    return (
      <div
        key={p.id}
        className="flex shrink-0 items-center gap-1.5 border-r border-[#f0f5f0] px-4 py-2 text-sm"
      >
        <span>{p.emoji}</span>
        <span className="font-medium">{p.name}</span>
        <span>
          {formatBnNumber(p.price)} টাকা/{shortUnit(p.unit)}
        </span>
        <span className="font-semibold" style={{ color }}>
          {arrow} {formatPercent(p.change)}
        </span>
      </div>
    );
  });

  return (
    <div className="overflow-hidden border-b border-[#e1e8e1] bg-[#fafcfa]" aria-label="আজকের দামের তালিকা">
      <div className="ticker-track">
        {/* the same list twice, so the loop has no gap */}
        <div className="flex">{items}</div>
        <div className="flex" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}
