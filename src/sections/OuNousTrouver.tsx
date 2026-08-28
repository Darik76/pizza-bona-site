import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { Section, TitreSection } from "../components/Section";
import { IconeItineraire, IconeHorloge, IconeScooter } from "../components/Icones";
import { siteConfig } from "../config/site";
import { useEtatOuverture } from "../hooks/useEtatOuverture";
import { googleMapsDirectionsUrl, googleMapsEmbedUrl, wazeUrl } from "../lib/maps";
import { cn } from "../lib/utils";

export function OuNousTrouver() {
  const { ouvert, message } = useEtatOuverture();
  const indexAujourdhui = (new Date().getDay() + 6) % 7;

  return (
    <Section id="ou-nous-trouver">
      <TitreSection
        accroche="Infos pratiques"
        titre="Où nous"
        soulignement="trouver"
        sousTitre={`${siteConfig.address.full} — à deux pas du centre de ${siteConfig.city}.`}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* ---------- Horaires ---------- */}
        <Reveal variante="gauche">
          <div className="carte-relief h-full rounded-3xl border border-ink/5 bg-cream p-7 shadow-[0_18px_40px_-30px_rgba(23,15,13,0.6)] sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <h3 className="flex items-center gap-3 text-2xl text-ink">
                <IconeHorloge className="h-6 w-6 text-tomato-500" />
                Horaires
              </h3>
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
                  ouvert
                    ? "bg-basil-500/15 text-basil-600"
                    : "bg-tomato-500/10 text-tomato-600"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    ouvert ? "anim-pulsation bg-basil-500" : "bg-tomato-500"
                  )}
                />
                {message}
              </span>
            </div>

            <ul className="mt-6">
              {siteConfig.hours.map((h, index) => {
                const aujourdhui = index === indexAujourdhui;
                return (
                  <li
                    key={h.day}
                    className={cn(
                      "flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm transition-colors",
                      aujourdhui
                        ? "bg-tomato-500/8 font-semibold text-ink"
                        : "text-ink-soft hover:bg-ink/3"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {aujourdhui && (
                        <span className="h-1.5 w-1.5 rounded-full bg-tomato-500" />
                      )}
                      {h.day}
                    </span>
                    <span className={cn(h.hours === "Fermé" && "text-ink-soft")}>
                      {h.hours}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                href={googleMapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                variante="primaire"
                className="flex-1"
                aria-label="Ouvrir l'itinéraire dans Google Maps"
              >
                <IconeItineraire className="h-4 w-4" />
                Itinéraire
              </Button>
              <Button
                href={wazeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                variante="secondaire"
                className="flex-1"
                aria-label="Ouvrir l'itinéraire dans Waze"
              >
                Waze
              </Button>
            </div>
          </div>
        </Reveal>

        {/* ---------- Carte + livraison ---------- */}
        <div className="flex flex-col gap-6">
          <Reveal variante="droite">
            <div className="group overflow-hidden rounded-3xl border border-ink/5 shadow-warm">
              <iframe
                title={`Carte : ${siteConfig.name} à ${siteConfig.city}`}
                src={googleMapsEmbedUrl()}
                className="h-[320px] w-full transition-transform duration-700 group-hover:scale-[1.02] lg:h-[380px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal variante="droite" delai={110}>
            <div className="carte-relief rounded-3xl bg-ink p-7 text-cream">
              <h3 className="flex items-center gap-3 text-2xl text-cream">
                <IconeScooter className="h-6 w-6 text-gold-400" />
                Livraison
              </h3>
              <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-gold-400">
                {siteConfig.delivery.days}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-cream/70">
                <li>• À {siteConfig.city} : {siteConfig.delivery.lillebonne}</li>
                <li>• Aux alentours : {siteConfig.delivery.alentours}</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
