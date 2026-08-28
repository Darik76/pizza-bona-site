import { useEffect, useState } from "react";
import { siteConfig } from "../config/site";
import { useEtatOuverture } from "../hooks/useEtatOuverture";
import { IconeTelephone } from "./Icones";
import { cn } from "../lib/utils";

/**
 * Barre d'appel fixe en bas d'écran sur mobile. Elle n'apparaît qu'une fois le
 * héros dépassé, pour ne pas masquer les boutons déjà visibles en haut de page.
 */
export function MobileCallBar() {
  const [visible, setVisible] = useState(false);
  const { ouvert, message } = useEtatOuverture();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-ink/95 px-4 py-3 backdrop-blur transition-transform duration-500 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm uppercase tracking-wider text-cream">
            {siteConfig.name}
          </p>
          <p
            className={cn(
              "truncate text-xs",
              ouvert ? "text-basil-300" : "text-cream/65"
            )}
          >
            {message}
          </p>
        </div>

        <a
          href={siteConfig.phone.href}
          aria-label={`Commander par téléphone au ${siteConfig.phone.display}`}
          className="brillance flex shrink-0 items-center gap-2 rounded-full bg-tomato-500 px-5 py-3 font-display text-sm uppercase tracking-wider text-cream"
        >
          <IconeTelephone className="h-4 w-4" />
          Commander
        </a>
      </div>
    </div>
  );
}
