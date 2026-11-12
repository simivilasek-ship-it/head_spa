import type { Metadata } from "next";
import Link from "next/link";
import { ScrollDrivenScene } from "@/components/ScrollDrivenScene";

export const metadata: Metadata = {
  title: "Scrolly 3D",
  robots: { index: false, follow: false },
};

export default function Scrolly3dPage() {
  return (
    <main className="bg-ink text-cream">
      <header className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-4 md:px-10">
        <p className="text-sm font-semibold tracking-wide">Sarya · scrolly 3D</p>
        <Link
          href="/"
          className="text-sm text-sage-light no-underline transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-light"
        >
          ← Zpět na web
        </Link>
      </header>

      <div className="flex h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-sage-light">
          Testovací stránka
        </p>
        <h1 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-4xl font-semibold md:text-5xl">
          Scroll-driven 3D
        </h1>
        <p className="mt-4 max-w-md text-sm text-cream/75 md:text-base">
          Scrollujte dolů. Objekt se otočí, ustoupí doleva a na konci se kamera
          přiblíží k materiálu.
        </p>
      </div>

      <ScrollDrivenScene />

      <div className="flex h-[50vh] items-center justify-center px-6 text-center text-cream/70">
        Konec scény. Můžete se vrátit nahoru nebo na hlavní web.
      </div>
    </main>
  );
}
