/**
 * Centrální mapa fotek. Cesty míří do /public.
 * Skutečné fotky salonu od majitelky (listopad 2026).
 */
export const images = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Interiér Sarya Head Spa: procedurní lehátko u okna a zelená stěna salonu",
  },
  about: {
    src: "/images/about.jpg",
    alt: "Head spa lehátko s umyvadlem a botaničkými obrazy v salonu na Ostrožné",
  },
  procedures: {
    "Sarya Basic": {
      src: "/images/procedure-basic.jpg",
      alt: "Černé head spa umyvadlo s vodními tryskami připravené na mytí",
    },
    "Sarya Relax": {
      src: "/images/procedure-relax.jpg",
      alt: "Připravené lehátko, ručníky a kosmetický stolek před procedurou",
    },
    "Sarya Man": {
      src: "/images/procedure-man.jpg",
      alt: "Prostor salonu s lehátkem, policí s ručníky a ambientním světlem",
    },
    "Sarya Keratin Repair": {
      src: "/images/procedure-keratin.jpg",
      alt: "Toaletní stolek s osvětleným zrcadlem a přípravky Davines",
    },
  },
  gallery: [
    {
      src: "/images/gallery-1.jpg",
      alt: "Pohled na lehátko, umyvadlo a botanické obrazy v zeleném salonu",
    },
    {
      src: "/images/gallery-2.jpg",
      alt: "Detail head spa umyvadla s tekoucí vodou při péči o pokožku hlavy",
    },
    {
      src: "/images/gallery-3.jpg",
      alt: "Toaletní stolek se zrcadlem a vitrína s vlasovou kosmetikou",
    },
    {
      src: "/images/gallery-4.jpg",
      alt: "Celkový pohled do salonu Sarya Head Spa s lehátkem a policí",
    },
    {
      src: "/images/hero.jpg",
      alt: "Salon s křeslem, terracotta stěnou a denním světlem z okna",
    },
    {
      src: "/images/procedure-relax.jpg",
      alt: "Lehátko s vozíkem, lampou a připravenými ručníky před návštěvou",
    },
  ] as { src: string; alt: string }[],
} as const;
