import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

// Responsive grid: 1 column on phones, 2 on tablets, 3 on desktop
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
