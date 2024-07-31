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
    <html lang="en">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <GameProvider>
        {" "}
        <body className={inter.className}>{children}</body>
      </GameProvider>
    </html>
  );
}
