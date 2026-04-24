import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MealFinder - Explore Ingredients & Recipes",
  description:
    "Discover meals by ingredients. Explore thousands of recipes powered by TheMealDB.",
  keywords: ["meals", "recipes", "ingredients", "cooking", "food"],
  openGraph: {
    title: "MealFinder - Explore Ingredients & Recipes",
    description: "Discover meals by ingredients.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}
      >
        <Navbar />
        <main className="pt-16 min-h-screen">{children}</main>
        <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
          <p>
            Powered by{" "}
            <a
              href="https://www.themealdb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline"
            >
              TheMealDB
            </a>{" "}
            · Built for CMLABS Practical Test
          </p>
        </footer>
      </body>
    </html>
  );
}
