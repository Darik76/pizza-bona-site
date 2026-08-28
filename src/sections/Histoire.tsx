import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { siteConfig } from "../config/site";
import { image } from "../lib/assets";

const ETAPES = [
  {
    numero: "01",
    titre: "La pâte",
    texte: "Pétrie sur place et poussée lentement, pour un bord aérien et croustillant.",
  },
  {
    numero: "02",
    titre: "La garniture",
    texte: "Sauce tomate mijotée maison, mozza Fior Di Latte et produits frais de saison.",
  },
  {
    numero: "03",
    titre: "Le four",
    texte: "Quelques minutes à haute température : la pizza sort dorée, elle part aussitôt.",
  },
];

export function Histoire() {
  return (
    <Section id="notre-histoire" className="overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Mosaïque de photos */}
        <div className="relative">
          <Reveal variante="gauche">
            <img
              src={image("facade.webp")}
              alt={`Façade de ${siteConfig.name} à ${siteConfig.city}`}
              loading="lazy"
              decoding="async"
              className="aspect-4/3 w-full rounded-[2rem] object-cover shadow-warm transition-transform duration-700 hover:scale-[1.02]"
            />
          </Reveal>

          {/* Les vignettes sont positionnées via le conteneur <Reveal> : son
              animation crée un contexte de positionnement, une image en
              `absolute` à l'intérieur se placerait donc par rapport à lui. */}
          <Reveal
            variante="zoom"
            delai={220}
            className="absolute -bottom-10 -right-2 hidden sm:block lg:-right-8"
          >
            <img
              src={image("four.webp")}
              alt="Le four de la pizzeria"
              loading="lazy"
              decoding="async"
              className="h-44 w-44 rounded-2xl border-4 border-cream object-cover shadow-warm transition-transform duration-700 hover:scale-105 lg:h-52 lg:w-52"
            />
          </Reveal>

          <Reveal
            variante="zoom"
            delai={340}
            className="absolute -left-8 -top-10 hidden lg:block"
          >
            <img
              src={image("salle.webp")}
              alt="La salle de la pizzeria"
              loading="lazy"
              decoding="async"
              className="h-36 w-36 rotate-[-6deg] rounded-2xl border-4 border-cream object-cover shadow-warm transition-transform duration-700 hover:rotate-0"
            />
          </Reveal>
        </div>

        {/* Texte */}
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-tomato-500">
              <span className="h-px w-8 bg-tomato-500/50" />
              Notre histoire
            </p>
          </Reveal>

          <Reveal delai={90}>
            <h2 className="mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">
              Une passion{" "}
              <span className="font-serif italic lowercase tracking-normal text-tomato-500">
                familiale
              </span>{" "}
              pour la vraie pizza
            </h2>
          </Reveal>

          <Reveal delai={160}>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
              <p>
                {siteConfig.name} est née d'une envie simple : partager avec{" "}
                {siteConfig.city} une pizza comme on l'aime en Italie — une pâte
                longuement pétrie, des produits frais choisis avec soin, et une cuisson
                qui donne à chaque pizza son croustillant caractéristique.
              </p>
              <p>
                Ici, tout est fait maison. Notre équipe met le même soin dans chaque
                pizza, qu'elle soit dégustée sur place dans une ambiance conviviale ou
                emportée chez vous.
              </p>
            </div>
          </Reveal>

          <ol className="mt-10 space-y-5">
            {ETAPES.map((etape, index) => (
              <Reveal key={etape.numero} delai={220 + index * 110} variante="droite">
                <li className="group flex gap-5">
                  <span className="font-display text-3xl text-tomato-500/25 transition-colors duration-300 group-hover:text-tomato-500">
                    {etape.numero}
                  </span>
                  <span>
                    <span className="block font-display text-xl uppercase text-ink">
                      {etape.titre}
                    </span>
                    <span className="mt-1 block text-[15px] text-ink-soft">
                      {etape.texte}
                    </span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
