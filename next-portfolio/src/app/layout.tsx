import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, DM_Serif_Display } from "next/font/google";

import { Cursor } from "@/components/animation/cursor";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { siteConfig } from "@/data/site";

import "./globals.css";

const bodyFont = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const displayFont = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const serifFont = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Software Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: `${siteConfig.name} Portfolio`,
    title: `${siteConfig.name} | Software Developer`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} | Software Developer`,
    description: siteConfig.description,
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${serifFont.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <ScrollToTop />
        <Cursor />
        <SiteNavigation />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
