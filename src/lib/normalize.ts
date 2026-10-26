import { toNumber } from "./bn";
import type { Category, Market, Product } from "./types";

type Raw = Record<string, unknown>;

const isObject = (v: unknown): v is Raw => typeof v === "object" && v !== null && !Array.isArray(v);

function pick(obj: Raw, keys: string[]): unknown {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") return obj[key];
  }
  return undefined;
}

const asText = (v: unknown): string => {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (isObject(v)) return asText(pick(v, ["bn", "name_bn", "nameBn", "name", "title", "label"]));
  return "";
};

export function unwrapList(json: unknown, keys: string[]): Raw[] {
  if (Array.isArray(json)) return json.filter(isObject);
  if (isObject(json)) {
    for (const key of [...keys, "data", "result", "results", "items"]) {
      const value = json[key];
      if (Array.isArray(value)) return value.filter(isObject);
      if (isObject(value)) {
        const inner = unwrapList(value, keys);
        if (inner.length) return inner;
      }
    }
  }
  return [];
}

export function unwrapOne(json: unknown, keys: string[]): Raw | null {
  if (!isObject(json)) return null;
  for (const key of [...keys, "data", "result"]) {
    if (isObject(json[key])) return json[key] as Raw;
  }
  return json;
}

export function normalizeCategory(raw: Raw): Category {
  const name = asText(pick(raw, ["name_bn", "nameBn", "name", "title", "label"]));
  const slug = asText(pick(raw, ["slug", "id", "key", "value"])) || name;
  return {
    slug,
    name: name || slug,
    emoji: asText(pick(raw, ["emoji", "icon", "image"])) || "🛒",
  };
}

function normalizeMarket(raw: Raw): Market | null {
  const name = asText(pick(raw, ["name_bn", "nameBn", "market", "marketName", "bazar", "bazarName", "name", "title"]));
  if (!name) return null;
  const min = toNumber(pick(raw, ["min", "minPrice", "min_price", "lowest", "minimum"]));
  const max = toNumber(pick(raw, ["max", "maxPrice", "max_price", "highest", "maximum"]));
  const avg = toNumber(pick(raw, ["avg", "avgPrice", "avg_price", "average", "averagePrice", "price"]));
  const base = avg ?? min ?? max ?? 0;
  return {
    name,
    division: asText(pick(raw, ["division", "district", "location", "city", "area", "region"])),
    min: min ?? base,
    max: max ?? base,
    avg: avg ?? (min !== null && max !== null ? (min + max) / 2 : base),
  };
}

export function normalizeProduct(raw: Raw, categories: Category[]): Product {

  const rawCategory = pick(raw, ["category", "categorySlug", "category_slug", "categoryId", "category_id"]);
  const catText = isObject(rawCategory)
    ? asText(pick(rawCategory, ["slug", "id", "name"]))
    : asText(rawCategory);
  const catName = isObject(rawCategory)
    ? asText(pick(rawCategory, ["name_bn", "nameBn", "name"]))
    : asText(pick(raw, ["categoryName", "category_name"]));
  const matched = categories.find(
    (c) => c.slug === catText || c.name === catText || c.name === catName || c.slug === catName,
  );

  const marketList = pick(raw, ["markets", "marketPrices", "market_prices", "bazars", "prices", "marketWise"]);
  const markets = (Array.isArray(marketList) ? marketList : [])
    .filter(isObject)
    .map(normalizeMarket)
    .filter((m): m is Market => m !== null);

  const marketAvg = markets.length ? markets.reduce((s, m) => s + m.avg, 0) / markets.length : null;
  const price =
    toNumber(pick(raw, ["price", "todayPrice", "today_price", "currentPrice", "current_price", "avgPrice", "avg", "average"])) ??
    marketAvg ??
    0;
  const previousPrice = toNumber(
    pick(raw, ["previousPrice", "previous_price", "yesterdayPrice", "yesterday_price", "prevPrice", "oldPrice"]),
  );

  let change = toNumber(
    pick(raw, ["changePercent", "change_percent", "percentChange", "percent_change", "change", "changePct", "percentage"]),
  );
  if (change === null) {
    change = previousPrice && previousPrice > 0 ? ((price - previousPrice) / previousPrice) * 100 : 0;
  }

  const id = asText(pick(raw, ["id", "_id", "productId"]));
  const name = asText(pick(raw, ["name_bn", "nameBn", "name", "title"]));

  return {
    id,
    slug: asText(pick(raw, ["slug"])) || id,
    name,
    emoji: asText(pick(raw, ["emoji", "icon", "image"])) || matched?.emoji || "🛒",
    unit: asText(pick(raw, ["unit", "unitName", "unit_bn"])) || "কেজি",
    categorySlug: matched?.slug ?? (catText || "other"),
    categoryName: matched?.name ?? (catName || catText),
    price,
    previousPrice,
    change,
    description: asText(pick(raw, ["description", "summary", "subtitle", "details"])),
    min: toNumber(pick(raw, ["min", "minPrice", "min_price", "lowest"])) ?? (markets.length ? Math.min(...markets.map((m) => m.min)) : price),
    max: toNumber(pick(raw, ["max", "maxPrice", "max_price", "highest"])) ?? (markets.length ? Math.max(...markets.map((m) => m.max)) : price),
    avg: toNumber(pick(raw, ["avg", "avgPrice", "avg_price", "average"])) ?? marketAvg ?? price,
    markets,
  };
}
