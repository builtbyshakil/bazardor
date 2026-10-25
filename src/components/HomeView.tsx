"use client";
import { banglaToday, toBnDigits } from "@/lib/bn";
import { Hero } from "./Hero";
import { useMarket } from "./MarketProvider";
import { ProductGrid } from "./ProductGrid";
import { ProductGridSkeleton } from "./Skeletons";
import { useEffect, useState } from "react";

export function HomeView() {
  const { products, loading } = useMarket();

  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(banglaToday());
  }, []);

  // Top 6 risers: biggest positive change first
  const risers = products
    .filter((p) => p.change > 0.049)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  // Top 6 fallers: biggest negative change first
  const fallers = products
    .filter((p) => p.change < -0.049)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <Hero today={today} />

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
          <span className="text-base text-[#d03739]">▲</span> আজ দাম বেড়েছে
        </h2>
        {loading ? <ProductGridSkeleton count={6} /> : <ProductGrid products={risers} />}
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
          <span className="text-base text-[#1a9951]">▼</span> আজ দাম কমেছে
        </h2>
        {loading ? <ProductGridSkeleton count={6} /> : <ProductGrid products={fallers} />}
      </section>

      {/* scroll-mt keeps the heading from hiding under the top edge after the anchor scroll */}
      <section id="সব-পণ্য" className="scroll-mt-4">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="mb-4 mt-3 text-sm">
          {loading ? "পণ্য লোড হচ্ছে…" : `মোট ${toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে`}
        </p>
        {loading ? <ProductGridSkeleton count={9} /> : <ProductGrid products={products} />}
      </section>
    </div>
  );
}
