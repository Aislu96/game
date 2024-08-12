import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { GameProvider } from "./context/game";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Game",
  description: "Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BinX</title>

        <meta property="og:title" content="BinX" />
        <meta
          property="og:description"
          content="spin and earn at your comfort"
        />
        <meta
          property="og:image"
          content="https://bi-xcoin-7rao.vercel.app/binXcoin.svg"
        />
        <meta property="og:url" content="https://t.me/BIXXcoin_bot" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BinX" />
        <meta
          name="twitter:description"
          content="spin and earn at your comfort"
        />
        <meta
          name="twitter:image"
          content="https://bi-xcoin-7rao.vercel.app/binXcoin.svg"
        />
      </head>
      <GameProvider>
        <body className={`${inter.className}`}>{children}</body>
      </GameProvider>
    </html>
  );
}
