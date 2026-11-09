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
  whatsappMessage: "Dobrý den, chtěl/a bych se objednat.",
  instagram: "@sarya_headspa_opava",
  instagramUrl: "https://www.instagram.com/sarya_headspa_opava/",
  /**
   * TODO majitelka: doplnit přesný Notino odkaz do .env.local:
   * NEXT_PUBLIC_BOOKING_URL=https://...
   * Bez něj tlačítka „Objednat se“ vedou na kontaktní sekci (#kontakt).
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
  { href: "#poukazy", label: "Poukazy" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const copy = {
  hero: {
    kicker: "Head spa · Opava",
    title: "Relax v srdci Opavy",
    highlights: ["Ostrožná 8, Opava", "Rezervace přes Notino", "Kosmetika Davines"],
    subtitle:
      "Malý salon na Ostrožné. Masáž hlavy, mytí a péče o pokožku, podle toho, co zrovna potřebujete.",
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
      "Sama mám velmi ráda wellness rituály, chvíle klidu a vše, co pomáhá zpomalit a na chvíli vypnout od každodenních povinností. Právě tato osobní záliba mě přivedla k myšlence vytvořit Sarya Head Spa.",
      "Chtěla jsem spojit to, co mám sama ráda, s péčí o vlasy a pokožku hlavy. Vytvořit prostor, kde se budete cítit příjemně, uvolněně a kde si budete moci dopřát péči, kterou si zasloužíte.",
      "Je to pro mě nová profesní cesta, na které se neustále učím, vzdělávám a posouvám dál. Záleží mi na tom, aby každá návštěva byla příjemným zážitkem a abyste odcházely nejen s pocitem dobře opečovaných vlasů, ale také s lehčí hlavou a úsměvem.",
      "Budu se těšit na vaši návštěvu.",
    ],
  },
  procedures: {
    kicker: "Co nabízíme",
    title: "Procedury a ceník",
    subtitle: "Čtyři procedury. Liší se délkou a průběhem péče.",
    cta: "Objednat se",
  },
  cosmetics: {
    body: "Pracujeme s vlasovou kosmetikou Davines.",
  },
  visit: {
    kicker: "Vaše návštěva",
    title: "Jak to probíhá",
  },
  voucher: {
    kicker: "Pro vaše blízké",
    title: "Dárkové poukazy",
    body: "Poukaz domluvíme po telefonu. Na poukaz napíšeme hodnotu nebo proceduru, kterou chcete darovat.",
    cta: "Zavolat",
  },
  faq: {
    kicker: "Než přijdete",
    title: "Časté otázky",
  },
  contact: {
    kicker: "Kde nás najdete",
    title: "Kontakt",
    body: "Objednejte se přes Notino, zavolejte, nebo napište na Instagram.",
    cta: "Objednat se",
  },
} as const;

// Časy dle Notina: Basic/Man ~61, Relax ~91, Keratin ~101 min
export const procedures = [
  {
    name: "Sarya Basic",
    duration: "60 min",
    price: "1 100 Kč",
    description:
      "Mytí Davines, masáž pokožky hlavy a výživná péče. Zakončení šetrným vysušením.",
  },
  {
    name: "Sarya Relax",
    duration: "90 min",
    price: "1 450 Kč",
    description:
      "Komplexní rituál s trichologickou kamerou, čištěním, masáží a napařováním.",
  },
  {
    name: "Sarya Man",
    duration: "60 min",
    price: "900 Kč",
    description:
      "Pánský rituál: mytí, masáž pokožky hlavy a péče podle potřeb vlasů.",
  },
  {
    name: "Sarya Keratin Repair",
    duration: "100 min",
    price: "1 800 Kč",
    description:
      "Intenzivní keratinová rekonstrukce. Síla, hebkost a lesk poškozených vlasů.",
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
  { value: `od ${cheapestProcedure.price}`, label: cheapestProcedure.name },
] as const;

export const visitSteps = [
  {
    step: "1",
    title: "Domluva",
    text: "Vyberete proceduru a termín. Když si nejste jistí, zavolejte, poradíme.",
  },
  {
    step: "2",
    title: "Péče",
    text: "Mytí, práce s pokožkou a masáž hlavy. Když vám něco nebude sedět, stačí říct.",
  },
  {
    step: "3",
    title: "Na závěr",
    text: "Sušení, krátké zakončení a prostor na otázky.",
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
    a: "Napište nám to předem. Používáme Davines a péči upravíme.",
  },
  {
    q: "Hodí se péče i pro muže?",
    a: "Ano. Sarya Man je speciálně připravený rituál pro muže a krátké vlasy.",
  },
  {
    q: "Jak zrušit nebo změnit termín?",
    a: "Dejte vědět co nejdřív telefonem nebo přes Instagram, ať termín můžeme nabídnout dál.",
    // TODO: doplnit přesné storno podmínky, až je majitelka potvrdí
  },
] as const;
