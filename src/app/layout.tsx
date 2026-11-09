import type { Metadata, Viewport } from "next";
import { Gelasio } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { JsonLd } from "@/components/JsonLd";
import { Preloader } from "@/components/Preloader";
import { site } from "@/lib/content";
import "./globals.css";

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
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Head Spa Opava | Sarya Head Spa",
    description:
      "Head spa v Opavě na Ostrožné 8. Basic, Relax, Man a Keratin Repair.",
    url: site.url,
    locale: "cs_CZ",
    type: "website",
    siteName: site.name,
    // TODO: doplnit OG obrázek 1200×630 ze skutečné fotky salonu
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
