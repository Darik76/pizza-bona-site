/**
 * Télécharge les polices du site depuis Google Fonts et les enregistre dans
 * `public/fonts/`, avec la feuille de style correspondante dans
 * `src/polices.css`.
 *
 * Pourquoi : servir les polices avec le site plutôt que depuis les serveurs de
 * Google supprime une connexion externe (~150 ms sur mobile) et évite tout
 * transfert d'adresse IP des visiteurs vers Google (question RGPD que peut
 * poser un client professionnel).
 *
 * À relancer uniquement si on change de polices :
 *   node scripts/telecharger-polices.mjs
 *
 * Anton, Fraunces et Outfit sont publiées sous licence SIL Open Font License,
 * qui autorise l'auto-hébergement (voir src/assets/fonts/LICENCE.txt).
 */
import fs from "node:fs";
import path from "node:path";

const RACINE = path.join(import.meta.dirname, "..");
// Les polices vivent dans `src/` (et non `public/`) pour que Vite les prenne en
// charge : il réécrit alors leur URL avec la bonne base (`/pizza-bona-site/` sur
// GitHub Pages) et leur ajoute une empreinte pour la mise en cache longue durée.
const DOSSIER_POLICES = path.join(RACINE, "src", "assets", "fonts");

// On ne garde que les jeux de caractères utiles au français : `latin` couvre
// é, à, ç… et `latin-ext` contient le œ de « cœur ».
const SOUS_ENSEMBLES = ["latin", "latin-ext"];

const REQUETE =
  "https://fonts.googleapis.com/css2" +
  "?family=Anton" +
  "&family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400" +
  "&family=Outfit:wght@300..700" +
  "&display=swap";

// Sans cet en-tête, Google renvoie de vieux fichiers TTF (3 à 4 fois plus lourds)
// au lieu du format woff2.
const NAVIGATEUR =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const css = await (await fetch(REQUETE, { headers: { "User-Agent": NAVIGATEUR } })).text();

fs.mkdirSync(DOSSIER_POLICES, { recursive: true });

// Dans la CSS de Google, chaque @font-face est précédé d'un commentaire qui
// indique son jeu de caractères : /* latin-ext */. On capture les deux
// ensemble, sinon on décale les étiquettes d'un cran.
const blocs = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g)];
const regles = [];
let total = 0;

for (const [, sousEnsemble, bloc] of blocs) {
  const lire = (cle) => bloc.match(new RegExp(`${cle}: ([^;]+);`))?.[1]?.trim();
  const url = bloc.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url || !SOUS_ENSEMBLES.includes(sousEnsemble)) continue;

  const famille = lire("font-family").replace(/'/g, "");
  const style = lire("font-style");
  const graisse = lire("font-weight");
  const plage = lire("unicode-range");

  const nomFichier =
    `${famille}-${style}-${graisse.replace(/\s+/g, "-")}-${sousEnsemble}.woff2`.toLowerCase();

  const donnees = Buffer.from(await (await fetch(url)).arrayBuffer());
  fs.writeFileSync(path.join(DOSSIER_POLICES, nomFichier), donnees);
  total += donnees.length;
  console.log(`${nomFichier.padEnd(42)} ${Math.round(donnees.length / 1024)} Ko`);

  regles.push(
    `@font-face {\n` +
      `  font-family: "${famille}";\n` +
      `  font-style: ${style};\n` +
      `  font-weight: ${graisse};\n` +
      `  font-display: swap;\n` +
      `  src: url("./assets/fonts/${nomFichier}") format("woff2");\n` +
      `  unicode-range: ${plage};\n` +
      `}`
  );
}

const entete =
  `/* Polices servies avec le site — généré par scripts/telecharger-polices.mjs.\n` +
  `   Ne pas modifier à la main : relancer le script.\n` +
  `   Anton, Fraunces et Outfit — SIL Open Font License 1.1. */\n\n`;

fs.writeFileSync(path.join(RACINE, "src", "polices.css"), entete + regles.join("\n\n") + "\n");

fs.writeFileSync(
  path.join(DOSSIER_POLICES, "LICENCE.txt"),
  [
    "Polices utilisées par ce site :",
    "",
    "- Anton — Vernon Adams, Cyreal — SIL Open Font License 1.1",
    "- Fraunces — Undercase Type — SIL Open Font License 1.1",
    "- Outfit — Smartsheet, On Brand Investments — SIL Open Font License 1.1",
    "",
    "La licence OFL autorise l'utilisation, la modification et la redistribution,",
    "y compris l'hébergement des fichiers avec le site.",
    "Texte complet : https://openfontlicense.org",
    "",
  ].join("\n")
);

console.log(`\n${regles.length} fichiers, ${Math.round(total / 1024)} Ko au total.`);
