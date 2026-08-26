import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { cn } from "../lib/utils";

type Variante = "monter" | "gauche" | "droite" | "zoom";

/**
 * Apparition au défilement. `delai` (en ms) permet d'échelonner plusieurs
 * éléments d'une même grille pour un effet de cascade.
 */
export function Reveal({
  children,
  variante = "monter",
  delai = 0,
  className,
}: {
  children: ReactNode;
  variante?: Variante;
  delai?: number;
  className?: string;
}) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-variante={variante}
      style={{ animationDelay: `${delai}ms` }}
      className={cn("reveal", isVisible && "est-visible", className)}
    >
      {children}
    </div>
  );
}
