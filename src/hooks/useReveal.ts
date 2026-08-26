import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Déclenche l'apparition d'un élément quand il entre dans l'écran.
 * Si la personne a demandé moins d'animations, le contenu est visible
 * immédiatement — pas d'apparition progressive.
 */
export function useReveal<T extends HTMLElement>(seuil = 0.15) {
  const ref = useRef<T | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Filet de sécurité : si IntersectionObserver n'existe pas (très vieux
    // navigateur), on affiche le contenu plutôt que de le laisser invisible.
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: seuil, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion, seuil]);

  return { ref, isVisible };
}
