import { useEffect, useState } from "react";

/**
 * Progression du défilement de la page, entre 0 et 1.
 * Sert à la fine barre rouge sous l'en-tête.
 */
export function useScrollProgress(): number {
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    let frame = 0;

    const mesurer = () => {
      frame = 0;
      const hauteurDefilable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgression(
        hauteurDefilable > 0 ? Math.min(window.scrollY / hauteurDefilable, 1) : 0
      );
    };

    // On passe par requestAnimationFrame : l'événement scroll se déclenche
    // beaucoup trop souvent pour recalculer à chaque fois.
    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(mesurer);
    };

    mesurer();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  return progression;
}
