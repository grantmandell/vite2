import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contestants as baseContestants, liveCount } from './data/contestants'
import { hubToken as baseHubToken } from './data/hubToken'
import { updateContestant, updateHubToken } from './utils/mockMarketUpdates'
import { formatPrice, formatMarketCap, formatChange, formatHolders, shortAddress } from './utils/format'
import type { Contestant } from './data/contestants'
import type { HubToken } from './data/hubToken'

const REFRESH_MS = 15000
const NEXT_EPISODE = '2025-07-14T21:00:00.000Z'

// ── Helpers ──────────────────────────────────────────────────

function pad(n: number) { return String(n).padStart(2, '0') }

function usePumpImage(addr: string) {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!addr) return
    fetch(`https://frontend-api.pump.fun/coins/${addr}`)
      .then(r => r.json())
      .then(d => { if (d?.image_uri) setUrl(d.image_uri) })
      .catch(() => {})
  }, [addr])
  return url
}

function GradientAvatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const hue = name.charCodeAt(0) * 17 % 360
  const cls = size === 'lg' ? 'w-16 h-16 text-2xl' : size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
  return (
    <div className={`${cls} rounded-full flex items-center justify-center font-display font-black text-white/80 flex-shrink-0`}
      style={{ background: `radial-gradient(circle at 40% 40%, hsl(${hue},70%,40%), hsl(${(hue+60)%360},60%,20%))` }}>
      {name.slice(0,2).toUpperCase()}
    </div>
  )
}

// ── NavBar ────────────────────────────────────────────────────

