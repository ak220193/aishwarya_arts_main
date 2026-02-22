import { Titillium_Web } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";


const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  variable: "--font-titillium",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://aishwaryaartgallery.com"),
  title: {
    default: "Aishwarya Arts | Authentic Tanjore Handmade Paintings",
    template: "%s | Aishwarya Arts",
  },
  description:
    "Premium handmade Tanjore paintings and traditional Indian art. Explore curated collections of artistic elegance crafted by expert artists at Aishwarya Arts.",
  keywords: [
    "Tanjore Paintings",
    "Handmade Indian Art",
    "Aishwarya Arts Namakkal",
    "Traditional Gold Leaf Paintings",
    "Buy Tanjore Art Online",
  ],
  openGraph: {
    title: "Aishwarya Arts – Traditional Handmade Paintings",
    description:
      "Exquisite handmade Tanjore paintings and traditional artworks for your home and office.",
    url: "/",
    siteName: "Aishwarya Arts",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aishwarya Arts - Tanjore Paintings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aishwarya Arts | Buy Traditional Art Online",
    images: ["/assets/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aishwarya Art Gallery",
    url: "https://aishwaryaartgallery.com",
    logo: "https://aishwaryaartgallery.com/logo.png",
  };
   
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${titillium.variable} antialiased font-sans`}>
        <Providers>
          <Toaster position="top-center" />
          {/* This renders either the (shop) layout or the (admin) layout */}
          {children}
        </Providers>
      </body>
    </html>
  );
}