import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Ajoute au HTML produit un préchargement des deux polices du premier écran
 * (Anton pour les titres, Outfit pour le texte), jeu de caractères latin.
 *
 * Sans ça, le navigateur ne les découvre qu'après avoir téléchargé et analysé
 * la feuille de style : le texte s'affiche d'abord dans une police de secours,
 * puis change d'aspect une fois la vraie police arrivée. Le nom des fichiers
 * contient une empreinte générée à la compilation, d'où ce petit greffon
 * plutôt qu'un lien écrit en dur dans index.html.
 */
function prechargerPolices(): Plugin {
  let base = '/'

  return {
    name: 'precharger-polices',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      // On relit la base ici pour ne pas la réécrire en dur : elle changera le
      // jour où le site aura son propre nom de domaine.
      base = config.base
    },
    transformIndexHtml(_html, ctx) {
      // Uniquement le jeu `latin` : `latin-ext` ne sert qu'à quelques
      // caractères rares et se chargera de lui-même si besoin.
      const polices = Object.keys(ctx.bundle ?? {}).filter(
        (fichier) =>
          /(anton|outfit)-[\w-]*-latin-[\w-]+\.woff2$/.test(fichier) &&
          !fichier.includes('-latin-ext-')
      )

      return polices.map((fichier) => ({
        tag: 'link',
        attrs: {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
          href: `${base}${fichier}`,
        },
        injectTo: 'head-prepend' as const,
      }))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/pizza-bona-site/',
  plugins: [react(), tailwindcss(), prechargerPolices()],
  server: {
    allowedHosts: [
      'loose-towns-mate.loca.lt',
      'shaggy-cases-hammer.loca.lt',
    ],
  },
})
