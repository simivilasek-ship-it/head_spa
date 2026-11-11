/**
 * Centrální mapa fotek. Cesty míří do /public.
 * Skutečné fotky salonu od majitelky (listopad 2026).
 */
export const images = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Lehátko u okna v salonu Sarya Head Spa",
  },
  about: {
    src: "/images/about.jpg",
    alt: "Lehátko a umyvadlo v salonu na Ostrožné",
  },
  procedures: {
    "Sarya Basic": {
      src: "/images/procedure-basic.jpg",
      alt: "Umyvadlo připravené na mytí",
    },
    "Sarya Relax": {
      src: "/images/procedure-relax.jpg",
      alt: "Lehátko a stolek před procedurou",
    },
    "Sarya Man": {
      src: "/images/procedure-man.jpg",
      alt: "Salon s lehátkem a policí s ručníky",
    },
    "Sarya Keratin Repair": {
      src: "/images/procedure-keratin.jpg",
      alt: "Toaletka se zrcadlem a přípravky Davines",
    },
  },
  gallery: [
    {
      src: "/images/gallery-1.jpg",
      alt: "Umyvadlo, vozík s kosmetikou a lehátko u okna",
    },
    {
      src: "/images/gallery-2.jpg",
      alt: "Voda z umyvadla, v pozadí lehátko",
    },
    {
      src: "/images/gallery-3.jpg",
      alt: "Toaletka se zrcadlem a dvě křesla",
    },
    {
      src: "/images/gallery-4.jpg",
      alt: "Lehátko u okna a police s ručníky",
    },
    {
      src: "/images/procedure-relax.jpg",
      alt: "Pohled z lehátka na umyvadlo",
    },
  ] as { src: string; alt: string }[],
} as const;
