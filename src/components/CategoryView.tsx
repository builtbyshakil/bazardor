"use client";
import { useMemo, useState } from "react";
import { toBnDigits } from "@/lib/bn";
import { useMarket } from "./MarketProvider";
import { NotFoundView } from "./NotFoundView";
import { ProductGrid } from "./ProductGrid";
import { ProductGridSkeleton } from "./Skeletons";
import { SortSelect, type SortOption } from "./SortSelect";

export function CategoryView({ slug }: { slug: string }) {
  const { products, categories, loading } = useMarket();
  const [sort, setSort] = useState<SortOption>("default");

  const category = categories.find((c) => c.slug === slug);
  const inCategory = useMemo(() => products.filter((p) => p.categorySlug === slug), [products, slug]);

  // Sorting works on the real number (p.price), NOT on the Bengali text like "১৪৮ টাকা".
  const sorted = useMemo(() => {
    const list = [...inCategory];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [inCategory, sort]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="skeleton h-12 w-12 rounded-xl" />
          <div className="space-y-2">
            <div className="skeleton h-6 w-32" />
            <div className="skeleton h-4 w-48" />
          </div>
        </div>
        <ProductGridSkeleton count={6} />
      </div>
    );
  }

  // invalid slug, or a category with no products
  if (!category || inCategory.length === 0) {
    return (
      <NotFoundView
        title="এই বিভাগে কোনো পণ্য পাওয়া যায়নি"
        message="বিভাগটি হয়তো নেই, অথবা এখানে এখনো কোনো পণ্য যোগ করা হয়নি।"
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{category.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold">{category.name}</h1>
            <p className="text-sm">{toBnDigits(inCategory.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
          </div>
        </div>
        <SortSelect value={sort} onChange={setSort} />
      </div>

      <p className="text-sm">মোট {toBnDigits(sorted.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={sorted} />
    </div>
  );
}
