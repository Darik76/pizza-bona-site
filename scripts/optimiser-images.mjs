/**
 * Régénère les images de `public/images/` à partir des originaux du dossier
 * `image/`, à la taille réellement utilisée par le site (× 2 pour rester net
 * sur les écrans haute densité).
 *
 * À relancer si tu remplaces une photo dans `image/` :
 *   node scripts/optimiser-images.mjs
 *
 * Les originaux ne sont jamais modifiés : le script écrit uniquement dans
 * `public/images/`. Il est donc rejouable autant de fois que voulu sans perte
 * de qualité cumulée.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const RACINE = path.join(import.meta.dirname, "..");
const SOURCES = path.join(RACINE, "image");
const DESTINATION = path.join(RACINE, "public", "images");

// largeur/hauteur = taille d'affichage maximale × 2.
// `cadrer: true` recadre au centre (comme le fait `object-cover` en CSS) :
// autant livrer directement les pixels utiles plutôt que de les faire
// télécharger pour que le navigateur les jette.
const IMAGES = [
  {
    source: "logo.webp",
    sortie: "logo.webp",
    largeur: 420,
    qualite: 90,
    rogner: true, // enlève la marge transparente autour du logo
    note: "en-tête (44 px de haut) et pied de page",
  },
  {
    source: "pizza2.webp",
    sortie: "pizza.webp",
    largeur: 550,
    qualite: 70,
    note: "pizza qui tourne dans le héros",
  },
  {
    source: "pizza.webp",
    sortie: "accueil.webp",
    largeur: 1100,
    qualite: 45,
    note: "fond du bloc « On décroche » — floutée et assombrie à 92 %",
  },
  {
    source: "Facade.webp",
    sortie: "facade.webp",
    largeur: 1200,
    hauteur: 900,
    cadrer: true,
    qualite: 70,
    note: "grande photo de la section Notre histoire",
  },
  {
    source: "four.webp",
    sortie: "four.webp",
    largeur: 440,
    hauteur: 440,
    cadrer: true,
    qualite: 76,
    note: "vignette carrée (208 px)",
  },
  {
    source: "salle.webp",
    sortie: "salle.webp",
    largeur: 320,
    hauteur: 320,
    cadrer: true,
    qualite: 76,
    note: "petite vignette carrée (144 px)",
  },
  {
    source: "pizzadumois.webp",
    sortie: "pizza-du-mois.webp",
    largeur: 1140,
    hauteur: 855,
    cadrer: true,
    qualite: 70,
    note: "section Pizza du moment",
  },
];

// Les 20 photos de la galerie : dossier `image/toute les pizza/`, prises dans
// l'ordre alphabétique — c'est cet ordre qui donne pizza-01 → pizza-20.
const DOSSIER_GALERIE = path.join(SOURCES, "toute les pizza");
const GALERIE = fs
  .readdirSync(DOSSIER_GALERIE)
  .filter((f) => f.toLowerCase().endsWith(".webp"))
  .sort()
  .map((fichier, index) => ({
    source: path.join("toute les pizza", fichier),
    sortie: `pizzas/pizza-${String(index + 1).padStart(2, "0")}.webp`,
    largeur: 640,
    hauteur: 464,
    cadrer: true,
    qualite: 64,
    note: "galerie défilante (288 × 208 px)",
  }));

const ko = (octets) => `${Math.round(octets / 1024)} Ko`;

let avant = 0;
let apres = 0;

for (const img of [...IMAGES, ...GALERIE]) {
  const cheminSource = path.join(SOURCES, img.source);
  const cheminSortie = path.join(DESTINATION, img.sortie);

  if (!fs.existsSync(cheminSource)) {
    console.warn(`⚠️  original introuvable, ignoré : ${img.source}`);
    continue;
  }

  const poidsAvant = fs.existsSync(cheminSortie)
    ? fs.statSync(cheminSortie).size
    : 0;

  let pipeline = sharp(cheminSource);
  if (img.rogner) pipeline = pipeline.trim({ threshold: 12 });

  pipeline = pipeline.resize({
    width: img.largeur,
    height: img.hauteur,
    fit: img.cadrer ? "cover" : "inside",
    position: "centre",
    withoutEnlargement: true,
  });

  const donnees = await pipeline
    .webp({ quality: img.qualite, effort: 6 })
    .toBuffer();

  fs.mkdirSync(path.dirname(cheminSortie), { recursive: true });
  fs.writeFileSync(cheminSortie, donnees);

  const { width, height } = await sharp(donnees).metadata();
  avant += poidsAvant;
  apres += donnees.length;

  console.log(
    `${img.sortie.padEnd(28)} ${`${width}×${height}`.padEnd(11)} ${ko(poidsAvant).padStart(8)} → ${ko(donnees.length).padStart(7)}`
  );
}

console.log(
  `\nTotal : ${ko(avant)} → ${ko(apres)} (${Math.round((1 - apres / avant) * 100)} % de gagné)`
);
