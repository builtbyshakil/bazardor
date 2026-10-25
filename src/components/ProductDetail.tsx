"use client";
import Link from "next/link";
import { formatBnNumber, formatTaka, shortUnit, unitLabel } from "@/lib/bn";
import { useMarket } from "./MarketProvider";
import { NotFoundView } from "./NotFoundView";
import { getChangeStyle, PriceBadge } from "./PriceChange";
import { DetailSkeleton } from "./Skeletons";

// the URL part can be the product's slug or its id
export function ProductDetail({ slug }: { slug: string }) {
  const { products, loading } = useMarket();

  if (loading) return <DetailSkeleton />;

  const product = products.find((p) => p.slug === slug || p.id === slug);
  if (!product) {
    return <NotFoundView title="পণ্যটি খুঁজে পাওয়া যায়নি" message="এই নামে কোনো পণ্য আমাদের তালিকায় নেই।" />;
  }

  const { color } = getChangeStyle(product.change);
  const diff = product.previousPrice !== null ? Math.abs(product.price - product.previousPrice) : null;
  // market summary line, e.g. "গতকালের তুলনায় আজ দাম বেড়েছে · ২ টাকা"
  const summary =
    product.description ||
    (product.change > 0.049
      ? `গতকালের তুলনায় আজ দাম বেড়েছে${diff ? ` · ${formatTaka(Math.round(diff * 10) / 10)}` : ""}`
      : product.change < -0.049
        ? `গতকালের তুলনায় আজ দাম কমেছে${diff ? ` · ${formatTaka(Math.round(diff * 10) / 10)}` : ""}`
        : "গতকালের তুলনায় আজ দামে কোনো পরিবর্তন নেই");

  return (
    <div className="space-y-6">
      {/* breadcrumb: হোম › চাল › পণ্যের নাম */}
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/" className="hover:text-[#05893e]">
          হোম
        </Link>
        <span>›</span>
        <Link href={`/category/${encodeURIComponent(product.categorySlug)}`} className="hover:text-[#05893e]">
          {product.categoryName}
        </Link>
        <span>›</span>
        <span className="font-medium">{product.name}</span>
      </nav>

      {/* Top summary card */}
      <section className="flex flex-col gap-5 rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl">
            {product.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>
            <p className="mt-1 text-sm">
              {unitLabel(product.unit)} · {product.categoryName}
            </p>
            <p className="mt-2 text-sm">{summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#05893e]/10 px-3 py-1 text-xs font-medium text-[#05893e]">
                {product.categoryName}
              </span>
              <span className="rounded-full bg-[#f0f5f0] px-3 py-1 text-xs font-medium">{unitLabel(product.unit)}</span>
            </div>
          </div>
        </div>

        <div className="sm:text-right">
          <p className="text-sm">আজকের দাম</p>
          <p className="text-3xl font-bold" style={{ color }}>
            {formatBnNumber(product.price)}
          </p>
          <p className="text-sm">টাকা / {shortUnit(product.unit)}</p>
          <div className="mt-2">
            <PriceBadge change={product.change} size="md" />
          </div>
        </div>
      </section>

      {/* Price summary: min / max / average */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <SummaryCard label="সর্বনিম্ন দাম" value={product.min} color="#1a9951" note="সবচেয়ে কম দামের বাজার" />
          <SummaryCard label="সর্বাধিক দাম" value={product.max} color="#d03739" note="সবচেয়ে বেশি দামের বাজার" />
          <SummaryCard label="গড় দাম" value={product.avg} color="#05893e" note={`${unitLabel(product.unit)}-এর হিসাবে`} />
        </div>
      </section>

      {/* Market wise price table */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
        {product.markets.length === 0 ? (
          <p className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6 text-center text-sm">
            এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যায়নি।
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#e1e8e1] bg-[#fafcfa]">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-[#e1e8e1] text-left font-bold">
                  <th className="px-4 py-3">বাজার</th>
                  <th className="px-4 py-3">বিভাগ</th>
                  <th className="px-4 py-3 text-right">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market, i) => (
                  <tr key={`${market.name}-${i}`} className="border-b border-[#f0f5f0] last:border-0">
                    <td className="px-4 py-3 font-medium">{market.name}</td>
                    <td className="px-4 py-3">{market.division}</td>
                    <td className="px-4 py-3 text-right">{formatTaka(market.min)}</td>
                    <td className="px-4 py-3 text-right">{formatTaka(market.max)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatTaka(market.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryCard({ label, value, color, note }: { label: string; value: number; color: string; note: string }) {
  return (
    <div className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-5">
      <p className="text-xs">{label}</p>
      <p className="mt-1 text-2xl font-bold" style={{ color }}>
        {formatTaka(value)}
      </p>
      <p className="mt-1 text-xs">{note}</p>
    </div>
  );
}