function NavBar({ liveCount }: { liveCount: number }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = [
    { label: 'Hub', href: '#hub' },
    { label: 'Islanders', href: '#contestants' },
    { label: 'Rankings', href: '#leaderboard' },
    { label: 'Countdown', href: '#countdown' },
    { label: 'FAQ', href: '#faq' },
  ]
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-[#0A0010]/90 backdrop-blur-xl border-b border-white/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 font-display font-black text-lg text-white hover:text-pink-soft transition-colors">
            🌴 LOVE ISLAND COINS
            <span className="text-xs font-body px-2 py-0.5 rounded-full bg-pink-neon/20 border border-pink-neon/30 text-pink-soft">{liveCount} LIVE</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {links.map(l => <a key={l.label} href={l.href} className="text-white/60 hover:text-white font-body text-sm transition-colors">{l.label}</a>)}
          </nav>
          <a href="#hub" className="hidden md:inline-flex px-4 py-2 rounded-xl bg-pink-neon text-white font-body font-semibold text-sm hover:brightness-110 transition-all">Buy $LOVEISLAND</a>
          <button onClick={() => setOpen(v => !v)} className="md:hidden text-white text-2xl">{open ? '✕' : '☰'}</button>
        </div>
        {open && (
          <div className="md:hidden bg-[#0A0010]/95 backdrop-blur-xl border-b border-white/10">
            <nav className="flex flex-col px-4 py-4 gap-3">
              {links.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-white/70 font-body text-base py-2 border-b border-white/10">{l.label}</a>)}
              <a href="#hub" onClick={() => setOpen(false)} className="mt-2 py-3 rounded-xl bg-pink-neon text-white font-body font-semibold text-center">Buy $LOVEISLAND</a>
            </nav>
          </div>
        )}
      </header>
      <div className="h-[72px]" />
    </>
  )
}

// ── Ticker ────────────────────────────────────────────────────

function TickerTape({ contestants }: { contestants: Contestant[] }) {
  const items = [...contestants, ...contestants]
  return (
    <div className="ticker-wrap bg-black/60 border-y border-pink-neon/20 py-2">
      <div className="ticker-inner flex gap-8">
        {items.map((c, i) => {
          const { text, colorClass } = formatChange(c.change24h)
          return (
            <span key={`${c.id}-${i}`} className="inline-flex items-center gap-2 text-sm font-mono whitespace-nowrap px-4">
              <span className="text-pink-soft font-semibold">{c.ticker}</span>
              <span className="text-white/70">{formatPrice(c.price)}</span>
              <span className={`${colorClass} font-semibold`}>{text}</span>
              <span className="text-white/20">·</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────

function HeroSection({ liveCount }: { liveCount: number }) {
  const hearts = useRef(Array.from({ length: 16 }, (_, i) => ({ x: Math.random() * 100, delay: i * 0.5 })))
  const EMOJIS = ['💗','💖','💓','🌺','🌴','✨','💛']
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0533] via-[#0A0010] to-[#0A0010]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FF006E08] via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-neon/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-glow/8 blur-[100px]" />
      <div className="absolute bottom-0 left-0 text-[160px] leading-none opacity-10 select-none pointer-events-none">🌴</div>
      <div className="absolute bottom-0 right-0 text-[160px] leading-none opacity-10 select-none pointer-events-none" style={{transform:'scaleX(-1)'}}>🌴</div>
      {hearts.current.map((h, i) => (
        <motion.div key={i} className="absolute text-2xl pointer-events-none select-none"
          style={{ left: `${h.x}%`, bottom: '-10%' }}
          animate={{ y: [0, -500], opacity: [0, 0.7, 0], scale: [0.5, 1.2, 0.8], rotate: [0, 360] }}
          transition={{ duration: 8 + Math.random() * 4, delay: h.delay, repeat: Infinity, ease: 'linear' }}>
          {EMOJIS[i % EMOJIS.length]}
        </motion.div>
      ))}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-neon/30 bg-pink-neon/10 text-pink-soft text-sm font-body mb-8">
          <span className="w-2 h-2 rounded-full bg-pink-neon animate-pulse" />
          {liveCount} Coins Live on Solana · Season 11
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-black leading-none mb-4">
          <span className="block text-[clamp(3rem,12vw,9rem)] bg-gradient-to-r from-white via-pink-light to-pink-neon bg-clip-text text-transparent">LOVE ISLAND</span>
          <span className="block text-[clamp(2rem,9vw,7rem)] bg-gradient-to-r from-gold-bright via-gold-warm to-gold-pale bg-clip-text text-transparent">COINS</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-white/60 font-body font-light mb-12 max-w-2xl mx-auto">
          Trade your favorite Islanders. <span className="text-pink-soft">The villa meets the blockchain.</span>
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#hub" className="relative px-8 py-4 rounded-2xl font-body font-semibold text-lg overflow-hidden hover:scale-105 active:scale-95 transition-transform">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-neon to-pink-hot" />
            <span className="relative text-white flex items-center gap-2">Buy $LOVEISLAND 🚀</span>
          </a>
          <a href="#contestants" className="px-8 py-4 rounded-2xl font-body font-semibold text-lg border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all hover:scale-105 active:scale-95">
            View Contestants 🌴
          </a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 mt-16">
          {[{label:'Coins Live',value:`${liveCount}`},{label:'USA Coins',value:'Coming Soon'},{label:'Network',value:'Solana'}].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display font-bold text-3xl text-white">{s.value}</div>
              <div className="text-white/40 text-sm font-body mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Hub Token ─────────────────────────────────────────────────

function HubTokenSection({ token }: { token: HubToken }) {
  const [copied, setCopied] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const imageUrl = usePumpImage(token.contractAddress)
  const { text: changeText, colorClass: changeColor } = formatChange(token.change24h)
  const isLoading = token.price === 0

  return (
    <section id="hub" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-pink-neon/5 blur-[120px] pointer-events-none" />
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-pink-neon font-body text-sm tracking-widest uppercase mb-3">Hub Token</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            {imageUrl && !imgFailed
              ? <img src={imageUrl} alt="$LOVEISLAND" className="w-16 h-16 rounded-full object-cover border-2 border-pink-neon/40" onError={() => setImgFailed(true)} />
              : <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-neon to-purple-glow flex items-center justify-center text-2xl">🌴</div>}
            <h2 className="font-display font-black text-5xl md:text-6xl text-white">$LOVEISLAND</h2>
          </div>
          <p className="text-white/50 max-w-xl mx-auto font-body">{token.description}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="neon-border glass rounded-3xl p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
            <div>
              <div className="text-white/40 text-sm font-body mb-1">Price</div>
              {isLoading ? <div className="skeleton h-12 w-48" /> : <div className="font-display font-black text-5xl text-white">{formatPrice(token.price)}</div>}
              {!isLoading && <div className={`${changeColor} text-xl font-semibold mt-1`}>{changeText} today</div>}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-body">{isLoading ? 'Loading...' : 'Live'}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {[
              { label: 'Market Cap', value: formatMarketCap(token.marketCap) },
              { label: '24h Volume', value: formatMarketCap(token.volume24h) },
              { label: 'Liquidity', value: formatMarketCap(token.liquidity) },
              { label: 'FDV', value: formatMarketCap(token.fdv) },
            ].map(s => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-white/40 text-xs font-body uppercase tracking-widest">{s.label}</span>
                {isLoading ? <div className="skeleton h-8 w-24" /> : <span className="text-white font-display font-bold text-2xl">{s.value}</span>}
              </div>
            ))}
          </div>
          <div className="bg-black/40 rounded-2xl p-4 flex items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-white/40 text-xs font-body mb-1">Contract Address</div>
              <div className="font-mono text-white/80 text-sm break-all">{token.contractAddress || 'TBA'}</div>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(token.contractAddress); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
              className="flex-shrink-0 px-4 py-2 rounded-xl border border-white/20 hover:border-pink-neon/50 hover:bg-pink-neon/10 transition-all text-sm font-body text-white/70 hover:text-white">
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={token.buyLink} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-pink-neon to-pink-hot text-white font-body font-semibold text-center text-lg hover:brightness-110 hover:scale-[1.02] transition-all active:scale-95">
              Buy on Pump.fun 🚀
            </a>
            <a href={token.dexLink} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-4 rounded-2xl border border-purple-glow/40 bg-purple-glow/10 text-white font-body font-semibold text-center text-lg hover:bg-purple-glow/20 transition-all hover:scale-[1.02] active:scale-95">
              View on DexScreener 📊
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Contestant Card ───────────────────────────────────────────

function ContestantCard({ c, rank, isFav, onFav }: { c: Contestant; rank?: number; isFav: boolean; onFav: (id: string) => void }) {
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)
  const imageUrl = usePumpImage(c.contractAddress)
  const { text: changeText, colorClass: changeColor } = formatChange(c.change24h)
  const isGainer = c.change24h >= 20
  const hasData = c.price > 0
  const hue = c.name.charCodeAt(0) * 17 % 360

  return (
    <motion.div className="relative neon-border"
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      whileHover={!c.comingSoon ? { scale: 1.02, y: -3 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      {c.eliminated && (
        <div className="absolute inset-0 z-20 rounded-3xl bg-black/70 flex items-center justify-center pointer-events-none">
          <div className="bg-red-500/20 border border-red-500/40 px-3 py-1.5 rounded-full text-red-400 font-body font-semibold text-xs" style={{ transform: 'rotate(-12deg)' }}>💔 Dumped from the Villa</div>
        </div>
      )}
      <div className={`glass rounded-3xl overflow-hidden transition-all duration-300 ${hovered && !c.comingSoon ? 'shadow-[0_20px_60px_#FF2D7822,0_0_0_1px_#FF2D7833]' : 'shadow-[0_4px_20px_#00000033]'} ${c.eliminated || c.comingSoon ? 'opacity-75' : ''}`}>
        {/* Avatar */}
        <div className="relative w-full overflow-hidden bg-gradient-to-br from-purple-rich to-villa-dark" style={{ aspectRatio: '3/2' }}>
          {c.comingSoon ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{ background: `radial-gradient(circle at 40% 40%, hsl(${hue},50%,25%), hsl(${(hue+60)%360},40%,12%))` }}>
              <span className="text-3xl">🔜</span>
              <span className="text-white/60 text-xs font-body font-semibold uppercase tracking-widest">Coming Soon</span>
            </div>
          ) : imageUrl && !imgFailed ? (
            <img src={imageUrl} alt={c.name} className="w-full h-full object-cover" onError={() => setImgFailed(true)} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-display font-black text-white/80"
              style={{ background: `radial-gradient(circle at 40% 40%, hsl(${hue},70%,40%), hsl(${(hue+60)%360},60%,20%))` }}>
              {c.name.slice(0,2).toUpperCase()}
            </div>
          )}
          {rank && <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-gold-bright/20 border border-gold-bright/50 flex items-center justify-center"><span className="text-gold-bright text-xs font-mono font-bold">#{rank}</span></div>}
          {!c.comingSoon && <button onClick={() => onFav(c.id)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-pink-neon/20 transition-all">{isFav ? '❤️' : '🤍'}</button>}
          {!c.comingSoon && <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-body flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live</div>}
          {isGainer && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-full bg-gold-bright/20 border border-gold-bright/40 text-gold-bright text-xs font-body font-semibold">🔥 HOT</motion.div>}
        </div>
        {/* Body */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-display font-bold text-base text-white leading-tight">{c.name}</h3>
              <span className="text-pink-soft text-xs font-mono">{c.ticker}</span>
            </div>
            <span className="text-lg">{c.country === 'USA' ? '🇺🇸' : '🇬🇧'}</span>
          </div>
          {c.comingSoon ? (
            <div className="py-3 text-center"><span className="text-white/30 text-xs font-body">Token launching soon 🌴</span></div>
          ) : (
            <>
              <div className="flex items-baseline gap-2 mb-3">
                {hasData ? <><span className="font-mono font-bold text-lg text-white">{formatPrice(c.price)}</span><span className={`${changeColor} text-xs font-semibold`}>{changeText}</span></>
                  : <div className="skeleton h-6 w-28" />}
              </div>
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {[
                  { label: 'Mkt Cap', value: hasData ? formatMarketCap(c.marketCap) : null },
                  { label: 'Vol 24h', value: hasData ? formatMarketCap(c.volume24h) : null },
                  { label: 'Holders', value: hasData ? formatHolders(c.holders) : null },
                  { label: 'Liquidity', value: hasData ? formatMarketCap(c.liquidity) : null },
                ].map(s => (
                  <div key={s.label} className="bg-black/30 rounded-lg p-2">
                    <div className="text-white/40 text-xs leading-none mb-0.5">{s.label}</div>
                    {s.value ? <div className="text-white text-xs font-semibold">{s.value}</div> : <div className="skeleton h-3 w-12 mt-0.5" />}
                  </div>
                ))}
              </div>
              <AnimatePresence>
                {hovered && hasData && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="grid grid-cols-3 gap-1.5 mb-3 pt-2 border-t border-white/10">
                      {[{label:'Txns',v:c.txns24h,cl:'text-white/60'},{label:'Buys',v:c.buys24h,cl:'text-emerald-400'},{label:'Sells',v:c.sells24h,cl:'text-red-400'}].map(s => (
                        <div key={s.label} className="text-center">
                          <div className={`${s.cl} text-xs`}>{s.label}</div>
                          <div className={`${s.cl} text-xs font-mono`}>{s.v}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex gap-1.5">
                <a href={c.buyLink} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-xl bg-gradient-to-r from-pink-neon to-pink-hot text-white text-xs font-body font-semibold text-center hover:brightness-110 transition-all active:scale-95">Buy 🚀</a>
                <a href={c.dexLink} target="_blank" rel="noopener noreferrer" className="py-2 px-2.5 rounded-xl border border-purple-glow/30 bg-purple-glow/10 text-white text-xs hover:bg-purple-glow/20 transition-all active:scale-95" title="DexScreener">📊</a>
                <button onClick={() => { navigator.clipboard.writeText(c.contractAddress || 'TBA'); setCopied(true); setTimeout(() => setCopied(false), 1800) }}
                  className="py-2 px-2.5 rounded-xl border border-white/20 bg-white/5 text-white text-xs hover:bg-white/10 transition-all active:scale-95">{copied ? '✓' : '📋'}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Contestant Board ──────────────────────────────────────────

type SortKey = 'marketCap' | 'volume24h' | 'price' | 'change24h' | 'holders' | 'name'

function ContestantBoard({ contestants, favorites, onToggleFavorite }: { contestants: Contestant[]; favorites: string[]; onToggleFavorite: (id: string) => void }) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('marketCap')
  const [countryFilter, setCountryFilter] = useState<'ALL' | 'USA' | 'UK'>('ALL')

  const allRanked = useMemo(() => {
    return [...contestants].filter(c => !c.eliminated && !c.comingSoon)
      .sort((a, b) => b.marketCap - a.marketCap)
      .reduce<Record<string, number>>((acc, c, i) => { acc[c.id] = i + 1; return acc }, {})
  }, [contestants])

  const processed = useMemo(() => {
    let list = contestants.filter(c => !c.eliminated)
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(c => c.name.toLowerCase().includes(q) || c.ticker.toLowerCase().includes(q)) }
    if (countryFilter !== 'ALL') list = list.filter(c => c.country === countryFilter)
    return [...list].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name)
      return (b[sortKey] as number) - (a[sortKey] as number)
    })
  }, [contestants, search, sortKey, countryFilter])

  const usa = processed.filter(c => c.country === 'USA')
  const uk = processed.filter(c => c.country === 'UK')

  return (
    <section id="contestants" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-pink-neon font-body text-sm tracking-widest uppercase mb-3">The Villa Market</p>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-4">Islander Tokens</h2>
          <p className="text-white/50 font-body max-w-xl mx-auto">Every contestant has a token. Pick your winners.</p>
        </motion.div>
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
            <input type="text" placeholder="Search islanders..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:border-pink-neon/50 focus:outline-none text-white placeholder-white/30 font-body text-sm transition-all" />
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex rounded-xl overflow-hidden border border-white/10">
              {(['ALL', 'USA', 'UK'] as const).map(c => (
                <button key={c} onClick={() => setCountryFilter(c)}
                  className={`px-3 py-2 text-sm font-body transition-all ${countryFilter === c ? 'bg-pink-neon text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                  {c === 'USA' ? '🇺🇸 USA' : c === 'UK' ? '🇬🇧 UK' : 'All'}
                </button>
              ))}
            </div>
            <select value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm focus:outline-none focus:border-pink-neon/50 cursor-pointer">
              {[{v:'marketCap',l:'Market Cap'},{v:'volume24h',l:'Volume'},{v:'price',l:'Price'},{v:'change24h',l:'Trending'},{v:'holders',l:'Most Holders'},{v:'name',l:'Alphabetical'}].map(o => (
                <option key={o.v} value={o.v} className="bg-[#1A0533]">{o.l}</option>
              ))}
            </select>
          </div>
        </div>
        {countryFilter === 'ALL' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6"><span className="text-2xl">🇺🇸</span><h3 className="font-display font-bold text-2xl text-white">USA</h3><span className="ml-auto text-white/30 text-sm">{usa.length} islanders</span></div>
              <div className="flex flex-col gap-4">{usa.map((c, i) => <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}><ContestantCard c={c} rank={allRanked[c.id]} isFav={favorites.includes(c.id)} onFav={onToggleFavorite} /></motion.div>)}</div>
            </div>
            <div className="hidden lg:flex flex-col items-center py-8">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-pink-neon/30 to-transparent" />
              <div className="my-4 text-3xl">🏝️</div>
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-pink-neon/30 to-transparent" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6"><span className="text-2xl">🇬🇧</span><h3 className="font-display font-bold text-2xl text-white">UK</h3><span className="ml-auto text-white/30 text-sm">{uk.length} islanders</span></div>
              <div className="flex flex-col gap-4">{uk.map((c, i) => <motion.div key={c.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}><ContestantCard c={c} rank={allRanked[c.id]} isFav={favorites.includes(c.id)} onFav={onToggleFavorite} /></motion.div>)}</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {processed.map((c, i) => <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}><ContestantCard c={c} rank={allRanked[c.id]} isFav={favorites.includes(c.id)} onFav={onToggleFavorite} /></motion.div>)}
          </div>
        )}
      </div>
    </section>
  )
}

// ── Leaderboard ───────────────────────────────────────────────

function LeaderboardSection({ contestants }: { contestants: Contestant[] }) {
  const ranked = [...contestants].filter(c => !c.eliminated && !c.comingSoon).sort((a, b) => b.marketCap - a.marketCap).slice(0, 10)
  const MEDALS = ['🥇','🥈','🥉']
  return (
    <section id="leaderboard" className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-gold-bright font-body text-sm tracking-widest uppercase mb-3">Rankings</p>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white">Leaderboard</h2>
        </motion.div>
        <div className="glass rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-3 border-b border-white/10 text-white/30 text-xs font-body uppercase tracking-wider">
            <span>#</span><span>Islander</span><span className="text-right">Market Cap</span><span className="text-right">24h</span>
          </div>
          {ranked.map((c, i) => {
            const { text, colorClass } = formatChange(c.change24h)
            const hue = c.name.charCodeAt(0) * 17 % 360
            return (
              <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors items-center">
                <span className="text-xl w-8 text-center">{i < 3 ? MEDALS[i] : <span className="text-white/30 font-mono text-sm">{i+1}</span>}</span>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-display font-bold text-white flex-shrink-0"
                    style={{ background: `radial-gradient(circle, hsl(${hue},60%,40%), hsl(${(hue+60)%360},50%,20%))` }}>
                    {c.name.slice(0,2)}
                  </div>
                  <div><div className="text-white font-semibold font-body">{c.name}</div><div className="text-white/40 text-xs font-mono">{c.ticker}</div></div>
                  <span className="text-lg">{c.country === 'USA' ? '🇺🇸' : '🇬🇧'}</span>
                </div>
                <span className="text-white font-mono text-sm text-right">{formatMarketCap(c.marketCap)}</span>
                <span className={`${colorClass} font-semibold text-sm text-right`}>{text}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Trending ──────────────────────────────────────────────────

function TrendingSection({ contestants }: { contestants: Contestant[] }) {
  const active = contestants.filter(c => !c.eliminated && !c.comingSoon && c.price > 0)
  const panels = [
    { title: 'Top Gainers', emoji: '📈', items: [...active].sort((a,b) => b.change24h - a.change24h).slice(0,4), key: 'change24h' as keyof Contestant },
    { title: 'Top Losers', emoji: '📉', items: [...active].sort((a,b) => a.change24h - b.change24h).slice(0,4), key: 'change24h' as keyof Contestant },
    { title: 'Highest Volume', emoji: '💸', items: [...active].sort((a,b) => b.volume24h - a.volume24h).slice(0,4), key: 'volume24h' as keyof Contestant },
    { title: 'Most Holders', emoji: '👥', items: [...active].sort((a,b) => b.holders - a.holders).slice(0,4), key: 'holders' as keyof Contestant },
  ]
  return (
    <section id="trending" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-pink-neon font-body text-sm tracking-widest uppercase mb-3">Live Rankings</p>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white">Top Movers</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {panels.map(panel => (
            <div key={panel.title} className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">{panel.emoji}</span>
                <h3 className="font-display font-bold text-xl text-white">{panel.title}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {panel.items.map((c, i) => {
                  const { text, colorClass } = formatChange(c.change24h)
                  const val = c[panel.key] as number
                  return (
                    <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3">
                      <span className="text-white/30 font-mono text-xs w-4">{i+1}</span>
                      <GradientAvatar name={c.name} size="sm" />
                      <div className="flex-1">
                        <div className="text-white text-sm font-semibold">{c.name}</div>
                        <div className="text-white/40 text-xs font-mono">{c.ticker}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm font-mono">{panel.key === 'change24h' ? text : formatMarketCap(val)}</div>
                        {panel.key !== 'change24h' && <div className={`${colorClass} text-xs`}>{text}</div>}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Countdown ─────────────────────────────────────────────────

function FlipUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-20 h-20 md:w-28 md:h-28">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-rich to-villa-dark border border-pink-neon/20 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span key={value} initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.25 }}
              className="font-display font-black text-4xl md:text-5xl text-white">{value}</motion.span>
          </AnimatePresence>
        </div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-black/50" />
      </div>
      <span className="text-white/40 text-xs font-body uppercase tracking-widest">{label}</span>
    </div>
  )
}

function EpisodeCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [expired, setExpired] = useState(false)
  useEffect(() => {
    const target = new Date(NEXT_EPISODE).getTime()
    const update = () => {
      const diff = target - Date.now()
      if (diff <= 0) { setExpired(true); return }
      setTime({ days: Math.floor(diff/86400000), hours: Math.floor((diff%86400000)/3600000), minutes: Math.floor((diff%3600000)/60000), seconds: Math.floor((diff%60000)/1000) })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <section id="countdown" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-deep/30 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-pink-neon font-body text-sm tracking-widest uppercase mb-3">Next Episode</p>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white mb-2">{expired ? '🔴 LIVE NOW' : 'The Villa Opens In'}</h2>
          <p className="text-white/40 font-body mb-12">ITV2 / Peacock</p>
        </motion.div>
        {!expired && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="flex justify-center gap-4 md:gap-8">
            <FlipUnit value={pad(time.days)} label="Days" />
            <div className="flex items-center pb-8"><motion.span animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1, repeat: Infinity }} className="font-display font-black text-4xl md:text-5xl text-pink-neon">:</motion.span></div>
            <FlipUnit value={pad(time.hours)} label="Hours" />
            <div className="flex items-center pb-8"><motion.span animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1, repeat: Infinity }} className="font-display font-black text-4xl md:text-5xl text-pink-neon">:</motion.span></div>
            <FlipUnit value={pad(time.minutes)} label="Minutes" />
            <div className="flex items-center pb-8"><motion.span animate={{ opacity: [1,0.3,1] }} transition={{ duration: 1, repeat: Infinity }} className="font-display font-black text-4xl md:text-5xl text-pink-neon">:</motion.span></div>
            <FlipUnit value={pad(time.seconds)} label="Seconds" />
          </motion.div>
        )}
        <p className="mt-10 text-white/30 text-sm font-body">Token prices tend to surge during live episodes 📈</p>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────

const FAQS = [
  { q: 'What is Love Island Coins?', a: 'Love Island Coins is a meme coin platform on Solana where every Love Island contestant has their own token. Think of it like a prediction market meets fantasy sports — but for reality TV.' },
  { q: 'How do I buy a contestant token?', a: "Click any 'Buy' button on a contestant card to open their token on Pump.fun. You'll need a Solana wallet (like Phantom) and some SOL." },
  { q: 'What is $LOVEISLAND?', a: '$LOVEISLAND is the hub token. 50% of creator fees from every contestant coin is used to buy and burn $LOVEISLAND.' },
  { q: 'Are these tokens official?', a: 'These are community meme tokens on Solana, not officially affiliated with the Love Island TV show. They are speculative assets for entertainment only.' },
  { q: 'What happens to eliminated contestants?', a: "Eliminated contestants get marked with 💔 'Dumped from the Villa'. Their tokens still trade." },
  { q: 'Is this safe?', a: 'Meme coins are highly speculative and volatile. This is not financial advice. Only use funds you can afford to lose completely.' },
]

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-pink-neon font-body text-sm tracking-widest uppercase mb-3">Got Questions?</p>
          <h2 className="font-display font-black text-5xl md:text-6xl text-white">FAQ</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass rounded-3xl px-8 py-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-white/10 last:border-0">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full py-5 flex items-center justify-between gap-4 text-left hover:text-pink-soft transition-colors">
                <span className="font-body font-semibold text-white/90">{faq.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-pink-neon text-2xl flex-shrink-0">+</motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="pb-5 text-white/50 font-body leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display font-black text-3xl text-white mb-3">Love Island Coins</h3>
            <p className="text-white/40 font-body text-sm leading-relaxed">The only meme coin platform where the villa meets the blockchain. Not financial advice.</p>
          </div>
          <div>
            <h4 className="font-body font-semibold text-white/70 text-sm uppercase tracking-widest mb-4">Navigate</h4>
            <nav className="flex flex-col gap-2">
              {[{l:'Hub Token',h:'#hub'},{l:'Contestants',h:'#contestants'},{l:'Leaderboard',h:'#leaderboard'},{l:'Countdown',h:'#countdown'},{l:'FAQ',h:'#faq'}].map(link => (
                <a key={link.l} href={link.h} className="text-white/50 hover:text-pink-soft transition-colors font-body text-sm">{link.l}</a>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-body font-semibold text-white/70 text-sm uppercase tracking-widest mb-4">Community</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-white/50 hover:text-pink-soft transition-colors font-body text-sm">𝕏 Twitter / X</a>
              <a href="#" className="text-white/50 hover:text-pink-soft transition-colors font-body text-sm">✈️ Telegram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-white/20 text-xs font-body text-center sm:text-left">© 2025 Love Island Coins. Not affiliated with ITV or Peacock. Meme tokens are highly speculative — not financial advice. DYOR.</p>
          <div className="flex gap-4"><span className="text-2xl">🌴</span><span className="text-2xl">💖</span><span className="text-2xl">🌴</span></div>
        </div>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────

export default function App() {
  const [contestants, setContestants] = useState<Contestant[]>(baseContestants)
  const [hubToken, setHubToken] = useState<HubToken>(baseHubToken)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    try { const s = localStorage.getItem('lic_favorites'); if (s) setFavorites(JSON.parse(s)) } catch {}
  }, [])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      try { localStorage.setItem('lic_favorites', JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  // Mock market updates
  useEffect(() => {
    const id = setInterval(() => {
      setContestants(prev => prev.map(updateContestant))
      setHubToken(prev => updateHubToken(prev))
    }, REFRESH_MS)
    return () => clearInterval(id)
  }, [])

  const liveContestants = contestants.filter(c => c.contractAddress && !c.comingSoon)

  return (
    <main className="min-h-screen bg-[#0A0010]">
      <NavBar liveCount={liveCount} />
      <HeroSection liveCount={liveCount} />
      {liveContestants.length > 0 && <TickerTape contestants={liveContestants} />}
      <HubTokenSection token={hubToken} />
      <ContestantBoard contestants={contestants} favorites={favorites} onToggleFavorite={toggleFavorite} />
      <LeaderboardSection contestants={contestants} />
      <TrendingSection contestants={contestants} />
      <EpisodeCountdown />
      <FAQSection />
      <Footer />
    </main>
  )
}
