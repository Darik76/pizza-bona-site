import type { ReactNode } from "react";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { siteConfig } from "../config/site";

// ⚠️ À FAIRE VALIDER : les mentions légales sont obligatoires en France pour un
// site professionnel (art. 6 III de la LCEN). Les champs marqués « à compléter »
// ci-dessous doivent être renseignés dans src/config/site.ts (section `legal`)
// avant de considérer le site comme conforme.

function ChampAComplete({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-tomato-500/10 px-1.5 py-0.5 font-semibold text-tomato-600">
      {children}
    </span>
  );
}

function Bloc({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <div>
      <p className="font-display text-sm uppercase tracking-wider text-ink">{titre}</p>
      <div className="mt-1.5 leading-relaxed">{children}</div>
    </div>
  );
}

function Depliant({
  id,
  titre,
  children,
}: {
  id: string;
  titre: string;
  children: ReactNode;
}) {
  return (
    <details
      id={id}
      className="group scroll-mt-28 rounded-2xl border border-ink/8 bg-cream p-5 transition-colors hover:border-ink/15 sm:p-6"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg uppercase tracking-wide text-ink">
        {titre}
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-xl leading-none transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="mt-5 space-y-5 text-sm text-ink-soft">{children}</div>
    </details>
  );
}

export function Legal() {
  const { legal } = siteConfig;
  const siretRenseigne = legal.siret && !/^0[\s0]*$/.test(legal.siret);

  return (
    <Section className="bg-cream-2/60" paddingClassName="py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-center text-2xl text-ink sm:text-3xl">
            Informations légales
          </h2>
        </Reveal>

        <Reveal delai={90}>
          <div className="mt-8 space-y-4">
            <Depliant id="mentions-legales" titre="Mentions légales">
              <Bloc titre="Éditeur du site">
                <p>
                  {siteConfig.name} — {siteConfig.address.full}
                  <br />
                  Téléphone : {siteConfig.phone.display}
                </p>
              </Bloc>

              <Bloc titre="Identification de l'entreprise">
                <p>
                  SIRET :{" "}
                  {siretRenseigne ? legal.siret : <ChampAComplete>à compléter</ChampAComplete>}
                  <br />
                  Directeur de la publication :{" "}
                  {legal.directeurPublication ? (
                    legal.directeurPublication
                  ) : (
                    <ChampAComplete>à compléter</ChampAComplete>
                  )}
                </p>
              </Bloc>

              <Bloc titre="Hébergement">
                <p>
                  Ce site est hébergé par {legal.hebergeur.nom},{" "}
                  {legal.hebergeur.adresse} —{" "}
                  <a
                    href={legal.hebergeur.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-colors hover:text-tomato-600"
                  >
                    {legal.hebergeur.site.replace(/^https?:\/\//, "")}
                  </a>
                </p>
              </Bloc>

              <Bloc titre="Propriété intellectuelle">
                <p>
                  Les photographies, textes et le logo présents sur ce site sont la
                  propriété de {siteConfig.name} et ne peuvent être réutilisés sans
                  autorisation.
                </p>
              </Bloc>
            </Depliant>

            <Depliant id="politique-confidentialite" titre="Politique de confidentialité">
              <Bloc titre="Aucune donnée collectée">
                <p>
                  Ce site est une simple vitrine : il ne propose ni formulaire, ni
                  création de compte, ni newsletter. Nous ne collectons donc aucune
                  donnée personnelle vous concernant, et n'utilisons aucun outil de
                  mesure d'audience ni de publicité.
                </p>
              </Bloc>

              <Bloc titre="Carte Google Maps">
                <p>
                  La carte de la section « Où nous trouver » est fournie par Google
                  Maps. Elle ne se charge <strong>que si vous cliquez</strong> sur
                  « Afficher la carte » : tant que vous ne le faites pas, aucune donnée
                  n'est transmise à Google. Si vous l'affichez, Google peut déposer des
                  cookies et recueillir des informations techniques (dont votre adresse
                  IP), selon ses propres conditions. Nous n'avons accès à aucune de ces
                  données.
                </p>
              </Bloc>

              <Bloc titre="Commandes par téléphone">
                <p>
                  Les commandes se font uniquement par téléphone. Les informations que
                  vous nous communiquez à cette occasion servent seulement à préparer et
                  livrer votre commande, et ne sont ni revendues, ni transmises à des
                  tiers.
                </p>
              </Bloc>

              <Bloc titre="Vos droits">
                <p>
                  Pour toute question relative à vos données, contactez-nous au{" "}
                  <a
                    href={siteConfig.phone.href}
                    className="underline transition-colors hover:text-tomato-600"
                  >
                    {siteConfig.phone.display}
                  </a>
                  .
                </p>
              </Bloc>
            </Depliant>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
