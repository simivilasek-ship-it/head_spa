"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";

export function WhatsAppButton() {
  const [footerVisible, setFooterVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const contact = document.getElementById("kontakt");
    const observers: IntersectionObserver[] = [];

    if (footer) {
      const footerObs = new IntersectionObserver(([entry]) =>
        setFooterVisible(Boolean(entry?.isIntersecting)),
      );
      footerObs.observe(footer);
      observers.push(footerObs);
    }

    if (contact) {
      const contactObs = new IntersectionObserver(
        ([entry]) => setContactVisible(Boolean(entry?.isIntersecting)),
        { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
      );
      contactObs.observe(contact);
      observers.push(contactObs);
    }

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const number = site.whatsappNumber.replace(/\D/g, "");
  if (!number) return null;

  const href = `https://wa.me/${number}?text=${encodeURIComponent(site.whatsappMessage)}`;
  const hideOnMobile = footerVisible || contactVisible;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Napsat na WhatsApp"
      tabIndex={hideOnMobile ? -1 : undefined}
      className={`whatsapp-fab fixed right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-forest shadow-lg shadow-forest/20 ring-2 ring-forest/15 transition-[background-color,opacity,transform] duration-300 hover:bg-mist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage md:right-6 md:h-14 md:w-14 ${
        hideOnMobile
          ? "pointer-events-none translate-y-4 opacity-0 md:pointer-events-auto md:translate-y-0 md:opacity-100"
          : ""
      }`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 md:h-7 md:w-7">
        <path
          fill="currentColor"
          d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"
        />
      </svg>
    </a>
  );
}
