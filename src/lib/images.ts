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
      alt: "Dvě botanické obrazy nad umyvadlem, vozík s kosmetikou a lehátko u okna",
    },
    {
      src: "/images/gallery-2.jpg",
      alt: "Proudy vody z head spa umyvadla, v pozadí lehátko a toaletka se zrcadlem",
    },
    {
      src: "/images/gallery-3.jpg",
      alt: "Toaletní stolek s kulatým osvětleným zrcadlem, vitrína a dvě křesla",
    },
    {
      src: "/images/gallery-4.jpg",
      alt: "Lehátko s okrovou dekou u okna, police s ručníky a béžové křeslo",
    },
    {
      src: "/images/procedure-relax.jpg",
      alt: "Pohled z lehátka na umyvadlo, vozík a lampu u dřevěné stěny",
    },
  ] as { src: string; alt: string }[],
} as const;
