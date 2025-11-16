import type { Metadata } from "next";
import { Bricolage_Grotesque, Poppins, Red_Hat_Mono } from "next/font/google";
import "./globals.css";

const sans = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const technical = Red_Hat_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ziv Cocktails Admin Console",
  description: "Internal control center for Ziv cocktail workshops & events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.className} ${display.variable} ${technical.variable} bg-[var(--color-bg-page)] text-[var(--color-text-primary)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
