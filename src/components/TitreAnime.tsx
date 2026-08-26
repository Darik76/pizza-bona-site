import { cn } from "../lib/utils";

/**
 * Titre qui se dévoile mot par mot au chargement : chaque mot est masqué par
 * un conteneur `overflow-hidden` puis remonte à sa place, avec un léger
 * décalage entre les mots.
 */
export function TitreAnime({
  texte,
  className,
  delaiInitial = 0,
  pas = 90,
}: {
  texte: string;
  className?: string;
  delaiInitial?: number;
  pas?: number;
}) {
  const mots = texte.split(" ");

  return (
    <span className={cn("inline-block", className)}>
      {mots.map((mot, index) => (
        <span
          key={`${mot}-${index}`}
          className={cn(
            "inline-block overflow-hidden py-[0.06em] align-bottom",
            index < mots.length - 1 && "mr-[0.24em]"
          )}
        >
          <span
            className="inline-block"
            style={{
              animation: "bona-mot 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
              animationDelay: `${delaiInitial + index * pas}ms`,
            }}
          >
            {/* L'espace reste dans le texte pour les lecteurs d'écran ; il est
                invisible (il se colle au bord du bloc) et l'écart entre les
                mots vient de la marge ci-dessus. */}
            {index < mots.length - 1 ? `${mot} ` : mot}
          </span>
        </span>
      ))}
    </span>
  );
}
