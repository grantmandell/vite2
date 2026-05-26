/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        "pink-neon": "#FF2D78",
        "pink-hot": "#FF006E",
        "pink-soft": "#FF8FAB",
        "pink-light": "#FFB3C6",
        "purple-deep": "#1A0533",
        "purple-rich": "#3B0764",
        "purple-mid": "#6B21A8",
        "purple-glow": "#A855F7",
        "gold-bright": "#FFD700",
        "gold-warm": "#F59E0B",
        "gold-pale": "#FDE68A",
        "villa-dark": "#0A0010",
        "villa-card": "#12001F",
      },
    },
  },
  plugins: [],
}
