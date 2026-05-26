import type { Contestant } from '../data/contestants'
import type { HubToken } from '../data/hubToken'

function drift(value: number, maxPct = 0.015): number {
  return value * (1 + (Math.random() * 2 - 1) * maxPct)
}
function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val))
}

export function updateContestant(c: Contestant): Contestant {
  if (!c.contractAddress || c.comingSoon || c.price === 0) return c
  const newPrice = clamp(drift(c.price, 0.02), 0.000001, 100)
  const ratio = newPrice / (c.price || 1)
  return {
    ...c,
    price: newPrice,
    marketCap: Math.round(c.marketCap * ratio),
    fdv: Math.round(c.fdv * ratio),
    volume24h: Math.round(drift(c.volume24h, 0.05)),
    holders: Math.max(1, Math.round(c.holders + (Math.random() > 0.6 ? 1 : 0))),
    change24h: clamp(drift(c.change24h, 0.1), -99, 200),
    txns24h: Math.round(drift(c.txns24h, 0.05)),
    buys24h: Math.round(drift(c.buys24h, 0.05)),
    sells24h: Math.round(drift(c.sells24h, 0.05)),
  }
}

export function updateHubToken(h: HubToken): HubToken {
  if (h.marketCap === 0) return h
  return {
    ...h,
    marketCap: Math.round(drift(h.marketCap, 0.015)),
    fdv: Math.round(drift(h.fdv, 0.015)),
    volume24h: Math.round(drift(h.volume24h, 0.04)),
    holders: Math.max(1, h.holders + (Math.random() > 0.7 ? 1 : 0)),
    change24h: clamp(drift(h.change24h, 0.08), -99, 200),
    liquidity: Math.round(drift(h.liquidity, 0.01)),
  }
}
