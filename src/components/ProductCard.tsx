import Link from "next/link";
import { formatTaka, unitLabel } from "@/lib/bn";
import type { Product } from "@/lib/types";
import { PriceBadge } from "./PriceChange";

// One product card. Clicking it opens the product details page.
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(product.slug)}`}
      className="block rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4 transition hover:-translate-y-0.5 hover:border-[#05893e] hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
          {product.emoji}
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold">{product.name}</p>
          <p className="text-xs">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-xs">আজকের দাম</p>
          <p className="text-xl font-bold">{formatTaka(product.price)}</p>
        </div>
        <PriceBadge change={product.change} />
      </div>
    </Link>
  );
}
