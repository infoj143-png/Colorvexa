import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://colorvexa.com"),
  title: {
    default: "Colorvexa — Free Online Image Color & Palette Utility Tools",
    template: "%s | Colorvexa",
  },
  description:
    "Extract colors from images, generate beautiful palettes, convert color formats (HEX, RGB, HSL), and check color contrast directly in your browser.",
  keywords: [
    "color extractor",
    "image color picker",
    "palette generator",
    "dominant color extractor",
    "color converter",
    "HEX to RGB",
    "RGB to HSL",
    "contrast checker",
    "WCAG accessibility",
    "design utilities",
  ],
  authors: [{ name: "Colorvexa" }],
  creator: "Colorvexa",
  publisher: "Colorvexa",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://colorvexa.com",
    siteName: "Colorvexa",
    title: "Colorvexa — Free Online Image Color & Palette Utility Tools",
    description:
      "Free client-side color utility platform. Extract colors, build palettes, convert codes, and check WCAG color contrast instantly in your browser.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colorvexa — Free Online Image Color & Palette Utility Tools",
    description:
      "Free client-side color utility platform for designers, developers, and creators.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-400 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
