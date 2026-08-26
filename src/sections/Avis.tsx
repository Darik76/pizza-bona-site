import { useCallback, useEffect, useState } from "react";
import { Reveal } from "../components/Reveal";
import { Section, TitreSection } from "../components/Section";
import { IconeEtoile } from "../components/Icones";
import { googleReviews, googleRating } from "../data/reviews";
import { googleReviewsUrl } from "../lib/maps";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { cn } from "../lib/utils";

const TOTAL = googleReviews.length;

function Etoiles({ note, className }: { note: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-1", className)} aria-label={`${note} sur 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <IconeEtoile
          key={i}
          className={cn(
            "h-4 w-4 transition-transform duration-500",
            i < Math.round(note) ? "text-gold-400" : "text-ink/15"
          )}
        />
      ))}
    </span>
  );
}

export function Avis() {
  const [index, setIndex] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const aller = useCallback((dir: 1 | -1) => {
    setIndex((i) => (i + dir + TOTAL) % TOTAL);
  }, []);

  // Défilement automatique, suspendu au survol ou au focus clavier
  // (exigence d'accessibilité WCAG 2.2.2).
  useEffect(() => {
    if (enPause || prefersReducedMotion) return;
    const id = setInterval(() => aller(1), 6000);
    return () => clearInterval(id);
  }, [aller, enPause, prefersReducedMotion]);

  const avis = googleReviews[index];

  return (
    <Section id="avis-google" className="bg-cream-2/60">
      <TitreSection
        accroche="Ils ont goûté"
        titre="Ce qu'on dit"
        soulignement="de nous"
      />

      <div
        className="mx-auto mt-12 max-w-3xl"
        onMouseEnter={() => setEnPause(true)}
        onMouseLeave={() => setEnPause(false)}
        onFocusCapture={() => setEnPause(true)}
        onBlurCapture={() => setEnPause(false)}
      >
        <Reveal variante="zoom">
          <div className="relative rounded-[2rem] border border-ink/5 bg-cream p-8 shadow-warm sm:p-12">
            <span
              className="absolute -top-6 left-8 font-serif text-8xl leading-none text-tomato-500/25"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <div
              key={index}
              style={{ animation: "bona-monter 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              <Etoiles note={avis.rating} />
              <blockquote className="mt-5 font-serif text-xl leading-relaxed text-ink sm:text-2xl">
                {avis.text}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tomato-500 font-display text-lg text-cream">
                  {avis.author.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{avis.author}</span>
                  <span className="block text-sm text-ink-soft">
                    Avis Google · {avis.date}
                  </span>
                </span>
              </figcaption>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink/8 pt-6">
              <div className="flex gap-2">
                {googleReviews.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Avis ${i + 1} sur ${TOTAL}`}
                    aria-current={i === index}
                    className={cn(
                      "h-2 rounded-full transition-all duration-400",
                      i === index ? "w-7 bg-tomato-500" : "w-2 bg-ink/20 hover:bg-ink/40"
                    )}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => aller(-1)}
                  aria-label="Avis précédent"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-xl leading-none text-ink transition-all hover:-translate-x-0.5 hover:border-tomato-500 hover:text-tomato-600"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => aller(1)}
                  aria-label="Avis suivant"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-xl leading-none text-ink transition-all hover:translate-x-0.5 hover:border-tomato-500 hover:text-tomato-600"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delai={120}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-6">
            <p className="flex items-center gap-3">
              <span className="font-display text-4xl text-ink">
                {googleRating.value.toString().replace(".", ",")}
              </span>
              <Etoiles note={googleRating.value} />
            </p>
            <a
              href={googleReviewsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="lien-nav text-sm font-semibold uppercase tracking-wider text-tomato-600"
            >
              Voir tous les avis sur Google
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
