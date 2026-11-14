import { GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL } from "@/data/reviews";
import { getReviewsView } from "@/lib/reviews";

const googleMapsSearch =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Sarya Head Spa Opava Ostrožná 8");

const googleReviewsUrl = GOOGLE_REVIEWS_URL.trim() || googleMapsSearch;

export const site = {
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

/** Navigace. Recenze zůstávají i ve simple módu (odkaz na Google). */
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
      "V mém salonu v centru Opavy vás čeká profesionální péče o vlasy a pokožku hlavy, uvolňující masáž a příjemné prostředí, ve kterém si dopřejete chvíle klidu a odpočinku.",
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
      "Stejně ráda tu vítám i muže. Sarya Man je péče uzpůsobená kratším vlasům a pánskému tempu.",
      "Sama mám velmi ráda wellness rituály, chvíle klidu a vše, co pomáhá zpomalit a na chvíli vypnout od každodenních povinností. Právě tato osobní záliba mě přivedla k myšlence vytvořit Sarya Head Spa.",
      "Chtěla jsem spojit to, co mám sama ráda, s péčí o vlasy a pokožku hlavy. Vytvořit prostor, kde se budete cítit příjemně, uvolněně a kde si budete moci dopřát péči, kterou si zasloužíte.",
      "Je to pro mě nová profesní cesta, na které se neustále učím, vzdělávám a posouvám dál. Záleží mi na tom, aby každá návštěva byla příjemným zážitkem a abyste odcházely nejen s pocitem dobře opečovaných vlasů, ale také s lehčí hlavou a úsměvem.",
      "Budu se těšit na vaši návštěvu.",
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
      "Ostrožná 8, klidné a útulné místo, kde se péče o vlasy mění v příjemný zážitek.",
  },
  voucher: {
    kicker: "Dárek",
    title: "Poukazy",
    body: "Dárkový poukaz si můžete vyzvednout osobně v salonu po předchozí domluvě, případně vám jej ráda zašlu v elektronické podobě. Poukaz vystavím podle vašeho přání buď na konkrétní proceduru, nebo na vámi zvolenou finanční částku. Potěšte své blízké dárkem v podobě chvíle odpočinku a péče o sebe.",
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
    note: "Pouze pro vlasy maximálně po ramena.",
    description: "Péče o pokožku hlavy a vlasy s masáží a parní lázní.",
    steps: [
      "Posouzení stavu pokožky hlavy mikrokamerou a volba vhodné péče na míru",
      "Čištění pokožky hlavy",
      "Relaxační mytí šamponem dle typu pokožky hlavy",
      "Masáž hlavy, maska, parní lázeň",
      "Vysušení vlasů",
    ],
    bookingUrl: "",
  },
  {
    name: "Sarya Relax",
    duration: "90 min",
    price: "1 450 Kč",
    note: "",
    description:
      "Delší rituál s masáží hlavy, dekoltu a šíje a prodlouženou péčí.",
    steps: [
      "Posouzení stavu pokožky hlavy mikrokamerou a volba vhodné péče na míru",
      "Uvolňující masáž hlavy, dekoltu a šíje",
      "Čištění pokožky hlavy",
      "2× relaxační mytí šamponem dle typu pokožky hlavy",
      "Prodloužená masáž hlavy, maska, parní lázeň",
      "Vysušení vlasů",
    ],
    bookingUrl: "",
  },
  {
    name: "Sarya Man",
    duration: "60 min",
    price: "900 Kč",
    note: "",
    description: "Head spa pro muže a kratší vlasy.",
    steps: [
      "Uvolňující masáž hlavy",
      "Čištění pokožky hlavy",
      "Relaxační mytí šamponem a masáž",
      "Vysušení vlasů",
    ],
    bookingUrl: "",
  },
  {
    name: "Sarya Keratin Repair",
    duration: "100 min",
    price: "1 800 Kč",
    note: "",
    description: "Vyživující keratinová rekonstrukce pro poškozené vlasy.",
    steps: [
      "Posouzení stavu pokožky hlavy mikrokamerou a volba vhodné péče na míru",
      "Uvolňující masáž hlavy, dekoltu a šíje",
      "Čištění pokožky hlavy",
      "Relaxační mytí vyživujícím šamponem s keratinem",
      "Nanesení vyživující keratinové rekonstrukce a keratin booster",
      "Parní lázeň",
      "Posilující keratinový kondicionér nebo maska (dle typu vlasů)",
      "Posilující bezoplachová keratinová kúra",
      "Vysušení vlasů",
    ],
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
    text: "Vyberte si proceduru a termín na Notinu. Když si nebudete jistí, pište nebo volejte.",
  },
  {
    step: "2",
    title: "Péče",
    text: "Postarám se o vaši pokožku hlavy i vlasy pomocí pečujících rituálů, mytí a uvolňující masáže.",
  },
  {
    step: "3",
    title: "Hotovo",
    text: "Vlasy šetrně vysuším a upravím tak, abyste odcházeli s pocitem svěžesti, lehkosti a krásně ošetřenými vlasy.",
  },
] as const;

export const faqs = [
  {
    q: "Jak dlouho to trvá?",
    a: "Basic a Man 60 minut, Relax 90, Keratin Repair 100. V čase procedury je započítán i čas na vysušení vlasů.",
  },
  {
    q: "Musím si před procedurou umývat vlasy?",
    a: "Nemusíte. Naopak doporučuji si vlasy před procedurou nemýt alespoň 24 hodin. Lépe tak posoudím stav pokožky hlavy.",
  },
  {
    q: "Mám citlivou pokožku. Vadí to?",
    a: "Před procedurou probereme stav vaší pokožky. Péči přizpůsobím tak, aby pro vás byla co nejšetrnější a příjemná. Pokud je pokožka výrazně podrážděná, nebo vykazuje známky zánětu, doporučím proceduru odložit.",
  },
  {
    q: "V čem mám přijít?",
    a: "V čemkoli pohodlném. Vlasy speciálně upravovat nemusíte.",
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
