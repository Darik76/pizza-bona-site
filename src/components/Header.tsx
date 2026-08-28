import { useEffect, useState } from "react";
import { siteConfig } from "../config/site";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useSectionActive } from "../hooks/useSectionActive";
import { useEtatOuverture } from "../hooks/useEtatOuverture";
import { IconeTelephone, IconeFacebook, IconeInstagram } from "./Icones";
import { cn } from "../lib/utils";
import { image } from "../lib/assets";

const ANCRES = siteConfig.nav.map((item) => item.href);

export function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [defile, setDefile] = useState(false);
  const progression = useScrollProgress();
  const ancreActive = useSectionActive(ANCRES);
  const { ouvert, message } = useEtatOuverture();

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile ouvert : on bloque le défilement de la page derrière l'overlay.
  useEffect(() => {
    document.body.style.overflow = menuOuvert ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOuvert]);

  // Échap referme le menu — réflexe attendu au clavier.
  useEffect(() => {
    if (!menuOuvert) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOuvert(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOuvert]);

  return (
    <>
      {/* Progression de lecture de la page */}
      <div
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-tomato-500"
        style={{ transform: `scaleX(${progression})` }}
        aria-hidden="true"
      />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-ink/5 bg-cream/90 pl-4 pr-3 backdrop-blur-md transition-all duration-500",
            defile ? "py-2 shadow-warm" : "py-3 shadow-[0_10px_30px_-20px_rgba(23,15,13,0.6)]"
          )}
        >
          <a
            href="#accueil"
            aria-label={`${siteConfig.name} — Accueil`}
            className="shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={image("logo.webp")}
              alt={siteConfig.name}
              width={420}
              height={171}
              className={cn(
                "w-auto transition-all duration-500",
                defile ? "h-8 sm:h-9" : "h-9 sm:h-11"
              )}
            />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-actif={ancreActive === item.href}
                className="lien-nav text-sm font-semibold uppercase tracking-wide text-ink/80 transition-colors hover:text-tomato-600 data-[actif=true]:text-tomato-600"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold md:inline-flex",
                ouvert ? "bg-basil-500/15 text-basil-600" : "bg-ink/8 text-ink-soft"
              )}
              title={message}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  ouvert ? "bg-basil-500 anim-pulsation" : "bg-ink-soft"
                )}
              />
              {ouvert ? "Ouvert" : "Fermé"}
            </span>

            <a
              href={siteConfig.phone.href}
              aria-label={`Appeler ${siteConfig.name} au ${siteConfig.phone.display}`}
              className="brillance hidden items-center gap-2 rounded-full bg-tomato-500 px-5 py-2.5 font-display text-sm uppercase tracking-wider text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-tomato-600 sm:inline-flex"
            >
              <IconeTelephone className="h-4 w-4" />
              {siteConfig.phone.display}
            </a>

            {/* Version compacte du bouton d'appel sur les petits écrans */}
            <a
              href={siteConfig.phone.href}
              aria-label={`Appeler ${siteConfig.name} au ${siteConfig.phone.display}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-tomato-500 text-cream transition-transform duration-300 hover:scale-105 sm:hidden"
            >
              <IconeTelephone className="h-4.5 w-4.5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOuvert((o) => !o)}
              aria-label={menuOuvert ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOuvert}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full bg-ink/5 transition-colors hover:bg-ink/10 lg:hidden"
            >
              <span
                className={cn(
                  "h-[2px] w-5 bg-ink transition-transform duration-300",
                  menuOuvert && "translate-y-[7px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-5 bg-ink transition-opacity duration-200",
                  menuOuvert && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-[2px] w-5 bg-ink transition-transform duration-300",
                  menuOuvert && "-translate-y-[7px] -rotate-45"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu plein écran (mobile / tablette) */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink-2 transition-[opacity,visibility] duration-400 lg:hidden",
          menuOuvert ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="bg-grain relative flex h-full flex-col justify-center px-8">
          <nav className="flex flex-col gap-1">
            {siteConfig.nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOuvert(false)}
                style={{
                  transitionDelay: menuOuvert ? `${120 + index * 70}ms` : "0ms",
                }}
                className={cn(
                  "group flex items-baseline gap-4 border-b border-cream/10 py-4 font-display text-4xl uppercase text-cream transition-all duration-500 sm:text-5xl",
                  menuOuvert ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                )}
              >
                <span className="font-body text-xs text-gold-400">
                  0{index + 1}
                </span>
                <span className="transition-colors group-hover:text-tomato-400">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div
            style={{ transitionDelay: menuOuvert ? "560ms" : "0ms" }}
            className={cn(
              "mt-10 transition-all duration-500",
              menuOuvert ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            )}
          >
            <a
              href={siteConfig.phone.href}
              className="brillance inline-flex items-center gap-3 rounded-full bg-tomato-500 px-7 py-4 font-display text-lg uppercase tracking-wider text-cream"
            >
              <IconeTelephone className="h-5 w-5" />
              {siteConfig.phone.display}
            </a>

            <div className="mt-8 flex items-center gap-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.name} sur Facebook`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-tomato-400 hover:text-tomato-400"
              >
                <IconeFacebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.name} sur Instagram`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-tomato-400 hover:text-tomato-400"
              >
                <IconeInstagram className="h-5 w-5" />
              </a>
              <span className="ml-2 text-sm text-cream/60">{message}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
