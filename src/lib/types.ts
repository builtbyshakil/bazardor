export type Market = {
  name: string;
  division: string;
  min: number;
  max: number;
  avg: number;
};

export type Category = {
  slug: string;
  name: string;
  emoji: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  unit: string;
  categorySlug: string;
  categoryName: string;
  price: number;
  previousPrice: number | null;
  change: number;
  description: string;
  min: number;
  max: number;
  avg: number;
  markets: Market[];
};
