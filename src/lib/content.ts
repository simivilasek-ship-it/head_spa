export const site = {
  // TODO: potvrdit finální doménu před spuštěním
  url: "https://sarya-headspa.cz",
  name: "Sarya Head Spa",
  legalName: "Sarya Head Spa Opava",
  tagline: "Relax v srdci Opavy",
  city: "Opava",
  street: "Ostrožná 8",
  postalCode: "746 01",
  phone: "+420 732 735 885",
  phoneHref: "tel:+420732735885",
  // TODO majitelka: potvrdit, že na tomto čísle běží WhatsApp — prázdné = tlačítko se skryje
  whatsappNumber: "420732735885",
  whatsappMessage: "Dobrý den, chtěl/a bych se objednat na head spa.",
  instagram: "@sarya_headspa_opava",
  instagramUrl: "https://www.instagram.com/sarya_headspa_opava/",
  /**
   * Jediný zdroj URL pro všechna tlačítka „Objednat se“ (BookingButton).
   * Nastav NEXT_PUBLIC_BOOKING_URL v .env.local / CI — bez něj fallback #kontakt.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "#kontakt",
  cosmetics: "Davines",
  // TODO: doplnit IČO od majitelky — dokud je prázdné, na webu se nezobrazí
  ico: "",
  openingHours: {
    // TODO: doplnit konkrétní dny a hodiny — dokud je label prázdný, sekce se skryje
    label: "",
    days: [] as { day: string; hours: string }[],
  },
} as const;

export const bookingIsExternal = site.bookingUrl.startsWith("http");

export const nav = [
  { href: "#procedury", label: "Procedury" },
  { href: "#o-salonu", label: "O salonu" },
  { href: "#recenze", label: "Recenze" },
  { href: "#poukazy", label: "Poukazy" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const copy = {
  hero: {
    kicker: "Head spa · Opava",
    title: "Relax v srdci Opavy",
    highlights: ["Ostrožná 8, Opava", "Rezervace přes Notino", "Kosmetika Davines"],
    subtitle:
      "Malý salon na Ostrožné. Mytí, masáž hlavy a péče o pokožku — 60 až 100 minut, podle toho, co zrovna potřebujete.",
    ctaPrimary: "Objednat se",
    ctaSecondary: "Ceník",
  },
  about: {
    kicker: "Zakladatelka",
    title: "O salonu",
    greeting: "Ahoj, já jsem Šárka.",
    paragraphs: [
      "Jsem zakladatelkou Sarya Head Spa a ráda bych vám trochu přiblížila, jak to celé začalo.",
      "Vždycky jsem si přála vytvořit něco vlastního. Místo, které bude mít příjemnou atmosféru a kam budou ženy přicházet nejen za péčí o své vlasy, ale také za odpočinkem a chvílí jen pro sebe.",
      "Stejně ráda tu vítám i muže — Sarya Man je péče uzpůsobená kratším vlasům a pánskému tempu.",
      "Sama mám velmi ráda wellness rituály, chvíle klidu a vše, co pomáhá zpomalit a na chvíli vypnout od každodenních povinností. Právě tato osobní záliba mě přivedla k myšlence vytvořit Sarya Head Spa.",
      "Chtěla jsem spojit to, co mám sama ráda, s péčí o vlasy a pokožku hlavy. Vytvořit prostor, kde se budete cítit příjemně, uvolněně a kde si budete moci dopřát péči, kterou si zasloužíte.",
      "Je to pro mě nová profesní cesta, na které se neustále učím, vzdělávám a posouvám dál. Záleží mi na tom, aby každá návštěva byla příjemným zážitkem a abyste odcházely nejen s pocitem dobře opečovaných vlasů, ale také s lehčí hlavou a úsměvem.",
      "Budu se těšit na vaši návštěvu.",
    ],
  },
  procedures: {
    kicker: "Co nabízíme",
    title: "Procedury a ceník",
    subtitle: "Čtyři procedury. Od krátké péče po keratin — liší se hlavně délkou.",
    cta: "Objednat se",
  },
  cosmetics: {
    body: "Pracujeme s kosmetikou Davines",
  },
  visit: {
    kicker: "Vaše návštěva",
    title: "Jak to probíhá",
  },
  reviews: {
    kicker: "Co říkají klienti",
    title: "Recenze",
    subtitle: "Krátké střípky z návštěv — doplníme reálnými zkušenostmi.",
  },
  voucher: {
    kicker: "Pro vaše blízké",
    title: "Dárkové poukazy",
    body: "Poukaz domluvíme po telefonu. Napíšeme na něj hodnotu nebo konkrétní proceduru.",
    cta: "Zavolat",
  },
  faq: {
    kicker: "Než přijdete",
    title: "Časté otázky",
  },
  contact: {
    kicker: "Kde nás najdete",
    title: "Kontakt",
    body: "Nejjednodušší je rezervace přes Notino. Můžete taky zavolat nebo napsat na Instagram.",
    cta: "Objednat se",
  },
} as const;

/** TODO: nahradit zástupnými kartami reálné recenze (jméno, hodnocení, text). */
export const reviews = [
  {
    name: "TODO — jméno 1",
    rating: 5,
    text: "TODO: krátká reálná recenze od klientky nebo klienta.",
  },
  {
    name: "TODO — jméno 2",
    rating: 5,
    text: "TODO: krátká reálná recenze od klientky nebo klienta.",
  },
  {
    name: "TODO — jméno 3",
    rating: 5,
    text: "TODO: krátká reálná recenze od klientky nebo klienta.",
  },
] as const;

// Časy dle Notina: Basic/Man ~61, Relax ~91, Keratin ~101 min
export const procedures = [
  {
    name: "Sarya Basic",
    duration: "60 min",
    price: "1 100 Kč",
    description:
      "Mytí Davines, masáž pokožky hlavy a výživná kúra. Na konci vlasy šetrně vysuším.",
  },
  {
    name: "Sarya Relax",
    duration: "90 min",
    price: "1 450 Kč",
    description:
      "Delší péče: pohled trichologickou kamerou, čištění, masáž a napařování.",
  },
  {
    name: "Sarya Man",
    duration: "60 min",
    price: "900 Kč",
    description:
      "Pro muže a kratší vlasy: mytí, masáž pokožky hlavy a péče podle stavu vlasů.",
  },
  {
    name: "Sarya Keratin Repair",
    duration: "100 min",
    price: "1 800 Kč",
    description:
      "Keratinová kúra pro poškozené vlasy — hebčí omak a víc lesku.",
  },
] as const;

function priceAmount(price: string) {
  return Number(price.replace(/[^\d]/g, ""));
}

const cheapestProcedure = procedures.reduce((best, item) =>
  priceAmount(item.price) < priceAmount(best.price) ? item : best,
);

/** Faktový pruh / shrnutí — cena vždy z nejlevnější procedury v ceníku. */
export const facts = [
  { value: site.street, label: site.city },
  {
    value: `od ${cheapestProcedure.price}`,
    label: "Sarya Man (pánská péče)",
  },
] as const;

export const visitSteps = [
  {
    step: "1",
    title: "Domluva",
    text: "Vyberete proceduru a termín. Když si nejste jistí, zavolejte — poradím.",
  },
  {
    step: "2",
    title: "Péče",
    text: "Mytí, práce s pokožkou a masáž hlavy. Když vám něco nebude sedět, stačí říct.",
  },
  {
    step: "3",
    title: "Na závěr",
    text: "Sušení, krátké zakončení a prostor na otázky, kdybyste něco potřebovali.",
  },
] as const;

export const faqs = [
  {
    q: "Jak dlouho procedury trvají?",
    a: "Basic a Man 60 minut, Relax 90 minut, Keratin Repair 100 minut.",
  },
  {
    q: "V čem přijít?",
    a: "V pohodlném oblečení. Vlasy speciálně upravovat nemusíte.",
  },
  {
    q: "Mám citlivou pokožku. Vadí to?",
    a: "Napište to předem. Používám Davines a péči upravím.",
  },
  {
    q: "Hodí se péče i pro muže?",
    a: "Ano. Sarya Man je péče pro muže a kratší vlasy.",
  },
  {
    q: "Jak zrušit nebo změnit termín?",
    a: "Dejte vědět co nejdřív telefonem nebo přes Instagram, ať termín můžu nabídnout dál.",
    // TODO: doplnit přesné storno podmínky, až je majitelka potvrdí
  },
] as const;
