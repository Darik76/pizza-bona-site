import { useState } from "react";
import { IconeItineraire } from "./Icones";
import { siteConfig } from "../config/site";
import { googleMapsEmbedUrl } from "../lib/maps";
import { image } from "../lib/assets";

/**
 * Carte Google Maps chargée uniquement après un clic.
 *
 * Pourquoi : une iframe Google Maps chargée automatiquement dépose des cookies
 * et transmet l'adresse IP du visiteur à Google avant tout consentement. La
 * CNIL considère qu'un contenu tiers non essentiel doit être précédé d'un
 * consentement explicite. Tant que personne ne clique, aucune requête n'est
 * envoyée à Google : l'aperçu est une photo hébergée avec le site.
 */
export function CarteMaps() {
  const [chargee, setChargee] = useState(false);

  return (
    <div className="group relative h-[320px] overflow-hidden rounded-3xl border border-ink/5 shadow-warm lg:h-[380px]">
      {chargee ? (
        <iframe
          title={`Carte : ${siteConfig.name} à ${siteConfig.city}`}
          src={googleMapsEmbedUrl()}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button
          type="button"
          onClick={() => setChargee(true)}
          className="relative block h-full w-full text-left"
        >
          <img
            src={image("facade.webp")}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Voile sombre : sans lui, le texte passerait sur une photo claire à
              certains endroits et deviendrait illisible. */}
          <span className="absolute inset-0 bg-ink/80" aria-hidden="true" />

          <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-tomato-500 px-6 py-3 font-display text-sm uppercase tracking-wider text-cream transition-transform duration-300 group-hover:scale-105">
              <IconeItineraire className="h-4 w-4" />
              Afficher la carte
            </span>
            <span className="max-w-sm text-xs leading-relaxed text-cream/85">
              La carte est fournie par Google Maps. En l'affichant, Google peut
              déposer des cookies sur votre appareil.
            </span>
            <span className="font-display text-lg uppercase tracking-wide text-cream">
              {siteConfig.address.full}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
