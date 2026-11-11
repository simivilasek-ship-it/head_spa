import { faqs, procedures, site } from "@/lib/content";
import { getReviewsView, validIsoDate } from "@/lib/reviews";

export function JsonLd() {
  // Stejná data a stejná pravidla jako sekce Recenze, aby JSON-LD odpovídal viditelnému obsahu.
  const reviews = getReviewsView();
  const showReviews = reviews.mode === "full" && reviews.rating !== null;

  const salon = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${site.url}/#salon`,
    name: site.legalName,
    description:
      "Head spa na Ostrožné 8 v Opavě. Mytí, masáž hlavy a péče o pokožku.",
    url: site.url,
    telephone: site.phone,
    image: `${site.url}/logo.png`,
    logo: `${site.url}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: site.city,
      postalCode: site.postalCode,
      addressCountry: "CZ",
    },
    sameAs: [site.instagramUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Procedury",
      itemListElement: procedures.map((item) => ({
        "@type": "Offer",
        price: item.price.replace(/\D/g, ""),
        priceCurrency: "CZK",
        itemOffered: { "@type": "Service", name: item.name },
      })),
    },
    // Otevírací doba je „dle objednání“ — bez konkrétních dnů a časů se do schema.org nezapisuje.
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([salon, faqPage]) }}
    />
  );
}
