export type Contestant = {
  id: string;
  name: string;
  country: "USA" | "UK";
  image: string;
  contractAddress: string;
  ticker: string;
  price: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  change24h: number;
  liquidity: number;
  fdv: number;
  txns24h: number;
  buys24h: number;
  sells24h: number;
  buyLink: string;
  dexLink: string;
  eliminated: boolean;
  coupled: string | null;
  comingSoon?: boolean;
  rank?: number;
};

export const contestants: Contestant[] = [
  // ── UK — LIVE ─────────────────────────────────────────────
  {
    id: "ellie",
    name: "Ellie",
    country: "UK",
    image: "",
    contractAddress: "3dDtRm5JNG8V15VzdaVDcqbaSTVyuoG4Q7gfWcxcpump",
    ticker: "$ELLIE",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/3dDtRm5JNG8V15VzdaVDcqbaSTVyuoG4Q7gfWcxcpump",
    dexLink: "https://dexscreener.com/solana/3dDtRm5JNG8V15VzdaVDcqbaSTVyuoG4Q7gfWcxcpump",
    eliminated: false, coupled: null,
  },
  {
    id: "lola",
    name: "Lola",
    country: "UK",
    image: "",
    contractAddress: "Fh5yhqvhzeLANnim4v74SsoW4wtucwdX9i2LjYjipump",
    ticker: "$LOLA",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/Fh5yhqvhzeLANnim4v74SsoW4wtucwdX9i2LjYjipump",
    dexLink: "https://dexscreener.com/solana/Fh5yhqvhzeLANnim4v74SsoW4wtucwdX9i2LjYjipump",
    eliminated: false, coupled: null,
  },
  {
    id: "ope",
    name: "Ope",
    country: "UK",
    image: "",
    contractAddress: "EM6oVUnvwJMXycoLx1aLAaXMYW8bdiKaQijBgjiopump",
    ticker: "$OPE",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/EM6oVUnvwJMXycoLx1aLAaXMYW8bdiKaQijBgjiopump",
    dexLink: "https://dexscreener.com/solana/EM6oVUnvwJMXycoLx1aLAaXMYW8bdiKaQijBgjiopump",
    eliminated: false, coupled: null,
  },
  {
    id: "aidan",
    name: "Aidan",
    country: "UK",
    image: "",
    contractAddress: "A2kyJYM2RoiEtyfzCJrKkDrGtG4sVM9X9u3UJf4Spump",
    ticker: "$AIDAN",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/A2kyJYM2RoiEtyfzCJrKkDrGtG4sVM9X9u3UJf4Spump",
    dexLink: "https://dexscreener.com/solana/A2kyJYM2RoiEtyfzCJrKkDrGtG4sVM9X9u3UJf4Spump",
    eliminated: false, coupled: null,
  },
  {
    id: "jasmine",
    name: "Jasmine",
    country: "UK",
    image: "",
    contractAddress: "AtGT51ArSQkWAsyAQo4SRXLL23kakG5vYtSqAwa9pump",
    ticker: "$JASMINE",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/AtGT51ArSQkWAsyAQo4SRXLL23kakG5vYtSqAwa9pump",
    dexLink: "https://dexscreener.com/solana/AtGT51ArSQkWAsyAQo4SRXLL23kakG5vYtSqAwa9pump",
    eliminated: false, coupled: null,
  },
  {
    id: "angelisa",
    name: "Angelisa",
    country: "UK",
    image: "",
    contractAddress: "8sLEhU3r7SSAhycbJQJ5m2HWxHgtgCgSU8gme9atpump",
    ticker: "$ANGELISA",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/8sLEhU3r7SSAhycbJQJ5m2HWxHgtgCgSU8gme9atpump",
    dexLink: "https://dexscreener.com/solana/8sLEhU3r7SSAhycbJQJ5m2HWxHgtgCgSU8gme9atpump",
    eliminated: false, coupled: null,
  },
  {
    id: "robyn",
    name: "Robyn",
    country: "UK",
    image: "",
    contractAddress: "DXuzbbgHgSysYUSei2YVKWrfQqqUgeBAFqPgtur4pump",
    ticker: "$ROBYN",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/DXuzbbgHgSysYUSei2YVKWrfQqqUgeBAFqPgtur4pump",
    dexLink: "https://dexscreener.com/solana/DXuzbbgHgSysYUSei2YVKWrfQqqUgeBAFqPgtur4pump",
    eliminated: false, coupled: null,
  },
  {
    id: "lorenzo",
    name: "Lorenzo",
    country: "UK",
    image: "",
    contractAddress: "4PqY4mKfMDa3hxmVFzyQa1ovkjpuu1ZaFQrtqQGmpump",
    ticker: "$LORENZO",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/4PqY4mKfMDa3hxmVFzyQa1ovkjpuu1ZaFQrtqQGmpump",
    dexLink: "https://dexscreener.com/solana/4PqY4mKfMDa3hxmVFzyQa1ovkjpuu1ZaFQrtqQGmpump",
    eliminated: false, coupled: null,
  },
  {
    id: "sam",
    name: "Sam",
    country: "UK",
    image: "",
    contractAddress: "53puhh83nEh8gp1QYHnYgrQDkVXm6D8CTn42f9Hcpump",
    ticker: "$SAM",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/53puhh83nEh8gp1QYHnYgrQDkVXm6D8CTn42f9Hcpump",
    dexLink: "https://dexscreener.com/solana/53puhh83nEh8gp1QYHnYgrQDkVXm6D8CTn42f9Hcpump",
    eliminated: false, coupled: null,
  },
  {
    id: "mica",
    name: "Mica",
    country: "UK",
    image: "",
    contractAddress: "6RAHcijF6AcY2gRSJXx8yMcsHBYHPevcg9MPVqGCpump",
    ticker: "$MICA",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/6RAHcijF6AcY2gRSJXx8yMcsHBYHPevcg9MPVqGCpump",
    dexLink: "https://dexscreener.com/solana/6RAHcijF6AcY2gRSJXx8yMcsHBYHPevcg9MPVqGCpump",
    eliminated: false, coupled: null,
  },
  {
    id: "samraj",
    name: "Samraj",
    country: "UK",
    image: "",
    contractAddress: "4D5yVZqww8wue4gZHNQrLAEbwpxYHuD1EZHA3p4Kpump",
    ticker: "$SAMRAJ",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/4D5yVZqww8wue4gZHNQrLAEbwpxYHuD1EZHA3p4Kpump",
    dexLink: "https://dexscreener.com/solana/4D5yVZqww8wue4gZHNQrLAEbwpxYHuD1EZHA3p4Kpump",
    eliminated: false, coupled: null,
  },
  {
    id: "sean",
    name: "Sean",
    country: "UK",
    image: "",
    contractAddress: "Cq1CbpHsaA4cJBACdTFsJKzGRiJvCc8Szm33hZDBpump",
    ticker: "$SEAN",
    price: 0, marketCap: 0, volume24h: 0, holders: 0, change24h: 0,
    liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "https://pump.fun/coin/Cq1CbpHsaA4cJBACdTFsJKzGRiJvCc8Szm33hZDBpump",
    dexLink: "https://dexscreener.com/solana/Cq1CbpHsaA4cJBACdTFsJKzGRiJvCc8Szm33hZDBpump",
    eliminated: false, coupled: null,
  },

  // ── USA — COMING SOON ─────────────────────────────────────
  {
    id: "leah", name: "Leah", country: "USA", image: "", contractAddress: "",
    ticker: "$LEAH", price: 0, marketCap: 0, volume24h: 0, holders: 0,
    change24h: 0, liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "#", dexLink: "#", eliminated: false, coupled: null, comingSoon: true,
  },
  {
    id: "rob", name: "Rob", country: "USA", image: "", contractAddress: "",
    ticker: "$ROB", price: 0, marketCap: 0, volume24h: 0, holders: 0,
    change24h: 0, liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "#", dexLink: "#", eliminated: false, coupled: null, comingSoon: true,
  },
  {
    id: "miguel", name: "Miguel", country: "USA", image: "", contractAddress: "",
    ticker: "$MIGUEL", price: 0, marketCap: 0, volume24h: 0, holders: 0,
    change24h: 0, liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "#", dexLink: "#", eliminated: false, coupled: null, comingSoon: true,
  },
  {
    id: "serena", name: "Serena", country: "USA", image: "", contractAddress: "",
    ticker: "$SERENA", price: 0, marketCap: 0, volume24h: 0, holders: 0,
    change24h: 0, liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "#", dexLink: "#", eliminated: false, coupled: null, comingSoon: true,
  },
  {
    id: "liv", name: "Liv", country: "USA", image: "", contractAddress: "",
    ticker: "$LIV", price: 0, marketCap: 0, volume24h: 0, holders: 0,
    change24h: 0, liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "#", dexLink: "#", eliminated: false, coupled: null, comingSoon: true,
  },
  {
    id: "kassy", name: "Kassy", country: "USA", image: "", contractAddress: "",
    ticker: "$KASSY", price: 0, marketCap: 0, volume24h: 0, holders: 0,
    change24h: 0, liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "#", dexLink: "#", eliminated: false, coupled: null, comingSoon: true,
  },
  {
    id: "jana", name: "JaNa", country: "USA", image: "", contractAddress: "",
    ticker: "$JANA", price: 0, marketCap: 0, volume24h: 0, holders: 0,
    change24h: 0, liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "#", dexLink: "#", eliminated: false, coupled: null, comingSoon: true,
  },
  {
    id: "kendall", name: "Kendall", country: "USA", image: "", contractAddress: "",
    ticker: "$KENDALL", price: 0, marketCap: 0, volume24h: 0, holders: 0,
    change24h: 0, liquidity: 0, fdv: 0, txns24h: 0, buys24h: 0, sells24h: 0,
    buyLink: "#", dexLink: "#", eliminated: false, coupled: null, comingSoon: true,
  },
];

export const rankedContestants = [...contestants]
  .filter((c) => !c.eliminated && !c.comingSoon && c.contractAddress)
  .sort((a, b) => b.marketCap - a.marketCap)
  .map((c, i) => ({ ...c, rank: i + 1 }));

export const liveCount = contestants.filter(
  (c) => c.contractAddress && !c.comingSoon
).length;
