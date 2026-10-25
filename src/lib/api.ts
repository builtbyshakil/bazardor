// Talks to the BazarDor API. We try each base URL in order until one works.
// If all of them fail, we use the backup data so the site never shows a blank page.
import { FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from "./fallback-data";
import { normalizeCategory, normalizeProduct, unwrapList } from "./normalize";
import type { Category, Product } from "./types";

const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchJson(path: string): Promise<unknown | null> {
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`);
      if (!res.ok) continue;
      return await res.json();
    } catch {
      // try the next base URL
    }
  }
  return null;
}

export type MarketData = {
  products: Product[];
  categories: Category[];
  usingFallback: boolean;
};

export async function loadMarketData(): Promise<MarketData> {
  const [categoryJson, productJson] = await Promise.all([fetchJson("/categories"), fetchJson("/products")]);

  const categories = unwrapList(categoryJson, ["categories"]).map(normalizeCategory);
  const rawProducts = unwrapList(productJson, ["products"]);

  if (rawProducts.length === 0) {
    console.warn("[BazarDor] API not reachable - showing backup data.");
    return { products: FALLBACK_PRODUCTS, categories: FALLBACK_CATEGORIES, usingFallback: true };
  }

  const usableCategories = categories.length ? categories : FALLBACK_CATEGORIES;
  const products = rawProducts
    .map((raw) => normalizeProduct(raw, usableCategories))
    .filter((p) => p.id !== "" && p.name !== "");

  return { products, categories: usableCategories, usingFallback: false };
}
