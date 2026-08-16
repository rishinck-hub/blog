import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import Script from "next/script";

import { CursorLabel } from "@/components/animation/cursor-label";
import { FirstVisitLoader } from "@/components/animation/first-visit-loader";
import { MotionProvider } from "@/components/animation/motion-provider";
import { RouteTransitionProvider } from "@/components/animation/route-transition-provider";
import { ContactModalProvider } from "@/components/contact/contact-modal";
import { ContactDock } from "@/components/contact/contact-dock";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavigation } from "@/components/navigation/site-navigation";
import { siteConfig, technologies } from "@/data/site";

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
  keywords: ["Mohammed Rishin C K", "software developer", "full-stack developer", "Laravel", "React", "Django REST", "India"],
  category: "technology",
  alternates: { canonical: siteConfig.url },
  formatDetection: { email: false, address: false, telephone: false },
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: `${siteConfig.name} Portfolio`,
    title: `${siteConfig.name} | Software Developer`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} — Software Developer` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Software Developer`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        image: `${siteConfig.url}/profile.png`,
        jobTitle: "Software Developer",
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Malabar College of Engineering and Technology" },
        sameAs: [siteConfig.socials[1].href, siteConfig.socials[2].href, siteConfig.socials[3].href],
        knowsAbout: technologies,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${siteConfig.name} Portfolio`,
        description: siteConfig.description,
        author: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "en-IN",
      },
    ],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
        <Script id="first-visit-loader-gate" strategy="beforeInteractive">
          {`try{var r=document.documentElement;var seen=sessionStorage.getItem("rishin-loader-seen");var off=matchMedia("(prefers-reduced-motion: reduce)").matches;var mobile=matchMedia("(max-width:640px)").matches;var precise=matchMedia("(hover:hover) and (pointer:fine)").matches;var slow=navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;r.dataset.motionLevel=off?"off":mobile?"essential":precise&&!slow?"full":"reduced";r.dataset.firstVisitLoader=!seen&&!off&&!slow?"show":"skip";if(r.dataset.firstVisitLoader==="show")sessionStorage.setItem("rishin-loader-seen","1")}catch(e){document.documentElement.dataset.motionLevel="off";document.documentElement.dataset.firstVisitLoader="skip"}`}
        </Script>
        <FirstVisitLoader />
        <RouteTransitionProvider />
        <MotionProvider>
          <ContactModalProvider>
            <a className="skip-link" href="#main-content">Skip to main content</a>
            <SiteNavigation />
            <main id="main-content">{children}</main>
            <SiteFooter />
            <ContactDock />
            <CursorLabel />
          </ContactModalProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
