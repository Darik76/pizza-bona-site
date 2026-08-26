import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Indique si la personne a activé « Réduire les animations » sur son appareil.
 * Utilisé pour désactiver les apparitions au défilement et l'avance
 * automatique du carrousel.
 */
export function usePrefersReducedMotion(): boolean {
  // On lit la valeur dès le premier rendu pour éviter d'animer une fois avant
  // de se corriger.
  const [prefersReduced, setPrefersReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const onChange = () => setPrefersReduced(mediaQuery.matches);

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
