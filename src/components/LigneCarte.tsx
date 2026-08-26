import type { MenuItem } from "../data/menu";
import { formaterPrix } from "../lib/utils";

const ETIQUETTES = {
  vegetarien: { texte: "Végétarien", classes: "bg-basil-500/15 text-basil-300" },
  epice: { texte: "Épicé", classes: "bg-tomato-500/20 text-tomato-300" },
} as const;

/**
 * Une ligne de la carte : nom + ingrédients à gauche, prix à droite, reliés
 * par une ligne de points comme sur un menu imprimé.
 */
export function LigneCarte({ plat, delai }: { plat: MenuItem; delai: number }) {
  return (
    <li
      className="group border-b border-cream/10 py-4 last:border-0"
      style={{
        animation: "bona-monter 0.6s cubic-bezier(0.16,1,0.3,1) both",
        animationDelay: `${delai}ms`,
      }}
    >
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-xl uppercase tracking-wide text-cream transition-colors duration-300 group-hover:text-gold-400 sm:text-2xl">
          {plat.name}
        </h3>

        {plat.tags?.map((tag) => (
          <span
            key={tag}
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${ETIQUETTES[tag].classes}`}
          >
            {ETIQUETTES[tag].texte}
          </span>
        ))}

        {/* Ligne de points : purement décorative */}
        <span
          aria-hidden="true"
          className="hidden h-px flex-1 translate-y-[-2px] bg-[repeating-linear-gradient(90deg,rgba(253,246,234,0.35)_0_3px,transparent_3px_9px)] sm:block"
        />

        <span className="ml-auto shrink-0 text-right sm:ml-0">
          <span className="font-display text-xl text-gold-400 sm:text-2xl">
            {formaterPrix(plat.price)}
          </span>
          {plat.secondaryPrice !== undefined && (
            <span className="ml-2 whitespace-nowrap text-xs text-cream/50">
              {plat.secondaryLabel} {formaterPrix(plat.secondaryPrice)}
            </span>
          )}
        </span>
      </div>

      {plat.ingredients && (
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-cream/55">
          {plat.ingredients}
        </p>
      )}
    </li>
  );
}
