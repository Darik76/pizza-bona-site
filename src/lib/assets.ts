/**
 * Construit le chemin d'un fichier du dossier `public/` en tenant compte de la
 * base du site.
 *
 * Sur GitHub Pages, le site n'est pas servi à la racine du domaine mais dans un
 * sous-dossier (`/pizza-bona-site/`, voir `base` dans vite.config.ts). Un chemin
 * écrit en dur « /images/logo.webp » pointerait alors vers la racine du domaine
 * et renverrait une erreur 404 : il faut le préfixer par `import.meta.env.BASE_URL`.
 */
export function fichier(chemin: string): string {
  return `${import.meta.env.BASE_URL}${chemin.replace(/^\//, "")}`;
}

/** Raccourci pour les photos : image("logo.webp") → « …/images/logo.webp » */
export function image(nom: string): string {
  return fichier(`images/${nom}`);
}
