// Next.js gives non-English URL parts percent-encoded, so we decode them
export function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
