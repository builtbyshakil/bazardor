import type { Category, Market, Product } from "./types";

export const FALLBACK_CATEGORIES: Category[] = [
  { slug: "chal", name: "চাল", emoji: "🍚" },
  { slug: "dal", name: "ডাল", emoji: "🫘" },
  { slug: "tel", name: "তেল", emoji: "🛢️" },
  { slug: "sobji", name: "সবজি", emoji: "🥬" },
  { slug: "mach", name: "মাছ", emoji: "🐟" },
  { slug: "mangsho", name: "মাংস", emoji: "🍗" },
  { slug: "dim-dui", name: "ডিম-দুধ", emoji: "🥛" },
  { slug: "mosla", name: "মসলা", emoji: "🌶️" },
];

type Row = [string, string, string, string, number, number];

const ROWS: Row[] = [
  ["🍚", "স্বর্ণমাছি চাল", "কেজি", "chal", 148, 2.1],
  ["🍚", "মিনিকেট চাল", "কেজি", "chal", 99, -2.9],
  ["🍚", "নাজির চাল", "কেজি", "chal", 74, 0],
  ["🍚", "বাটাম সাইজ চাল", "কেজি", "chal", 66, 3.1],
  ["🫘", "মসুর ডাল", "কেজি", "dal", 142, 2.9],
  ["🫘", "মুগ ডাল", "কেজি", "dal", 135, 0],
  ["🫘", "ছোলা", "কেজি", "dal", 120, -2.4],
  ["🫘", "আমন ডাল (খোসাসিলা)", "কেজি", "dal", 156, 2.6],
  ["🫙", "সরিষার তেল", "লিটার", "tel", 192, 2.1],
  ["🛢️", "পাম তেল", "কেজি", "tel", 168, -2.3],
  ["🫙", "ঘানি ভাঙা সরিষার তেল", "লিটার", "tel", 215, 2.4],
  ["🥔", "আলু", "কেজি", "sobji", 30, -6.2],
  ["🧅", "পেঁয়াজ", "কেজি", "sobji", 54, 12.5],
  ["🌶️", "কাঁচামরিচ", "কেজি", "sobji", 92, -12.4],
  ["🍆", "বেগুন", "কেজি", "sobji", 44, 4.8],
  ["🟢", "ঢেঁড়স", "কেজি", "sobji", 38, 0],
  ["🐟", "রুই মাছ", "কেজি", "mach", 46, 4.5],
  ["🐟", "তেলাপিয়া", "কেজি", "mach", 36, 0],
  ["🐠", "ইলিশ মাছ", "কেজি", "mach", 1850, 3.4],
  ["🐠", "কাতলা মাছ", "কেজি", "mach", 43, -4.4],
  ["🦐", "চিংড়ি মাছ (খোলা)", "কেজি", "mach", 330, 3.1],
  ["🍗", "মুরগির মাংস", "কেজি", "mangsho", 225, -1.3],
  ["🥩", "গরুর মাংস", "কেজি", "mangsho", 790, -1.2],
  ["🍖", "খাসির মাংস", "কেজি", "mangsho", 1290, -3.0],
  ["🦆", "হাঁসের মাংস", "কেজি", "mangsho", 285, -3.4],
  ["🥚", "ডিম", "ডজন", "dim-dui", 158, 3.9],
  ["🥛", "দুধ", "লিটার", "dim-dui", 102, 2.0],
  ["🥣", "দই", "লিটার", "dim-dui", 92, 0],
  ["🧈", "মাখন (১০০ গ্রাম)", "পিস", "dim-dui", 145, 3.6],
  ["🫚", "আদা", "কেজি", "mosla", 85, 9.0],
  ["🧄", "রসুন", "কেজি", "mosla", 125, -7.4],
  ["🌶️", "মরিচ গুঁড়া", "কেজি", "mosla", 245, -2.0],
  ["🍃", "ধনেপাতা গুঁড়া", "কেজি", "mosla", 265, 0],
];

const MARKETS: [string, string][] = [
  ["মাঠ বাজার", "ময়মনসিংহ"],
  ["সদর বাজার", "রাজশাহী"],
  ["বাজারহাট", "খুলনা"],
  ["বাসারহাট বাজার", "রাজশাহী"],
  ["চৌর বাজার", "ময়মনসিংহ"],
  ["আমতলী বাজার", "চট্টগ্রাম"],
  ["ডবলগেট বাজার", "খুলনা"],
  ["চৌরাস্তা বাজার", "সিলেট"],
  ["গ্রীন মার্কেট, মিরপুর", "ঢাকা"],
  ["চৌদগ্রাম বাজার", "চট্টগ্রাম"],
  ["আমবাজার", "সিলেট"],
  ["কারওয়ান বাজার", "ঢাকা"],
];

const round1 = (n: number) => Math.round(n * 10) / 10;

function makeMarkets(price: number): Market[] {
  return MARKETS.map(([name, division], i) => {

    const avg = round1(price * (0.94 + i * 0.0105));
    return {
      name,
      division,
      min: round1(avg * 0.97),
      max: round1(avg * 1.04),
      avg,
    };
  });
}

export const FALLBACK_PRODUCTS: Product[] = ROWS.map(
  ([emoji, name, unit, categorySlug, price, change], index) => {
    const markets = makeMarkets(price);
    const category = FALLBACK_CATEGORIES.find((c) => c.slug === categorySlug)!;
    const previousPrice = change === 0 ? price : round1(price / (1 + change / 100));
    return {
      id: String(index + 1),
      slug: String(index + 1),
      name,
      emoji,
      unit,
      categorySlug,
      categoryName: category.name,
      price,
      previousPrice,
      change,
      description: "",
      min: Math.min(...markets.map((m) => m.min)),
      max: Math.max(...markets.map((m) => m.max)),
      avg: round1(markets.reduce((sum, m) => sum + m.avg, 0) / markets.length),
      markets,
    };
  },
);
