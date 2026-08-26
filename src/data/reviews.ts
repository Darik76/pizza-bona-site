export type GoogleReview = {
  author: string;
  rating: number;
  date: string;
  text: string;
};

// Avis publics repris de la fiche Google de Pizza Bona (via agrégateurs Restaurant
// Guru / Sluurpy). Mettre à jour manuellement de temps en temps avec des avis
// plus récents.
export const googleRating = {
  value: 4.5,
  label: "Note Google",
};

export const googleReviews: GoogleReview[] = [
  {
    author: "Christophe Ferruel",
    rating: 5,
    date: "10 novembre 2023",
    text: "La pizza du mois base butternut et Saint-Jacques est à tomber par terre. C'est LA pizza du coin à ne pas rater.",
  },
  {
    author: "Anthony Kiff",
    rating: 5,
    date: "26 juillet 2023",
    text: "Les meilleures pizzas que j'ai mangées, produits frais, très bonne qualité, un régal à chaque fois.",
  },
  {
    author: "Elisa Deblangy",
    rating: 5,
    date: "11 septembre 2023",
    text: "On s'est régalé, de la pizza au tiramisu. Pizzas bien garnies et tarif raisonnable.",
  },
  {
    author: "Sylvie Chapelle",
    rating: 5,
    date: "6 avril 2023",
    text: "Les pizzas sont excellentes ! Il y a un large choix, la pâte est super bonne ainsi que la garniture.",
  },
  {
    author: "Jessica Vavasseur",
    rating: 5,
    date: "28 avril 2023",
    text: "Très bon accueil et pizzas délicieuses. Je recommande vivement.",
  },
  {
    author: "Karima Nezar",
    rating: 5,
    date: "2 août 2022",
    text: "Incroyable ! Que dire de plus, de loin la meilleure pizza que j'ai mangée de ma vie !",
  },
];
