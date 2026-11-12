import { GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL } from "@/data/reviews";
import { getReviewsView } from "@/lib/reviews";

const googleReviewsUrl = GOOGLE_REVIEWS_URL.trim();

export const site = {
  // Finální doménu potvrdit před ostrým spuštěním.
  url: "https://sarya-headspa.cz",
  name: "Sarya Head Spa",
  legalName: "Sarya Head Spa Opava",
  /** Obchodní jméno provozovatele. Prázdné = v patičce se nevykreslí zvlášť. */
  operatorName: "Šárka Vilášková",
  tagline: "Head spa na Ostrožné",
  city: "Opava",
  street: "Ostrožná 8",
  postalCode: "746 01",
  phone: "+420 732 735 885",
  phoneHref: "tel:+420732735885",
  email: "",
  emailHref: "",
  // WhatsApp: prázdné číslo = tlačítko se skryje. Potvrdit u majitelky.
  whatsappNumber: "420732735885",
  whatsappMessage: "Dobrý den, chtěl/a bych se objednat na head spa.",
  instagram: "@sarya_headspa_opava",
  instagramUrl: "https://www.instagram.com/sarya_headspa_opava/",
  /**
   * Fallback URL pro „Objednat se“ (stránka salonu na Notinu).
   * Konkrétní procedury můžou mít vlastní bookingUrl níže.
   */
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ||
    "https://www.notino.cz/salony/sarya-head-spa_1/",
  cosmetics: "Davines",
  // IČO od majitelky. Prázdné = na webu se nevykreslí.
  ico: "66179432",
  openingHours: {
    label: "Otevřeno dle objednání",
    days: [] as { day: string; hours: string }[],
  },
  googleReviewsUrl,
  googleWriteReviewUrl: GOOGLE_WRITE_REVIEW_URL.trim() || googleReviewsUrl,
} as const;

export const bookingIsExternal = site.bookingUrl.startsWith("http");

