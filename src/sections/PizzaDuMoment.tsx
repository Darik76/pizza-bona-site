import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { IconeTelephone } from "../components/Icones";
import { pizzaOfMonth } from "../data/menu";
import { siteConfig } from "../config/site";
import { formaterPrix } from "../lib/utils";
import { image } from "../lib/assets";

/** Macaron circulaire dont le texte tourne autour de l'image. */
function Macaron() {
  return (
    <div className="anim-tourner-lent absolute -left-6 -top-8 h-28 w-28 sm:-left-10 sm:h-32 sm:w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
        <defs>
          <path
            id="cercle-macaron"
            d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"
            fill="none"
          />
        </defs>
        <circle cx="50" cy="50" r="46" fill="#c1272d" />
        <text
          fill="#fdf6ea"
          fontSize="10.5"
          fontFamily="Anton, Impact, sans-serif"
          letterSpacing="2.6"
        >
          <textPath href="#cercle-macaron" startOffset="0">
            CRÉATION DU CHEF · PRODUITS DE SAISON ·
          </textPath>
        </text>
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fill="#eab543"
          fontSize="22"
          fontFamily="Anton, Impact, sans-serif"
        >
          🍕
        </text>
      </svg>
    </div>
  );
}

export function PizzaDuMoment() {
  return (
    <Section className="overflow-hidden bg-nappe">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal variante="gauche">
          <div className="relative">
            <div
              className="absolute -inset-3 rotate-3 rounded-[2rem] bg-tomato-500/10"
              aria-hidden="true"
            />
            <img
              src={image("pizza-du-mois.webp")}
              alt="La pizza du moment de Pizza Bona"
              loading="lazy"
              decoding="async"
              className="relative aspect-4/3 w-full rounded-[2rem] object-cover shadow-warm"
            />
            <Macaron />
          </div>
        </Reveal>

        <div>
          <Reveal delai={80}>
            <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {pizzaOfMonth.badge}
            </span>
          </Reveal>

          <Reveal delai={150}>
            <h2 className="mt-5 text-4xl text-ink sm:text-5xl">
              {pizzaOfMonth.name}
            </h2>
          </Reveal>

          <Reveal delai={220}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              {pizzaOfMonth.description}
            </p>
          </Reveal>

          <Reveal delai={290}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl text-tomato-500">
                  {formaterPrix(pizzaOfMonth.price)}
                </span>
                <span className="text-sm text-ink-soft">ou 9,00 € en mini</span>
              </div>
            </div>
          </Reveal>

          <Reveal delai={360}>
            <Button
              href={siteConfig.phone.href}
              variante="sombre"
              taille="grand"
              className="mt-8"
              aria-label={`Appeler ${siteConfig.name} au ${siteConfig.phone.display}`}
            >
              <IconeTelephone className="h-5 w-5" />
              Demandez-la au téléphone
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
