// Small helpers for Bengali digits, prices, percentages and dates

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// 123 -> ১২৩
export function toBnDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

// ১২৩ -> 123  (needed so sorting works on real numbers, not on strings)
export function fromBnDigits(value: string): string {
  return value.replace(/[০-৯]/g, (ch) => String(BN_DIGITS.indexOf(ch)));
}

// Turns 148, "148", "১৪৮ টাকা", "১,৮৫০" ... into a real number (or null)
export function toNumber(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value !== "string") return null;
  const cleaned = fromBnDigits(value).replace(/,/g, "").replace(/[^\d.\-]/g, "");
  if (cleaned === "" || cleaned === "-" || cleaned === ".") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

// 1850 -> ১,৮৫০   |   63.5 -> ৬৩.৫০
export function formatBnNumber(n: number): string {
  const isWhole = Number.isInteger(n);
  const text = n.toLocaleString("en-US", {
    minimumFractionDigits: isWhole ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return toBnDigits(text);
}

export function formatTaka(n: number): string {
  return `${formatBnNumber(n)} টাকা`;
}

// 2.14 -> ২.১%
export function formatPercent(n: number): string {
  return `${toBnDigits(Math.abs(n).toFixed(1))}%`;
}

// "প্রতি কেজি" and "কেজি" both -> "কেজি"
export function shortUnit(unit: string): string {
  return unit.replace(/^প্রতি\s*/, "").trim();
}

// "কেজি" -> "প্রতি কেজি"
export function unitLabel(unit: string): string {
  return `প্রতি ${shortUnit(unit)}`;
}

// মঙ্গলবার, ৬ অক্টোবর, ২০২৬
export function banglaToday(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")}, ${toBnDigits(get("day"))} ${get("month")}, ${toBnDigits(get("year"))}`;
}
