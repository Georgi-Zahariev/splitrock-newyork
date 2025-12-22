import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SplitRock - Professional Landscaping & Outdoor Construction | New York",
  description: "Transform your outdoor space with SplitRock's professional landscaping and outdoor construction services in New York. Specializing in lawn care, patios, decks, pergolas, and complete outdoor living spaces. Licensed & insured with 10+ years experience.",
  keywords: ["landscaping", "outdoor construction", "lawn care", "patios", "decks", "pergolas", "New York", "Albany", "outdoor living"],
  authors: [{ name: "SplitRock Landscaping" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://splitrock-ny.com",
    title: "SplitRock - Professional Landscaping & Outdoor Construction",
    description: "Transform your outdoor space with professional landscaping services in New York. Licensed & insured with 10+ years experience.",
    siteName: "SplitRock Landscaping",
  },
  twitter: {
    card: "summary_large_image",
    title: "SplitRock - Professional Landscaping & Outdoor Construction",
    description: "Transform your outdoor space with professional landscaping services in New York.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://splitrock-ny.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased w-full overflow-x-hidden bg-white`}>
        <div className="w-full min-h-screen flex flex-col items-center">
          <div className="w-full max-w-[2000px] mx-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
