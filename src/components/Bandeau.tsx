import { cn } from "../lib/utils";

/**
 * Bandeau de texte qui défile en boucle. Le contenu est dupliqué : quand la
 * piste a glissé de la moitié de sa largeur, la copie a pris exactement la
 * place de l'original — la boucle est donc invisible.
 * Le défilement se met en pause au survol.
 */
export function Bandeau({
  mots,
  sens = "normal",
  className,
  separateur = "🍕",
}: {
  mots: string[];
  sens?: "normal" | "inverse";
  className?: string;
  separateur?: string;
}) {
  const piste = [...mots, ...mots];

  return (
    <div
      className={cn("defile overflow-hidden", className)}
      aria-hidden="true"
      role="presentation"
    >
      <div className="defile-piste" data-sens={sens}>
        {piste.map((mot, index) => (
          <span
            key={`${mot}-${index}`}
            className="flex shrink-0 items-center gap-6 whitespace-nowrap px-6 font-display text-2xl uppercase tracking-widest sm:text-3xl"
          >
            {mot}
            <span className="text-base opacity-70">{separateur}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