const navBase = [
  { href: "#procedury", label: "Procedury" },
  { href: "#o-salonu", label: "O salonu" },
  { href: "#recenze", label: "Recenze" },
  { href: "#poukazy", label: "Poukazy" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

/** Navigace bez Recenze, když nejsou data. */
export function getNav() {
  const showReviews = getReviewsView().enabled;
  return navBase.filter((item) => showReviews || item.href !== "#recenze");
}

/** @deprecated Použij getNav() */
export const nav = navBase;

export const copy = {
  hero: {
    kicker: "Salon na Ostrožné",
    title: "Head spa v Opavě",
    highlights: ["Ostrožná 8, Opava", "Rezervace přes Notino", "Kosmetika Davines"],
    subtitle:
      "Malý salon u centra. Umyju vám vlasy, masíruju pokožku hlavy a nechám vás na chvíli vypnout. 60 až 100 minut, podle procedury.",
    ctaPrimary: "Objednat se",
    ctaSecondary: "Ceník",
  },
  about: {
    kicker: "Zakladatelka",
    title: "O salonu",
    greeting: "Ahoj, já jsem Šárka.",
    paragraphs: [
      "Sarya Head Spa jsem založila sama. Chtěla jsem mít vlastní místo, kam se ženy zastaví nejen kvůli vlasům, ale i proto, že potřebují hodinu klidu.",
      "Chodí i muži. Pro kratší vlasy mám Sarya Man.",
      "Sama mám ráda, když můžu na chvíli vypnout. Proto to tady dělám tak, jak bych to chtěla sama: v klidu, bez spěchu a s péčí, která sedí na vlasy i na pokožku hlavy.",
      "Pořád se učím. Záleží mi na tom, abyste odešli s lepšími vlasy a lehčí hlavou.",
      "Budu se těšit.",
    ],
  },
  procedures: {
    kicker: "Ceník",
    title: "Procedury",
    subtitle:
      "Čtyři varianty. Liší se délkou a tím, co v nich je. Termín berete přes Notino.",
    cta: "Objednat se",
  },
  cosmetics: {
    body: "Pracuju s kosmetikou Davines.",
  },
  visit: {
    kicker: "Jak to chodí",
    title: "Od rezervace po odchod",
  },
  reviews: {
    kicker: "Google",
    title: "Recenze",
    subtitle: "Co napsali lidé na Google. Celé texty jsou tam.",
    ctaRead: "Otevřít Google",
    ctaWrite: "Napsat recenzi",
  },
  gallery: {
    kicker: "Salon",
    title: "Jak to u nás vypadá",
    subtitle:
      "Ostrožná 8. Jedna místnost, lehátko a umyvadlo, ve kterých se dobře odpočívá.",
  },
  voucher: {
    kicker: "Dárek",
    title: "Poukazy",
    body: "Stačí zavolat. Domluvíme hodnotu nebo konkrétní proceduru a připravím poukaz.",
    cta: "Zavolat",
  },
  faq: {
    kicker: "Než přijdete",
    title: "Časté otázky",
  },
  contact: {
    kicker: "Kontakt",
    title: "Kde nás najdete",
    body: "Nejjednodušší je Notino. Když chcete, zavolejte nebo napište na Instagram.",
    cta: "Objednat se",
  },
} as const;

// Časy dle Notina: Basic/Man ~61, Relax ~91, Keratin ~101 min
// bookingUrl u procedury: prázdné / neuvedené = fallback site.bookingUrl (neznámé URL nevymýšlet)
export const procedures = [
  {
    name: "Sarya Basic",
    duration: "60 min",
    price: "1 100 Kč",
    description:
      "Mytí Davines, masáž pokožky hlavy a kúra. Na konci vlasy vysuším.",
    bookingUrl: "",
  },
  {
    name: "Sarya Relax",
    duration: "90 min",
    price: "1 450 Kč",
    description:
      "Delší verze: kamera na pokožku, čištění, masáž a napařování.",
    bookingUrl: "",
  },
  {
    name: "Sarya Man",
    duration: "60 min",
    price: "900 Kč",
    description:
      "Pro muže a kratší vlasy. Mytí, masáž a péče podle stavu vlasů.",
    bookingUrl: "",
  },
  {
    name: "Sarya Keratin Repair",
    duration: "100 min",
    price: "1 800 Kč",
    description: "Keratin na poškozené vlasy. Hebčí vlasy, víc lesku.",
    bookingUrl: "",
  },
] as const;

function priceAmount(price: string) {
  return Number(price.replace(/[^\d]/g, ""));
}

const cheapestProcedure = procedures.reduce((best, item) =>
  priceAmount(item.price) < priceAmount(best.price) ? item : best,
);

/** Faktový pruh / shrnutí. Cena vždy z nejlevnější procedury v ceníku. */
export const facts = [
  { value: site.street, label: site.city },
  {
    value: `od ${cheapestProcedure.price}`,
    label: "Sarya Man",
  },
] as const;

export const visitSteps = [
  {
    step: "1",
    title: "Rezervace",
    text: "Vyberete proceduru a termín na Notinu. Když si nejste jistí, zavolejte.",
  },
  {
    step: "2",
    title: "Péče",
    text: "Lehnete si. Mytí, práce s pokožkou, masáž. Když něco nebude sedět, stačí říct.",
  },
  {
    step: "3",
    title: "Hotovo",
    text: "Vlasy vysuším, krátce to uzavřeme a máte hotovo.",
  },
] as const;

export const faqs = [
  {
    q: "Jak dlouho to trvá?",
    a: "Basic a Man 60 minut, Relax 90, Keratin Repair 100.",
  },
  {
    q: "V čem mám přijít?",
    a: "V čemkoli pohodlném. Vlasy speciálně upravovat nemusíte.",
  },
  {
    q: "Mám citlivou pokožku. Vadí to?",
    a: "Napište to předem. Používám Davines a postup upravím.",
  },
  {
    q: "Můžu přijít i jako muž?",
    a: "Ano. Sarya Man je právě na kratší vlasy.",
  },
  {
    q: "Jak zrušit nebo posunout termín?",
    a: "Dejte vědět co nejdřív telefonem nebo přes Instagram, ať místo můžu nabídnout dál.",
    // TODO: doplnit přesné storno podmínky, až je majitelka potvrdí
  },
] as const;
