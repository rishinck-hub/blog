import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";

import { MotionProvider } from "@/components/animation/motion-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { siteConfig } from "@/data/site";

import "./globals.css";
import "lenis/dist/lenis.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const displayFont = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <MotionProvider>
          <a className="skip-link" href="#main-content">Skip to main content</a>
          <SiteNavigation />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
