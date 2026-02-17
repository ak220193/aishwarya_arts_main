import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/HomePage/Header";
import Footer from "./components/HomePage/Footer";
import { Toaster } from "react-hot-toast";
import Whatsapp from "./components/HomePage/whatsapp";
import Providers from "./providers";


const font = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
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
              logo: "https://aishwaryaartgallery.com/logo.png",
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
        <Providers>
          <Header />
          <main className="flex-1">
            <Toaster position="top-center" />
            {children}
          </main>
          <Footer />
          <Whatsapp />
        </Providers>
      </body>
    </html>
  );
}


