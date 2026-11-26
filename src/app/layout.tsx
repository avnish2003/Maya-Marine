import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { MEDIA } from "@/data/site";
import "./globals.css";

/* Google Fonts — self-hosted by next/font for performance */
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], weight: ["500", "600", "700", "800"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const title = "Maya Marine & Logistics (MMAL) | Towage, Shipyard & Offshore Services";
const description =
  "ISO 9001:2015 certified marine company in Bhavnagar, Gujarat. Harbour & coastal towage, 24/7 emergency support, dry dock, naval refits, offshore & subsea engineering and marine logistics. Offices in Ghogha, Ahmedabad, Dubai and London.";

/* SEO + Open Graph (replace metadataBase with the live domain) */
export const metadata: Metadata = {
  metadataBase: new URL("https://mayamarine.in"),
  title,
  description,
  keywords: ["marine services Gujarat", "tug services Bhavnagar", "harbour towage India", "dry dock Gujarat", "offshore engineering", "naval refits", "marine logistics", "MMAL"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Maya Marine & Logistics", title, description, url: "/", locale: "en_IN", images: [{ url: MEDIA.ogImage, width: 1200, height: 1800, alt: "Tugboats escorting a bulk carrier at sea" }] },
  twitter: { card: "summary_large_image", title, description, images: [MEDIA.ogImage] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#091853", width: "device-width", initialScale: 1 };

/* Runs before paint: enables animation start-states only when JS runs and the
   user has not asked for reduced motion (no flash, no hidden content without JS). */
const motionFlag = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim','is-loading')}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://videos.pexels.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
