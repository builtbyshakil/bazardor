// The shapes our whole app uses. API data is converted into these in normalize.ts

export type Market = {
  name: string; // বাজার
  division: string; // বিভাগ
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
  unit: string; // e.g. "কেজি"
  categorySlug: string;
  categoryName: string;
  price: number; // today's price
  previousPrice: number | null;
  change: number; // percent, + means up, - means down
  description: string;
  min: number;
  max: number;
  avg: number;
  markets: Market[];
};
