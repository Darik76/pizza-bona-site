import { Container } from "./Container";
import { Bandeau } from "./Bandeau";
import { IconeFacebook, IconeInstagram, IconeFleche } from "./Icones";
import { siteConfig } from "../config/site";

export function Footer() {
  const annee = new Date().getFullYear();

  return (
    <footer className="relative bg-ink pb-24 text-cream/70 lg:pb-0">
      <div className="filet-tricolore h-1.5" aria-hidden="true" />

      <div className="border-b border-cream/10 py-4 text-cream/25">
        <Bandeau mots={siteConfig.bandeau} sens="inverse" separateur="·" />
      </div>

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="inline-block rounded-2xl bg-cream px-4 py-3">
            <img
              src="/images/logo.webp"
              alt={siteConfig.name}
              width={700}
              height={318}
              loading="lazy"
              className="h-9 w-auto"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {siteConfig.tagline}. Pâte pétrie maison, produits frais, cuisson au four.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.name} sur Facebook`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 transition-all duration-300 hover:-translate-y-1 hover:border-tomato-400 hover:text-tomato-400"
            >
              <IconeFacebook className="h-4.5 w-4.5" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.name} sur Instagram`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 transition-all duration-300 hover:-translate-y-1 hover:border-tomato-400 hover:text-tomato-400"
            >
              <IconeInstagram className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-display text-lg uppercase tracking-wider text-cream">
            Le site
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="lien-nav transition-colors hover:text-cream">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-lg uppercase tracking-wider text-cream">
            Nous joindre
          </p>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>{siteConfig.address.street}</p>
            <p>
              {siteConfig.address.postalCode} {siteConfig.address.city}
            </p>
            <a
              href={siteConfig.phone.href}
              className="inline-block font-display text-xl text-cream transition-colors hover:text-tomato-400"
            >
              {siteConfig.phone.display}
            </a>
          </address>
        </div>

        <div>
          <p className="font-display text-lg uppercase tracking-wider text-cream">
            Informations
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#mentions-legales" className="lien-nav hover:text-cream">
                Mentions légales
              </a>
            </li>
            <li>
              <a href="#politique-confidentialite" className="lien-nav hover:text-cream">
                Politique de confidentialité
              </a>
            </li>
            {siteConfig.legal.siret && <li>SIRET : {siteConfig.legal.siret}</li>}
          </ul>

          <a
            href="#accueil"
            className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cream/60 transition-colors hover:text-cream"
          >
            <IconeFleche className="h-4 w-4 -rotate-90 transition-transform duration-300 group-hover:-translate-y-1" />
            Haut de page
          </a>
        </div>
      </Container>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/45">
        © {annee} {siteConfig.name} — Tous droits réservés
      </div>
    </footer>
  );
}
