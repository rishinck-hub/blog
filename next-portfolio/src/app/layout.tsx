import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import Script from "next/script";

import { CursorLabel } from "@/components/animation/cursor-label";
import { FirstVisitLoader } from "@/components/animation/first-visit-loader";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <Script id="first-visit-loader-gate" strategy="beforeInteractive">
          {`try{var r=document.documentElement;var seen=sessionStorage.getItem("rishin-loader-seen");var reduced=matchMedia("(prefers-reduced-motion: reduce),(pointer: coarse)").matches;var slow=navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;r.dataset.firstVisitLoader=!seen&&!reduced&&!slow?"show":"skip";if(r.dataset.firstVisitLoader==="show")sessionStorage.setItem("rishin-loader-seen","1")}catch(e){document.documentElement.dataset.firstVisitLoader="skip"}`}
        </Script>
        <FirstVisitLoader />
        <MotionProvider>
          <a className="skip-link" href="#main-content">Skip to main content</a>
          <SiteNavigation />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <CursorLabel />
        </MotionProvider>
      </body>
    </html>
  );
}
