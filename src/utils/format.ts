/** Format a dollar price with appropriate decimal places */
export function formatPrice(price: number): string {
  if (price >= 1) return `$${price.toFixed(4)}`;
  if (price >= 0.001) return `$${price.toFixed(6)}`;
  return `$${price.toFixed(8)}`;
}

/** Format large numbers as $1.2M, $42K etc. */
export function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

/** Format a percentage change with +/- and color class */
export function formatChange(pct: number): { text: string; colorClass: string } {
  const sign = pct >= 0 ? "+" : "";
  const text = `${sign}${pct.toFixed(2)}%`;
  const colorClass = pct >= 0 ? "text-emerald-400" : "text-red-400";
  return { text, colorClass };
}

/** Shorten a contract address for display */
export function shortAddress(addr: string): string {
  if (!addr || addr.length < 8) return addr || "TBA";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

/** Format holder count */
export function formatHolders(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}
