type Props = { className?: string };

/* Pictogrammes en SVG inline : pas de police d'icônes à télécharger, et ils
   héritent de la couleur du texte (currentColor). */

export function IconeTelephone({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006.5 6.5L17 13l4 1.5v3a2.5 2.5 0 01-2.7 2.5A17 17 0 013 5.7 2.5 2.5 0 015.5 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconeFacebook({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.3-.13-2.45-.13-2.42 0-4.08 1.48-4.08 4.2V9.9H7.4V13h2.77v8z"
      />
    </svg>
  );
}

export function IconeInstagram({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2m0 5.1a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4m0 7.75a3.05 3.05 0 110-6.1 3.05 3.05 0 010 6.1m5.99-7.94a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0"
      />
    </svg>
  );
}

export function IconeEtoile({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.44 6.19 20.5l1.1-6.47L2.6 9.45l6.5-.95z"
      />
    </svg>
  );
}

export function IconeItineraire({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 2a7 7 0 00-7 7c0 5.1 6.2 12.3 6.47 12.6a.7.7 0 001.06 0C12.8 21.3 19 14.1 19 9a7 7 0 00-7-7m0 9.6A2.6 2.6 0 1112 6.4a2.6 2.6 0 010 5.2"
      />
    </svg>
  );
}

export function IconeHorloge({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7v5.2l3.3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconeScooter({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="5.5" cy="17.5" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18.5" cy="17.5" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.5 17.5h7M15.5 17.5 14 6.5h-3M17 10h-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconeFeuille({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M20 3c-9 0-14 4-14 10 0 1.6.4 3 1.1 4.2L4 20.3l1.4 1.4 3.1-3.1A7.7 7.7 0 0012.4 20C18 20 20 14.5 20 3"
      />
    </svg>
  );
}

export function IconeFlamme({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12.5 2s.9 3-1.4 5.3C8.5 9.9 6 11.7 6 15a6 6 0 0012 0c0-2.6-1.3-4-2.4-5.3-.5 1.1-1.3 1.8-2 1.8.7-2.6-.3-6.9-1.1-9.5"
      />
    </svg>
  );
}

export function IconeFleche({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
