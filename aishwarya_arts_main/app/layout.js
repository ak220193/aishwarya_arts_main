import { Poppins, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/HomePage/Header";
import Footer from "./components/HomePage/Footer";
import Whatsapp from "./components/HomePage/whatsapp";

const font = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: {
    default:
      "Aishwarya Art Gallery – Buy Handmade Paintings & Art Collections Online",
    template: "%s | Aishwarya Art Gallery",
  },
  description:
    "Discover Aishwarya Art Gallery — a curated space for handmade paintings, sculptures, and modern artworks. Explore exhibitions, shop online, and bring home artistic elegance crafted by talented Indian artists.",
  keywords: [
    "Aishwarya Art Gallery",
    "art gallery Namakkal",
    "buy paintings online",
    "handmade art India",
    "modern art collections",
    "wall paintings for home",
    "Indian art store",
    "sculpture art gallery",
    "Namakkal art exhibitions",
    "original Indian paintings",
  ],
  openGraph: {
    title: "Aishwarya Art Gallery – Handmade Paintings & Sculptures",
    description:
      "Explore and shop curated Indian artworks from Aishwarya Art Gallery. Discover exclusive exhibitions and timeless art collections.",
    url: "https://aishwaryaartgallery.com",
    siteName: "Aishwarya Art Gallery",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://aishwaryaartgallery.com/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aishwarya Art Gallery - Handmade Paintings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aishwarya Art Gallery – Buy Art & Paintings Online",
    description:
      "Shop exquisite handmade paintings, modern artworks, and sculptures from Aishwarya Art Gallery, India.",
    images: ["https://aishwaryaartgallery.com/assets/og-image.jpg"],
  },
  alternates: {
    canonical: "https://aishwaryaartgallery.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Aishwarya Art Gallery",
              url: "https://aishwaryaartgallery.com",
              logo: "https://aishwaryaartgallery.com/assets/logo.png",
            }),
          }}
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${font.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Whatsapp />
      </body>
    </html>
  );
}
