# Pizza Bona — site vitrine

Site vitrine de la pizzeria Pizza Bona (Lillebonne), en React + TypeScript + Vite,
mis en forme avec Tailwind CSS v4.

## Lancer le site

```bash
npm install
npm run dev      # développement (http://localhost:5173)
npm run build    # génère le dossier dist/ à mettre en ligne
npm run lint
```

## Où modifier quoi

| Ce que tu veux changer | Fichier |
| --- | --- |
| Adresse, téléphone, horaires, réseaux sociaux, livraison, formule du midi | `src/config/site.ts` |
| La carte (plats, prix, ingrédients, étiquettes végé/épicé) | `src/data/menu.ts` |
| Les avis affichés | `src/data/reviews.ts` |
| Les photos | `image/` (les originaux), puis relancer le script d'optimisation ci-dessous |
| Les couleurs, polices et animations | `src/index.css` |
| Mentions légales (SIRET, directeur de publication) | `src/config/site.ts`, section `legal` |

Les horaires servent aussi à calculer automatiquement le badge « Ouvert / Fermé »
affiché dans l'en-tête, le héros et la section « Où nous trouver »
(`src/lib/horaires.ts`) : il suffit de garder le format `11h00 – 14h00 / 18h00 – 21h30`.

## Les deux scripts d'optimisation

```bash
node scripts/optimiser-images.mjs
```

Régénère `public/images/` à partir des originaux de `image/`, à la taille
réellement affichée (× 2 pour les écrans haute densité). Les originaux ne sont
jamais modifiés, le script est donc rejouable sans perte. À relancer après avoir
ajouté ou remplacé une photo dans `image/`.

```bash
node scripts/telecharger-polices.mjs
```

Retélécharge Anton, Fraunces et Outfit depuis Google Fonts vers
`src/assets/fonts/` et régénère `src/polices.css`. Les polices sont servies avec
le site : aucune connexion vers Google au chargement, et donc aucune adresse IP
de visiteur transmise à un tiers. À ne relancer que si tu changes de polices.

## Structure

```
src/
  components/   en-tête, pied de page, boutons, bandeaux défilants, icônes…
  sections/     une section de la page par fichier (Hero, Carte, Avis…)
  hooks/        apparitions au défilement, compteurs animés, état d'ouverture
  lib/          liens Maps/Waze, formatage des prix, lecture des horaires
  config/       les infos du restaurant
  data/         la carte et les avis
```

## Animations

Toutes les animations sont en CSS (aucune bibliothèque) et sont définies dans
`src/index.css`. Elles sont automatiquement désactivées si la personne a activé
« Réduire les animations » sur son appareil.

## Mise en ligne

`npm run build` produit `dist/` : c'est ce dossier qu'on envoie sur l'hébergeur.
Si un vrai nom de domaine est acheté un jour, il faut remplacer l'URL
`http://4754433.atwebpages.com` dans `src/config/site.ts`, `index.html`,
`public/robots.txt` et `public/sitemap.xml`.
