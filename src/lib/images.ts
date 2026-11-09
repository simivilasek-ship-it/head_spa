/**
 * Centrální mapa fotek. Cesty míří do /public.
 * Skutečné fotky salonu od majitelky (listopad 2026).
 */
export const images = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Sarya Head Spa — procedurní lehátko a interiér salonu",
  },
  about: {
    src: "/images/about.jpg",
    alt: "Procedurní lehátko a head spa umyvadlo v salonu",
  },
  procedures: {
    "Sarya Basic": {
      src: "/images/procedure-basic.jpg",
      alt: "Head spa umyvadlo s vodními tryskami",
    },
    "Sarya Relax": {
      src: "/images/procedure-relax.jpg",
      alt: "Připravené lehátko a kosmetický stolek",
    },
    "Sarya Man": {
      src: "/images/procedure-man.jpg",
      alt: "Prostor salonu s lehátkem a policí s ručníky",
    },
    "Sarya Keratin Repair": {
      src: "/images/procedure-keratin.jpg",
      alt: "Toaletní stolek s osvětleným zrcadlem",
    },
  },
  gallery: [
    {
      src: "/images/gallery-1.jpg",
      alt: "Lehátko, umyvadlo a botanické obrazy",
    },
    {
      src: "/images/gallery-2.jpg",
      alt: "Detail head spa umyvadla s vodou",
    },
    {
      src: "/images/gallery-3.jpg",
      alt: "Toaletní stolek a vitrína s produkty",
    },
    {
      src: "/images/gallery-4.jpg",
      alt: "Celkový pohled do salonu",
    },
    {
      src: "/images/hero.jpg",
      alt: "Salon s křeslem a terracotta stěnou",
    },
    {
      src: "/images/procedure-relax.jpg",
      alt: "Lehátko s vozíkem a lampou",
    },
  ] as { src: string; alt: string }[],
} as const;
