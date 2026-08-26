import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { cn } from "../lib/utils";

export function Section({
  id,
  children,
  className,
  paddingClassName = "py-20 sm:py-28",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  paddingClassName?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24", paddingClassName, className)}>
      <Container>{children}</Container>
    </section>
  );
}

/**
 * Chapeau de section : petite accroche colorée, gros titre « affiche »,
 * et un sous-titre optionnel. Le tout apparaît en cascade au défilement.
 */
export function TitreSection({
  accroche,
  titre,
  soulignement,
  sousTitre,
  alignement = "centre",
  sombre = false,
}: {
  accroche: string;
  titre: ReactNode;
  /** Mot mis en avant sous le titre, dans la serif italique. */
  soulignement?: string;
  sousTitre?: string;
  alignement?: "centre" | "gauche";
  sombre?: boolean;
}) {
  const centre = alignement === "centre";

  return (
    <div className={cn(centre && "text-center")}>
      <Reveal>
        <p
          className={cn(
            "inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.28em]",
            sombre ? "text-gold-400" : "text-tomato-500"
          )}
        >
          <span
            className={cn(
              "h-px w-8",
              sombre ? "bg-gold-400/60" : "bg-tomato-500/50"
            )}
          />
          {accroche}
        </p>
      </Reveal>

      <Reveal delai={90}>
        <h2
          className={cn(
            "mt-4 text-4xl sm:text-5xl lg:text-6xl",
            sombre ? "text-cream" : "text-ink"
          )}
        >
          {titre}
          {soulignement && (
            <>
              {" "}
              <span className="font-serif text-tomato-500 italic lowercase tracking-normal">
                {soulignement}
              </span>
            </>
          )}
        </h2>
      </Reveal>

      {sousTitre && (
        <Reveal delai={160}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
              centre && "mx-auto",
              sombre ? "text-cream/70" : "text-ink-soft"
            )}
          >
            {sousTitre}
          </p>
        </Reveal>
      )}
    </div>
  );
}
