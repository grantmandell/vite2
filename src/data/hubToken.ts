export type HubToken = {
  name: string;
  ticker: string;
  price: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  change24h: number;
  liquidity: number;
  fdv: number;
  contractAddress: string;
  buyLink: string;
  dexLink: string;
  description: string;
};

export const hubToken: HubToken = {
  name: "Love Island",
  ticker: "$LOVEISLAND",
  // These are initial values — the site fetches live data on load
  price: 0,
  marketCap: 0,
  volume24h: 0,
  holders: 0,
  change24h: 0,
  liquidity: 0,
  fdv: 0,
  contractAddress: "Bicak78oMUa8f1xFNMcN8zmXEJ4cxjPYTwdQb2qxpump",
  buyLink: "https://pump.fun/coin/Bicak78oMUa8f1xFNMcN8zmXEJ4cxjPYTwdQb2qxpump",
  dexLink: "https://dexscreener.com/solana/Bicak78oMUa8f1xFNMcN8zmXEJ4cxjPYTwdQb2qxpump",
  description: "The official hub token of Love Island Coins. 50% of creator fees from every contestant coin is used to buy and burn $LOVEISLAND.",
};
