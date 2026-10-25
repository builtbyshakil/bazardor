"use client";
// Fetches products + categories ONE time and shares them with every page
// (navbar, ticker, home, category, product details) through React context.
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loadMarketData } from "@/lib/api";
import { FALLBACK_CATEGORIES } from "@/lib/fallback-data";
import type { Category, Product } from "@/lib/types";

type MarketState = {
  products: Product[];
  categories: Category[];
  loading: boolean;
};

const MarketContext = createContext<MarketState>({
  products: [],
  categories: FALLBACK_CATEGORIES,
  loading: true,
});

export function MarketProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MarketState>({
    products: [],
    categories: FALLBACK_CATEGORIES, // so the navbar is never empty while loading
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    loadMarketData().then((data) => {
      if (!cancelled) {
        setState({ products: data.products, categories: data.categories, loading: false });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return <MarketContext.Provider value={state}>{children}</MarketContext.Provider>;
}

export const useMarket = () => useContext(MarketContext);
