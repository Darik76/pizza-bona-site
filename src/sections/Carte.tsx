import { useMemo, useState } from "react";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { LigneCarte } from "../components/LigneCarte";
import { Button } from "../components/Button";
import { IconeTelephone, IconeFeuille, IconeFlamme } from "../components/Icones";
import { menuCategories, type MenuTag } from "../data/menu";
import { siteConfig } from "../config/site";
import { cn, formaterPrix } from "../lib/utils";

const FILTRES: { id: MenuTag; libelle: string; Icone: typeof IconeFeuille }[] = [
  { id: "vegetarien", libelle: "Végétarien", Icone: IconeFeuille },
  { id: "epice", libelle: "Épicé", Icone: IconeFlamme },
];

export function Carte() {
  const [categorieActive, setCategorieActive] = useState(menuCategories[0].id);
  const [filtres, setFiltres] = useState<MenuTag[]>([]);

  const basculerFiltre = (tag: MenuTag) =>
    setFiltres((actuels) =>
      actuels.includes(tag) ? actuels.filter((t) => t !== tag) : [...actuels, tag]
    );

  const categorie = useMemo(
    () => menuCategories.find((c) => c.id === categorieActive) ?? menuCategories[0],
    [categorieActive]
  );

  const plats = useMemo(
    () =>
      filtres.length === 0
        ? categorie.items
        : categorie.items.filter((item) =>
            filtres.every((tag) => item.tags?.includes(tag))
          ),
    [categorie, filtres]
  );

  return (
    <section
      id="carte"
      className="bg-braise bg-grain relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-tomato-500/15 blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-gold-400">
              <span className="h-px w-8 bg-gold-400/60" />
              La carte
            </p>
          </Reveal>
          <Reveal delai={90}>
            <h2 className="mt-4 text-4xl text-cream sm:text-5xl lg:text-6xl">
              Tout ce qui sort{" "}
              <span className="font-serif italic lowercase tracking-normal text-tomato-400">
                de notre four
              </span>
            </h2>
          </Reveal>
          <Reveal delai={160}>
            <p className="mx-auto mt-5 max-w-2xl text-base text-cream/65 sm:text-lg">
              Pizzas, rotolo, buns italiens, pâtes fraîches, bruschetta et desserts.
              Commande par téléphone : {siteConfig.phone.display}.
            </p>
          </Reveal>
        </div>

        {/* ---------- Onglets de catégories ---------- */}
        <Reveal delai={200}>
          <div className="sticky top-20 z-20 -mx-5 mt-10 px-5 py-3 sm:-mx-8 sm:px-8">
            <div
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-wrap lg:justify-center lg:overflow-visible [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Catégories de la carte"
            >
              {menuCategories.map((cat) => {
                const actif = cat.id === categorieActive;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={actif}
                    onClick={() => setCategorieActive(cat.id)}
                    className={cn(
                      "shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 font-display text-sm uppercase tracking-wider transition-all duration-300",
                      actif
                        ? "-translate-y-0.5 border-tomato-500 bg-tomato-500 text-cream shadow-[0_12px_26px_-12px_rgba(193,39,45,0.9)]"
                        : "border-cream/15 bg-ink-2/80 text-cream/70 backdrop-blur hover:border-cream/40 hover:text-cream"
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ---------- Filtres ---------- */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-cream/60">Filtrer :</span>
          {FILTRES.map(({ id, libelle, Icone }) => {
            const actif = filtres.includes(id);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={actif}
                onClick={() => basculerFiltre(id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300",
                  actif
                    ? "border-basil-400 bg-basil-500/20 text-basil-300"
                    : "border-cream/15 text-cream/55 hover:border-cream/35 hover:text-cream"
                )}
              >
                <Icone className="h-3.5 w-3.5" />
                {libelle}
              </button>
            );
          })}
        </div>

        {/* ---------- Plats ---------- */}
        <div className="mt-8 rounded-3xl border border-cream/10 bg-ink-2/60 p-6 backdrop-blur sm:p-9">
          <h3 className="font-serif text-2xl italic text-cream/80">{categorie.label}</h3>

          {plats.length > 0 ? (
            <ul
              // La clé change à chaque catégorie/filtre : React remonte la liste,
              // ce qui rejoue l'animation d'entrée des lignes.
              key={`${categorie.id}-${filtres.join("-")}`}
              className="mt-4"
            >
              {plats.map((plat, index) => (
                <LigneCarte key={plat.name} plat={plat} delai={index * 55} />
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-cream/60">
              Aucun plat de cette catégorie ne correspond au filtre choisi.
            </p>
          )}
        </div>

        {/* ---------- Formule & livraison ---------- */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Reveal variante="gauche">
            <div className="carte-relief h-full rounded-3xl border border-gold-400/25 bg-gold-400/10 p-7">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-gold-400">
                Uniquement le midi
              </p>
              <h3 className="mt-2 text-2xl text-cream">
                La formule à {formaterPrix(siteConfig.lunchFormula.price)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">
                {siteConfig.lunchFormula.description}
              </p>
            </div>
          </Reveal>

          <Reveal variante="droite" delai={90}>
            <div className="carte-relief h-full rounded-3xl border border-cream/10 bg-ink-2/60 p-7">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-tomato-400">
                Livraison à domicile
              </p>
              <h3 className="mt-2 text-2xl text-cream">{siteConfig.delivery.days}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-cream/65">
                <li>• À Lillebonne : {siteConfig.delivery.lillebonne}</li>
                <li>• Aux alentours : {siteConfig.delivery.alentours}</li>
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delai={120}>
          <div className="mt-10 text-center">
            <Button
              href={siteConfig.phone.href}
              variante="primaire"
              taille="grand"
              aria-label={`Commander par téléphone au ${siteConfig.phone.display}`}
            >
              <IconeTelephone className="h-5 w-5" />
              Commander par téléphone
            </Button>
            <p className="mt-3 text-xs uppercase tracking-wider text-cream/60">
              Les prix sont en euros, taxes comprises
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
