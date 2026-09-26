import { JetBrains_Mono, Newsreader } from "next/font/google";

// Serif for headings & body copy — matches the editorial dossier feel of the
// wider Thru Wallet product surfaces.
export const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

// Monospace for labels, code, addresses, and anything a reader might copy.
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});
