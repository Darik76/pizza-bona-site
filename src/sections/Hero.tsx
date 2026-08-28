import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { TitreAnime } from "../components/TitreAnime";
import { IconeTelephone, IconeItineraire, IconeHorloge } from "../components/Icones";
import { siteConfig } from "../config/site";
import { pizzaOfMonth } from "../data/menu";
import { useEtatOuverture } from "../hooks/useEtatOuverture";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { googleMapsDirectionsUrl } from "../lib/maps";
import { cn, formaterPrix } from "../lib/utils";
import { image } from "../lib/assets";

export function Hero() {
  const { ouvert, message } = useEtatOuverture();
  const prefersReducedMotion = usePrefersReducedMotion();
  const zone = useRef<HTMLDivElement>(null);
  const [parallaxe, setParallaxe] = useState({ x: 0, y: 0 });
  const [offsetDefilement, setOffsetDefilement] = useState(0);

  // La pizza suit légèrement la souris : l'effet donne de la profondeur sans
  // jamais bouger le texte, qui doit rester lisible.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = zone.current;
    if (!node) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      setParallaxe({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      });
    };

    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, [prefersReducedMotion]);

  // Léger décalage au défilement (parallaxe verticale).
  useEffect(() => {
    if (prefersReducedMotion) return;
    let frame = 0;
    const onScroll = () => {
      if (frame !== 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setOffsetDefilement(Math.min(window.scrollY, 700));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="accueil"
      ref={zone}
      className="bg-braise bg-grain relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      {/* Halos de four, décoratifs */}
      <div
        className="anim-scintille pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-tomato-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="anim-scintille pointer-events-none absolute right-0 top-10 h-64 w-64 rounded-full bg-gold-400/15 blur-3xl"
        style={{ animationDelay: "1.2s" }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* ---------- Colonne texte ---------- */}
          <div>
            <div
              className="flex flex-wrap items-center gap-3"
              style={{ animation: "bona-monter 0.8s ease-out both" }}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider",
                  ouvert
                    ? "border-basil-400/40 bg-basil-500/15 text-basil-300"
                    : "border-cream/15 bg-cream/5 text-cream/70"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    ouvert ? "anim-pulsation bg-basil-400" : "bg-cream/50"
                  )}
                />
                {message}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream/70">
                <IconeItineraire className="h-3.5 w-3.5 text-tomato-400" />
                {siteConfig.address.city}
              </span>
            </div>

            <h1 className="mt-7 text-[clamp(2.9rem,9vw,5.6rem)] leading-[0.9] text-cream">
              <TitreAnime texte="La vraie pizza" delaiInitial={80} pas={65} />
              <span className="block">
                <span
                  className="inline-block font-serif italic lowercase tracking-tight text-gold-400"
                  style={{
                    animation: "bona-mot 1s cubic-bezier(0.16,1,0.3,1) both",
                    animationDelay: "300ms",
                  }}
                >
                  artisanale
                </span>
              </span>
              <TitreAnime texte="à Lillebonne" delaiInitial={420} pas={65} />
            </h1>

            <p
              className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75"
              style={{ animation: "bona-monter 0.8s ease-out 560ms both" }}
            >
              {siteConfig.heroTaglines[0]} Pâte pétrie chaque jour, sauce mijotée
              maison, mozza Fior Di Latte et cuisson au four.
            </p>

            <div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animation: "bona-monter 0.8s ease-out 660ms both" }}
            >
              <Button
                href={siteConfig.phone.href}
                variante="primaire"
                taille="grand"
                aria-label={`Commander : ${siteConfig.phone.display} — appeler ${siteConfig.name}`}
              >
                <IconeTelephone className="h-5 w-5" />
                Commander : {siteConfig.phone.display}
              </Button>
              <Button href="#carte" variante="clair" taille="grand">
                Voir la carte
              </Button>
            </div>

            <dl
              className="mt-11 grid max-w-lg grid-cols-2 gap-6 border-t border-cream/10 pt-7 sm:grid-cols-3"
              style={{ animation: "bona-monter 0.8s ease-out 760ms both" }}
            >
              <div>
                <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-cream/65">
                  <IconeHorloge className="h-3.5 w-3.5" /> Midi & soir
                </dt>
                <dd className="mt-1 font-display text-lg text-cream">Du mardi au dimanche</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/65">Adresse</dt>
                <dd className="mt-1 font-display text-lg text-cream">
                  <a
                    href={googleMapsDirectionsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold-400"
                  >
                    {siteConfig.address.street}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-cream/65">Service</dt>
                <dd className="mt-1 font-display text-lg text-cream">
                  Sur place · Emporter
                </dd>
              </div>
            </dl>
          </div>

          {/* ---------- Colonne pizza ---------- */}
          <div
            className="relative mx-auto w-full max-w-[300px] sm:max-w-md lg:max-w-none"
            style={{
              transform: `translate3d(${parallaxe.x * 12}px, ${parallaxe.y * 12 - offsetDefilement * 0.08}px, 0)`,
              transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div
              className="relative aspect-square"
              style={{ animation: "bona-zoom 1s cubic-bezier(0.16,1,0.3,1) 260ms both" }}
            >
              {/* Anneau pointillé qui tourne */}
              <div
                className="anim-tourner-lent absolute inset-0 rounded-full border-2 border-dashed border-gold-400/30"
                aria-hidden="true"
              />
              <div
                className="absolute inset-6 rounded-full bg-tomato-500/20 blur-2xl"
                aria-hidden="true"
              />

              {/* Vapeur */}
              {!prefersReducedMotion &&
                [0, 1, 2].map((i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="anim-vapeur absolute left-1/2 top-2 h-16 w-6 -translate-x-1/2 rounded-full bg-cream/25 blur-md"
                    style={{
                      animation: "bona-vapeur 4.5s ease-out infinite",
                      animationDelay: `${i * 1.4}s`,
                      marginLeft: `${(i - 1) * 34}px`,
                    }}
                  />
                ))}

              <img
                src={image("pizza.webp")}
                alt="Pizza artisanale Pizza Bona sortie du four, roquette et jambon cru"
                width={550}
                height={440}
                fetchPriority="high"
                decoding="async"
                className={cn(
                  "absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-full object-cover shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-4 ring-cream/10",
                  !prefersReducedMotion && "anim-tourner-lent"
                )}
              />

              {/* Pastille prix */}
              <div className="anim-flotter absolute -bottom-2 -left-2 rotate-[-8deg] rounded-2xl bg-cream px-5 py-3 shadow-warm sm:left-2">
                <p className="font-display text-xs uppercase tracking-wider text-tomato-500">
                  {pizzaOfMonth.name}
                </p>
                <p className="font-display text-2xl leading-none text-ink">
                  {formaterPrix(pizzaOfMonth.price)}
                </p>
              </div>

              {/* Pastille note */}
              <div
                className="anim-flotter absolute -right-1 top-6 rotate-[7deg] rounded-2xl bg-basil-500 px-4 py-3 text-cream shadow-warm"
                style={{ animationDelay: "1.5s" }}
              >
                <p className="font-display text-2xl leading-none">4,5★</p>
                <p className="text-[10px] uppercase tracking-wider opacity-80">
                  Avis Google
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Invitation à défiler */}
      <a
        href="#nos-pizzas"
        aria-label="Découvrir nos pizzas"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/60 transition-colors hover:text-cream sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Défilez</span>
        <span className="anim-rebond flex h-9 w-6 items-start justify-center rounded-full border border-cream/30 pt-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cream" />
        </span>
      </a>
    </section>
  );
}
