import { Inter, Averia_Serif_Libre } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const averiaSerif = Averia_Serif_Libre({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
  variable: "--font-body",
});

export const metadata = {
  title: "Jenna Bitar | Artist",
  description: "Portfolio of artist Jenna Bitar featuring paintings, sculptures, and mixed media works.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${averiaSerif.variable}`}>
        {/* SVG Noise Filter for lime wash texture */}
        <svg className="noise-filter" aria-hidden="true">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
        <Navigation />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
