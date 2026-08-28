import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { IconeFlamme, IconeFeuille, IconeScooter } from "../components/Icones";
import { siteConfig, type Chiffre } from "../config/site";
import { useCountUp } from "../hooks/useCountUp";

const ATOUTS = [
  {
    Icone: IconeFeuille,
    titre: "Pâte pétrie maison",
    texte:
      "Une pâte travaillée sur place et poussée lentement, pour un moelleux et un croustillant qui ne trichent pas.",
    couleur: "text-basil-500",
    fond: "bg-basil-500/10",
  },
  {
    Icone: IconeFlamme,
    titre: "Cuisson au four",
    texte:
      "Sauce tomate mijotée maison, mozza Fior Di Latte, produits frais choisis avec soin, puis direction le four.",
    couleur: "text-tomato-500",
    fond: "bg-tomato-500/10",
  },
  {
    Icone: IconeScooter,
    titre: "Sur place, à emporter, livré",
    texte: `Livraison à domicile ${siteConfig.delivery.days.toLowerCase()}. Sinon, on vous garde une table ou on prépare votre carton.`,
    couleur: "text-gold-500",
    fond: "bg-gold-400/15",
  },
];

function Compteur({ chiffre }: { chiffre: Chiffre }) {
  const { ref, texte } = useCountUp(chiffre.valeur, chiffre.decimales ?? 0);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl text-tomato-500 sm:text-5xl">
        {texte}
        <span className="text-ink">{chiffre.suffixe}</span>
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
        {chiffre.label}
      </p>
    </div>
  );
}

export function Atouts() {
  return (
    <Section className="bg-cream-2/60" paddingClassName="py-16 sm:py-20">
      {/* Cette section n'a pas de titre visible, mais la hiérarchie des titres
          doit rester continue (h1 → h2 → h3) pour les lecteurs d'écran et pour
          Google : on en met un, réservé aux technologies d'assistance. */}
      <h2 className="sr-only">Notre savoir-faire en quelques chiffres</h2>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {siteConfig.chiffres.map((chiffre, index) => (
          <Reveal key={chiffre.label} delai={index * 90} variante="zoom">
            <Compteur chiffre={chiffre} />
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {ATOUTS.map(({ Icone, titre, texte, couleur, fond }, index) => (
          <Reveal key={titre} delai={index * 110}>
            <article className="carte-relief h-full rounded-3xl border border-ink/5 bg-cream p-7 shadow-[0_18px_40px_-30px_rgba(23,15,13,0.6)]">
              <span
                className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${fond} ${couleur}`}
              >
                <Icone className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-2xl text-ink">{titre}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{texte}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
