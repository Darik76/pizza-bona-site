import { useEffect, useRef, useState } from "react";
import { useReveal } from "./useReveal";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Compteur qui grimpe de 0 jusqu'à `cible` la première fois que l'élément
 * apparaît à l'écran. Utilisé pour la barre de chiffres clés.
 */
export function useCountUp(cible: number, decimales = 0, duree = 1600) {
  const { ref, isVisible } = useReveal<HTMLDivElement>(0.4);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [valeur, setValeur] = useState(0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isVisible) return;

    if (prefersReducedMotion) {
      setValeur(cible);
      return;
    }

    const debut = performance.now();

    const avancer = (maintenant: number) => {
      const t = Math.min((maintenant - debut) / duree, 1);
      // Courbe « ease-out » : démarrage rapide, arrivée en douceur.
      const progression = 1 - Math.pow(1 - t, 3);
      setValeur(cible * progression);
      if (t < 1) frame.current = requestAnimationFrame(avancer);
    };

    frame.current = requestAnimationFrame(avancer);
    return () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, [isVisible, cible, duree, prefersReducedMotion]);

  return { ref, texte: valeur.toFixed(decimales).replace(".", ",") };
}
