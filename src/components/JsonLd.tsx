import { faqs, procedures, site } from "@/lib/content";
import { getReviewsView, validIsoDate } from "@/lib/reviews";

const GEO = {
  latitude: 49.9378825,
  longitude: 17.9026238,
} as const;

export function JsonLd() {
  // Stejná data a stejná pravidla jako sekce Recenze, aby JSON-LD odpovídal viditelnému obsahu.
  const reviews = getReviewsView();
  const showReviews = reviews.mode === "full" && reviews.rating !== null;

  const salon: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${site.url}/#salon`,
    name: site.legalName,
    alternateName: ["Sarya Head Spa", "Head Spa Opava", "Headspa Opava"],
    description:
      "Head spa Opava na Ostrožné 8. Mytí vlasů, masáž hlavy a péče o pokožku. Rezervace přes Notino.",
    url: site.url,
    telephone: site.phone,
    image: `${site.url}/logo.png`,
    logo: `${site.url}/logo.png`,
    priceRange: "900-1800 CZK",
    currenciesAccepted: "CZK",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: site.city,
      postalCode: site.postalCode,
      addressRegion: "Moravskoslezský kraj",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Opava" },
      { "@type": "AdministrativeArea", name: "Moravskoslezský kraj" },
    ],
    knowsAbout: [
      "head spa Opava",
      "headspa Opava",
      "masáž hlavy Opava",
      "mytí vlasů Opava",
      "péče o pokožku hlavy",
      "Davines",
      "keratin",
    ],
    sameAs: [site.instagramUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Procedury head spa Opava",
      itemListElement: procedures.map((item) => ({
        "@type": "Offer",
        price: item.price.replace(/\D/g, ""),
        priceCurrency: "CZK",
        itemOffered: {
          "@type": "Service",
          name: item.name,
          areaServed: "Opava",
        },
      })),
    },
  };

  if (site.operatorName) {
    salon.founder = {
      "@type": "Person",
      name: site.operatorName,
    };
  }

  if (showReviews && reviews.rating !== null) {
    salon.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.rating,
      bestRating: 5,
      worstRating: 1,
      ...(reviews.count !== null ? { reviewCount: reviews.count } : {}),
    };
    salon.review = reviews.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      ...(validIsoDate(r.date) ? { datePublished: r.date } : {}),
    }));
  }

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.legalName,
    inLanguage: "cs-CZ",
    publisher: { "@id": `${site.url}/#salon` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([salon, faqPage, webSite]),
      }}
    />
  );
}
