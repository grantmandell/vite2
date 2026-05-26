// ============================================================
// SITE CONFIGURATION
// ============================================================
// Toggle USE_MOCK_DATA to switch between mock and live data.
// Set to false and fill in config/tokens.ts to go live.
// ============================================================

export const SITE_CONFIG = {
  USE_MOCK_DATA: true,

  // Site meta
  name: "Love Island Coins",
  tagline: "Trade your favorite Islanders.",
  url: "https://loveislandcoins.com",

  // Episode countdown target (ISO string — update each week)
  nextEpisodeDate: "2025-07-14T21:00:00.000Z",
  episodeChannel: "ITV2 / Peacock",

  // Auto-refresh interval in ms (mock market updates + live data polling)
  refreshInterval: 15000,

  // Social links
  twitter: "https://twitter.com/loveislandcoins",
  telegram: "https://t.me/loveislandcoins",
};
