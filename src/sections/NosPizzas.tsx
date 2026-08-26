import { useState } from "react";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { TitreSection } from "../components/Section";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { cn } from "../lib/utils";

const TOTAL_PHOTOS = 20;
const PHOTOS = Array.from(
  { length: TOTAL_PHOTOS },
  (_, i) => `/images/pizzas/pizza-${String(i + 1).padStart(2, "0")}.webp`
);

// Deux rangées qui défilent en sens opposés : la première moitié des photos
// en haut, la seconde en bas.
const RANGEE_HAUT = PHOTOS.slice(0, 10);
const RANGEE_BAS = PHOTOS.slice(10);

function Photo({ src, index }: { src: string; index: number }) {
  return (
    <figure className="group relative mx-2 h-40 w-56 shrink-0 overflow-hidden rounded-2xl shadow-warm sm:h-52 sm:w-72">
      <img
        src={src}
        alt={`Pizza préparée chez Pizza Bona — photo ${index + 1}`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </figure>
  );
}

function Rangee({
  photos,
  sens,
  decalage,
  enPause,
  duree,
}: {
  photos: string[];
  sens: "normal" | "inverse";
  decalage: number;
  enPause: boolean;
  duree: number;
}) {
  return (
    <div className="fondu-bords overflow-hidden py-2">
      <div
        className="defile-piste"
        data-sens={sens}
        style={{
          animationDuration: `${duree}s`,
          animationPlayState: enPause ? "paused" : "running",
        }}
      >
        {[...photos, ...photos].map((src, i) => (
          <Photo key={`${src}-${i}`} src={src} index={(i % photos.length) + decalage} />
        ))}
      </div>
    </div>
  );
}

export function NosPizzas() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [enPause, setEnPause] = useState(false);

  return (
    <section id="nos-pizzas" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <Container>
        <TitreSection
          accroche="La galerie"
          titre="Sorties"
          soulignement="du four"
          sousTitre="Une vingtaine de nos créations, photographiées juste avant d'être servies. Survolez pour mettre le défilé en pause."
        />
      </Container>

      <div
        className="mt-12"
        onMouseEnter={() => setEnPause(true)}
        onMouseLeave={() => setEnPause(false)}
      >
        {prefersReducedMotion ? (
          // Sans animation : une simple bande que l'on fait défiler à la main.
          <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-4">
            {PHOTOS.map((src, i) => (
              <div key={src} className="snap-center">
                <Photo src={src} index={i} />
              </div>
            ))}
          </div>
        ) : (
          <Reveal variante="zoom">
            <Rangee
              photos={RANGEE_HAUT}
              sens="normal"
              decalage={0}
              enPause={enPause}
              duree={52}
            />
            <Rangee
              photos={RANGEE_BAS}
              sens="inverse"
              decalage={10}
              enPause={enPause}
              duree={62}
            />
          </Reveal>
        )}
      </div>

      {!prefersReducedMotion && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setEnPause((p) => !p)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-ink-soft transition-colors hover:border-tomato-500 hover:text-tomato-600"
            )}
          >
            {enPause ? "▶ Reprendre le défilé" : "⏸ Mettre en pause"}
          </button>
        </div>
      )}
    </section>
  );
}
