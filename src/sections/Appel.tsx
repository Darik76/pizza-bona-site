import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { IconeTelephone, IconeFacebook, IconeInstagram } from "../components/Icones";
import { siteConfig } from "../config/site";
import { image } from "../lib/assets";

export function Appel() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      {/* Photo d'ambiance en fond, assombrie pour garder le texte lisible */}
      <img
        src={image("accueil.webp")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-105 object-cover blur-[2px]"
      />
      <div className="absolute inset-0 bg-ink/92" aria-hidden="true" />
      <div className="bg-grain absolute inset-0" aria-hidden="true" />

      <Container className="relative z-10 py-20 text-center sm:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-400">
            Une envie de pizza ?
          </p>
        </Reveal>

        <Reveal delai={90}>
          <h2 className="mt-5 text-4xl text-cream sm:text-5xl lg:text-6xl">
            On décroche,{" "}
            <span className="font-serif italic lowercase tracking-normal text-tomato-400">
              vous dégustez
            </span>
          </h2>
        </Reveal>

        <Reveal delai={160}>
          <p className="mx-auto mt-5 max-w-xl text-cream/70">
            Les commandes se font uniquement par téléphone : on prépare votre pizza
            pendant que vous arrivez.
          </p>
        </Reveal>

        <Reveal delai={230} variante="zoom">
          <a
            href={siteConfig.phone.href}
            aria-label={`Appeler ${siteConfig.name} au ${siteConfig.phone.display}`}
            className="group mt-10 inline-flex items-center gap-4 font-display text-[clamp(2.2rem,7vw,4.5rem)] leading-none text-cream transition-colors duration-300 hover:text-gold-400"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-tomato-500 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 sm:h-20 sm:w-20">
              <IconeTelephone className="h-6 w-6 text-cream sm:h-9 sm:w-9" />
            </span>
            {siteConfig.phone.display}
          </a>
        </Reveal>

        <Reveal delai={300}>
          <div className="mt-12 flex flex-col items-center gap-6">
            <p className="text-sm uppercase tracking-wider text-cream/50">
              {siteConfig.address.full}
            </p>

            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.name} sur Facebook`}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-all duration-300 hover:-translate-y-1 hover:border-tomato-400 hover:bg-tomato-500 hover:text-cream"
              >
                <IconeFacebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.name} sur Instagram`}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-all duration-300 hover:-translate-y-1 hover:border-tomato-400 hover:bg-tomato-500 hover:text-cream"
              >
                <IconeInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
