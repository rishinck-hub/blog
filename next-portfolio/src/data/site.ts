import type { NavigationItem, SocialLink } from "@/types/content";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Creative", href: "/creative" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];

const socials = [
  {
    label: "Email",
    value: "rishinkpm@gmail.com",
    href: "mailto:rishinkpm@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "Mohammed Rishin C K",
    href: "https://www.linkedin.com/in/mohammed-rishin-c-k-a00525240/",
  },
  {
    label: "GitHub",
    value: "rishinck-hub",
    href: "https://github.com/rishinck-hub",
  },
  {
    label: "Instagram",
    value: "_rishin___ck",
    href: "https://www.instagram.com/_rishin___ck",
  },
  {
    label: "WhatsApp",
    value: "+91 623 863 4185",
    href: "https://wa.me/916238634185",
  },
] as const satisfies readonly SocialLink[];

export const siteConfig = {
  name: "Mohammed Rishin C K",
  shortName: "Rishin C K",
  url: "https://rishin-portfolio.vercel.app",
  description:
    "Software developer building dependable full-stack applications with thoughtful interfaces and maintainable systems.",
  resumeUrl: "/Mohammed_Rishin_C_K_Software_Developer.pdf",
  navigation,
  socials,
} as const;
