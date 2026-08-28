export type OpeningHours = {
  day: string;
  hours: string;
};

export type Chiffre = {
  valeur: number;
  suffixe: string;
  label: string;
  /** Nombre de décimales affichées pendant le comptage (ex. 1 pour « 4,5 »). */
  decimales?: number;
};

export const siteConfig = {
  name: "Pizza Bona",
  tagline: "Pizzeria artisanale à Lillebonne",
  city: "Lillebonne",

  // ⚠️ ADRESSE RÉELLE DU SITE EN LIGNE — source unique de vérité.
  // Aujourd'hui le site est publié sur GitHub Pages, dans un sous-dossier.
  // Le jour où tu achètes un vrai nom de domaine (ex. https://www.pizza-bona.fr),
  // change cette ligne + la même valeur dans index.html (canonical / og:url),
  // dans public/robots.txt et public/sitemap.xml, et remets `base: "/"` dans
  // vite.config.ts puisqu'il n'y aura plus de sous-dossier.
  url: "https://darik76.github.io/pizza-bona-site",

  // 3 variantes d'accroche pour le Hero — la première est utilisée par défaut,
  // change l'index dans sections/Hero.tsx si tu préfères une autre.
  heroTaglines: [
    "Des pizzas artisanales, cuites avec passion, au cœur de Lillebonne.",
    "La véritable pizza italienne, faite maison, à deux pas de chez vous.",
    "Pâte pétrie, sauce mijotée, four chaud : la pizza comme on l'aime.",
  ],

  address: {
    street: "2 Rue Victor Hugo",
    postalCode: "76170",
    city: "Lillebonne",
    country: "France",
    full: "2 Rue Victor Hugo, 76170 Lillebonne",
  },

  // Renseigner les coordonnées GPS exactes dès que possible pour des liens
  // Maps/Waze précis. Tant qu'elles sont à null, les liens utilisent l'adresse texte en fallback.
  coordinates: {
    lat: null as number | null,
    lng: null as number | null,
  },

  phone: {
    display: "02 35 39 79 14",
    href: "tel:+33235397914",
  },

  hours: [
    { day: "Lundi", hours: "Fermé" },
    { day: "Mardi", hours: "11h00 – 14h00 / 18h00 – 21h30" },
    { day: "Mercredi", hours: "11h00 – 14h00 / 18h00 – 21h30" },
    { day: "Jeudi", hours: "11h00 – 14h00 / 18h00 – 21h30" },
    { day: "Vendredi", hours: "11h00 – 14h00 / 18h00 – 21h30" },
    { day: "Samedi", hours: "11h00 – 14h00 / 18h00 – 21h30" },
    { day: "Dimanche", hours: "18h00 – 21h30" },
  ] satisfies OpeningHours[],

  // Livraison à domicile : vendredi, samedi et dimanche soir uniquement.
  delivery: {
    days: "Vendredi, samedi et dimanche (uniquement le soir)",
    lillebonne: "À partir de 15 € + 2 € de livraison",
    alentours: "À partir de 25 € + 3 € de livraison",
  },

  // Formule uniquement le midi : 1 produit + 4,50 € = 1 dessert au choix + 1 boisson
  // au choix (sodas et eau plate uniquement).
  lunchFormula: {
    price: 4.5,
    description:
      "1 produit + 4,50 € = 1 dessert au choix + 1 boisson au choix (sodas et eau plate uniquement)",
  },

  social: {
    facebook: "https://www.facebook.com/PizzaBonaLillebonne",
    instagram: "https://www.instagram.com/pizzabonalillebonne",
  },

  nav: [
    { label: "Accueil", href: "#accueil" },
    { label: "Nos pizzas", href: "#nos-pizzas" },
    { label: "La carte", href: "#carte" },
    { label: "Avis", href: "#avis-google" },
    { label: "L'histoire", href: "#notre-histoire" },
    { label: "Nous trouver", href: "#ou-nous-trouver" },
  ],

  // Bandeau défilant sous le héros — court, rythmé, à modifier librement.
  bandeau: [
    "Pâte pétrie maison",
    "Mozza Fior Di Latte",
    "Cuisson au four",
    "Produits frais",
    "Sur place · À emporter",
    "Livraison le week-end",
  ],

  // Chiffres animés de la barre de confiance.
  chiffres: [
    { valeur: 40, suffixe: "+", label: "recettes à la carte" },
    { valeur: 4.5, suffixe: "/5", label: "note Google", decimales: 1 },
    { valeur: 100, suffixe: " %", label: "fait maison" },
    { valeur: 6, suffixe: " j/7", label: "ouvert midi & soir" },
  ] satisfies Chiffre[],

  // ⚠️ Mentions légales obligatoires en France pour un site professionnel
  // (art. 6 III de la LCEN). Tant que `siret` et `directeurPublication` sont
  // vides, le site affiche « à compléter » en évidence dans la section
  // Informations légales — pense à les renseigner.
  legal: {
    siret: "", // Ex. "123 456 789 00012" — visible sur ton extrait Kbis / avis Sirene
    directeurPublication: "", // Ex. "Prénom Nom" — en général le gérant
    hebergeur: {
      nom: "AwardSpace",
      site: "https://www.awardspace.com",
    },
  },
};
