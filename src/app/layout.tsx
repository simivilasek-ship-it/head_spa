import type { Metadata, Viewport } from "next";
import { Gelasio } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { JsonLd } from "@/components/JsonLd";
import { Preloader } from "@/components/Preloader";
import { site } from "@/lib/content";
import { images } from "@/lib/images";
import "./globals.css";

/** Stejný prefix jako `basePath` ve static exportu (prázdný na kořenové doméně). */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const ogImage = images.gallery.find(
  (item) => item.src === "/images/gallery-4.jpg",
);

const serif = Gelasio({
  variable: "--font-gelasio",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const title = "Head Spa Opava | Sarya Head Spa";
const description =
  "Head spa Opava na Ostrožné 8. Mytí vlasů, masáž hlavy a péče o pokožku. Headspa v centru Opavy, rezervace přes Notino.";

const keywords = [
  "head spa Opava",
  "headspa Opava",
  "head spa",
  "masáž hlavy Opava",
  "mytí vlasů Opava",
  "péče o pokožku hlavy",
  "Sarya Head Spa",
  "Sarya",
  "Ostrožná",
  "Opava",
  "Davines",
  "keratin Opava",
  "salon Opava",
];

export const viewport: Viewport = {
  themeColor: "#34443a",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  keywords,
  authors: [{ name: site.operatorName || site.legalName }],
  creator: site.operatorName || site.legalName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "any" },
      {
        url: `${basePath}/favicon-16x16.png`,
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: `${basePath}/favicon-32x32.png`,
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: `${basePath}/favicon-48x48.png`,
        type: "image/png",
        sizes: "48x48",
      },
      {
        url: `${basePath}/android-chrome-192x192.png`,
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: `${basePath}/android-chrome-512x512.png`,
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: `${basePath}/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: `${basePath}/site.webmanifest`,
  openGraph: {
    title,
    description,
    url: site.url,
    locale: "cs_CZ",
    type: "website",
    siteName: site.name,
    images: ogImage
      ? [
          {
            url: ogImage.src,
            width: 2000,
            height: 1500,
            alt: ogImage.alt,
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ogImage ? [ogImage.src] : undefined,
  },
  other: {
    "geo.region": "CZ-MO",
    "geo.placename": "Opava",
    "geo.position": "49.9378825;17.9026238",
    ICBM: "49.9378825, 17.9026238",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${serif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(location.protocol==='http:'&&/^(www\\.)?sarya-headspa\\.cz$/i.test(location.hostname)){location.replace('https://'+location.host+location.pathname+location.search+location.hash)}document.documentElement.classList.add('js');try{if(sessionStorage.getItem('sarya_has_loaded')){document.documentElement.dataset.saryaLoaded='1'}else if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('preloader-pending')}}catch(e){}",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <Preloader />
        <JsonLd />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
