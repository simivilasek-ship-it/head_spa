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

const description =
  "Sarya Head Spa na Ostrožné 8 v Opavě. Mytí, masáž hlavy a péče o pokožku. Rezervace přes Notino.";

export const viewport: Viewport = {
  themeColor: "#34443a",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Head Spa Opava | Sarya Head Spa",
    template: `%s | ${site.name}`,
  },
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "48x48" },
      { url: `${basePath}/logo.png`, type: "image/png", sizes: "512x512" },
    ],
    apple: [
      {
        url: `${basePath}/apple-touch-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Head Spa Opava | Sarya Head Spa",
    description:
      "Head spa v Opavě na Ostrožné 8. Basic, Relax, Man a Keratin Repair.",
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
              "document.documentElement.classList.add('js');try{if(sessionStorage.getItem('sarya_has_loaded')){document.documentElement.dataset.saryaLoaded='1'}else if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('preloader-pending')}}catch(e){}",
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
