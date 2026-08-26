export type MenuTag = "vegetarien" | "epice";

export type MenuItem = {
  name: string;
  ingredients: string;
  price: number;
  /** Prix d'une variante (mini pizza, grande portion...), affiché à côté du prix principal. */
  secondaryPrice?: number;
  /** Libellé de la variante, ex. "mini" pour les pizzas, "grande" pour les pâtes. */
  secondaryLabel?: string;
  tags?: MenuTag[];
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "specialites",
    label: "Spécialités",
    items: [
      {
        name: "Pizza du Moment",
        ingredients: "Selon l'humeur du chef et les produits de saison",
        price: 14.5,
        secondaryPrice: 9,
        secondaryLabel: "mini",
      },
      {
        name: "Bona Burrata",
        ingredients:
          "Tomate, Mozza Fior Di Latte, San Daniel, Burrata, Tomates cerises, Roquette, Crème de balsamique",
        price: 14.5,
        secondaryPrice: 9,
        secondaryLabel: "mini",
      },
      {
        name: "Délice de Montagne",
        ingredients:
          "Tomate, Mozza Fior Di Latte, Champignons, Camembert, San Daniel, Œuf, Crème de balsamique",
        price: 14.5,
      },
      {
        name: "San Daniel",
        ingredients: "Crème de poivron, Mozza Fior Di Latte, San Daniel, Tomates séchées, Grana Padano",
        price: 14,
      },
    ],
  },
  {
    id: "tomate",
    label: "Pizzas Base Tomate",
    items: [
      {
        name: "Burger",
        ingredients:
          "Tomate, Mozza Fior Di Latte, Viande hachée, Cheddar, Cornichons, Tomates cerises, Oignons frits",
        price: 14,
        secondaryPrice: 9,
        secondaryLabel: "mini",
      },
      {
        name: "Canibale",
        ingredients: "Tomate, Mozza Fior Di Latte, Viande hachée, Champignons, Œuf, Oignons",
        price: 14,
        secondaryPrice: 9,
        secondaryLabel: "mini",
      },
      {
        name: "Orientale",
        ingredients: "Tomate, Mozza Fior Di Latte, Merguez, Chorizo, Poivrons, Œuf, Oignons",
        price: 14,
        secondaryPrice: 9,
        secondaryLabel: "mini",
        tags: ["epice"],
      },
      {
        name: "Poulet Fajitas",
        ingredients: "Tomate, Mozza Fior Di Latte, Filet de poulet, Poivrons, Oignons, Ail",
        price: 13,
        secondaryPrice: 9,
        secondaryLabel: "mini",
      },
      {
        name: "Reine",
        ingredients: "Tomate, Mozza Fior Di Latte, Jambon, Champignons, Olives, Origan",
        price: 13,
        secondaryPrice: 8,
        secondaryLabel: "mini",
      },
      {
        name: "Calzone",
        ingredients: "Pizza pliée : Tomate, Mozza Fior Di Latte, Jambon, Champignons, Œuf, Origan",
        price: 13,
        secondaryPrice: 8,
        secondaryLabel: "mini",
      },
      {
        name: "Pinède",
        ingredients: "Tomate, Mozza Fior Di Latte, Jambon, Champignons, Chèvre, Origan",
        price: 13,
        secondaryPrice: 8,
        secondaryLabel: "mini",
        tags: ["vegetarien"],
      },
      {
        name: "4 Saisons",
        ingredients:
          "Tomate, Mozza Fior Di Latte, Jambon, Champignons, Cœurs d'artichauts, Olives, Oignons",
        price: 13,
        secondaryPrice: 8,
        secondaryLabel: "mini",
      },
      {
        name: "Marguerite",
        ingredients: "Tomate, Mozza Fior Di Latte, Huile d'olive vierge, Grana Padano AOP, Basilic frais",
        price: 9,
        secondaryPrice: 6,
        secondaryLabel: "mini",
        tags: ["vegetarien"],
      },
      {
        name: "Napolitaine",
        ingredients: "Tomate, Mozza Fior Di Latte, Anchois, Olives, Persillade, Origan",
        price: 12,
        secondaryPrice: 7,
        secondaryLabel: "mini",
      },
      {
        name: "Pêcheur",
        ingredients: "Tomate, Mozza Fior Di Latte, Thon, Câpres, Oignons, Olives",
        price: 12.5,
        secondaryPrice: 7.5,
        secondaryLabel: "mini",
      },
    ],
  },
  {
    id: "creme",
    label: "Pizzas Base Crème",
    items: [
      {
        name: "Montagnarde",
        ingredients: "Tomate, Pomme de terre, Viande hachée, Tomme de Savoie, Oignons",
        price: 14,
        secondaryPrice: 9,
        secondaryLabel: "mini",
      },
      {
        name: "Tartiflette",
        ingredients: "Crème, Pomme de terre, Lardons, Reblochon, Origan",
        price: 13,
        secondaryPrice: 8,
        secondaryLabel: "mini",
      },
      {
        name: "Carbonara",
        ingredients: "Crème, Mozza Fior Di Latte, Lardons, Oignons, Persillade",
        price: 13,
        secondaryPrice: 8,
        secondaryLabel: "mini",
      },
      {
        name: "Poulet Curry",
        ingredients: "Crème de curry, Mozza Fior Di Latte, Filet de poulet, Œuf, Oignons, Oignons frits",
        price: 14,
        secondaryPrice: 9,
        secondaryLabel: "mini",
        tags: ["epice"],
      },
      {
        name: "4 Fromages",
        ingredients: "Crème, Mozza Fior Di Latte, Gorgonzola, Chèvre, Scarmoza fumée",
        price: 12.5,
        secondaryPrice: 7.5,
        secondaryLabel: "mini",
        tags: ["vegetarien"],
      },
      {
        name: "Chèvre Miel",
        ingredients: "Crème, Mozza Fior Di Latte, Chèvre, Miel, Noix, Tomates cerises",
        price: 13,
        secondaryPrice: 8,
        secondaryLabel: "mini",
        tags: ["vegetarien"],
      },
      {
        name: "Vegetariano",
        ingredients:
          "Crème de poivrons, Mozza Fior Di Latte, Aubergines grillées, Artichauts à la romaine, Oignons, Olives",
        price: 13,
        secondaryPrice: 8,
        secondaryLabel: "mini",
        tags: ["vegetarien"],
      },
      {
        name: "Saumonetta",
        ingredients: "Crème, Mozza Fior Di Latte, Saumon mariné, Roquette, Crème de balsamique",
        price: 12.5,
        secondaryPrice: 7.5,
        secondaryLabel: "mini",
      },
    ],
  },
  {
    id: "au-choix",
    label: "Pizza au Choix",
    items: [
      {
        name: "Pizza 1 Viande au Choix",
        ingredients:
          "Base crème ou tomate, Mozza Fior Di Latte, 1 viande au choix (viande hachée, poulet, chorizo, merguez, pepperoni, jambon blanc, saumon), origan ou persillade",
        price: 12,
      },
      {
        name: "Pizza 4 Ingrédients au Choix",
        ingredients: "Base crème ou tomate, Mozza Fior Di Latte, 4 ingrédients au choix",
        price: 14.5,
      },
    ],
  },
  {
    id: "rotolo",
    label: "Rotolo di Pizza",
    items: [
      {
        name: "Rotolo Burger",
        ingredients:
          "Spécialité de Naples, pizza roulée : Tomate, Mozza, Viande hachée, Cheddar, Cornichons, Tomates cerises, Oignons frits",
        price: 7.5,
      },
      {
        name: "Rotolo Bona",
        ingredients:
          "Spécialité de Naples, pizza roulée : Tomate, Mozza, San Daniel, Tomates cerises, Roquette, Crème de balsamique",
        price: 7.5,
      },
      {
        name: "Rotolo Chèvre Miel",
        ingredients:
          "Spécialité de Naples, pizza roulée : Crème, Mozza, Chèvre, Miel, Tomates cerises, Roquette, Noix, Crème de balsamique",
        price: 7.5,
        tags: ["vegetarien"],
      },
    ],
  },
  {
    id: "bouchees",
    label: "Bouchées Apéritives",
    items: [
      {
        name: "Bouchées Apéritives",
        ingredients:
          "6 à 10 tranches, base crème, Mozza, 1 viande au choix : saumon, jambon cru, poulet ou chèvre",
        price: 7,
      },
    ],
  },
  {
    id: "bambino",
    label: "Menu Bambino",
    items: [
      {
        name: "Menu Bambino",
        ingredients:
          "Mini pizza jambon fromage ou quatre fromages, un dessert, une boisson et une surprise",
        price: 8.5,
      },
    ],
  },
  {
    id: "buns",
    label: "Buns Italiens",
    items: [
      {
        name: "Buns Jambon",
        ingredients: "Crème, Mozza, Jambon blanc",
        price: 7.4,
      },
      {
        name: "Buns Poulet Curry",
        ingredients: "Crème de curry, Mozza, Poulet, Oignons frits",
        price: 7.9,
        tags: ["epice"],
      },
      {
        name: "Buns Norvégien",
        ingredients: "Crème, Mozza, Saumon, Persillade, Roquette, Crème de balsamique",
        price: 7.9,
      },
      {
        name: "Buns Bona",
        ingredients: "Tomate, Mozza, San Daniel, Tomates cerises, Roquette, Crème de balsamique",
        price: 7.9,
      },
      {
        name: "Buns Burger",
        ingredients: "Tomate, Mozza, Viande hachée, Cheddar, Cornichons, Oignons frits",
        price: 7.9,
      },
    ],
  },
  {
    id: "pasta",
    label: "Pâtes Fraîches",
    items: [
      {
        name: "Carbonara",
        ingredients: "Crème, Lardons, Oignons",
        price: 7.3,
        secondaryPrice: 9.9,
        secondaryLabel: "grande",
      },
      {
        name: "4 Fromages",
        ingredients: "Crème, Mozza, Chèvre, Gorgonzola, Parmesan",
        price: 8.3,
        secondaryPrice: 10.9,
        secondaryLabel: "grande",
        tags: ["vegetarien"],
      },
      {
        name: "Bolognaise",
        ingredients: "Sauce tomate, Viande hachée",
        price: 8.3,
        secondaryPrice: 10.9,
        secondaryLabel: "grande",
      },
      {
        name: "Saumon",
        ingredients: "Crème, Saumon, Aneth",
        price: 7.9,
        secondaryPrice: 9.9,
        secondaryLabel: "grande",
      },
      {
        name: "Poulet Curry",
        ingredients: "Crème de curry, Poulet",
        price: 8.3,
        secondaryPrice: 10.9,
        secondaryLabel: "grande",
        tags: ["epice"],
      },
      {
        name: "Chorizo",
        ingredients: "Crème, Chorizo",
        price: 8.3,
        secondaryPrice: 10.9,
        secondaryLabel: "grande",
        tags: ["epice"],
      },
    ],
  },
  {
    id: "bruschetta",
    label: "Bruschetta",
    items: [
      {
        name: "Normande",
        ingredients: "Tomate, Mozza, Lardons, Camembert",
        price: 7.5,
      },
      {
        name: "Thon",
        ingredients: "Tomate, Mozza, Thon, Poivrons, Persillade",
        price: 7.5,
      },
      {
        name: "Bona",
        ingredients: "Tomate, Mozza, San Daniel, Tomates cerises, Roquette, Crème de balsamique",
        price: 7.5,
      },
      {
        name: "Forestière",
        ingredients: "Tomate, Mozza, Jambon blanc, Champignons, Persillade",
        price: 7.5,
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      {
        name: "Pizza Nutella",
        ingredients: "",
        price: 7.5,
        tags: ["vegetarien"],
      },
      {
        name: "Tiramisu",
        ingredients: "",
        price: 3.9,
        tags: ["vegetarien"],
      },
      {
        name: "Moelleux au Chocolat",
        ingredients: "Saveurs selon l'humeur du chef",
        price: 3.3,
        tags: ["vegetarien"],
      },
    ],
  },
];

export const pizzaOfMonth = {
  name: "Pizza du Moment",
  description:
    "Notre chef vous surprend au fil des saisons avec une création selon son humeur et les meilleurs produits du moment. Demandez-la directement en pizzeria !",
  price: 14.5,
  badge: "Spécialité",
  availableUntil: "prochain changement de saison",
};
