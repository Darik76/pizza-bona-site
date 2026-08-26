import { useEffect, useState } from "react";

/**
 * Renvoie l'ancre (#id) de la section actuellement visible, pour souligner
 * l'entrée correspondante dans la navigation.
 */
export function useSectionActive(ancres: string[]): string {
  const [active, setActive] = useState(ancres[0] ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = ancres
      .map((ancre) => document.getElementById(ancre.replace("#", "")))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entrees) => {
        // On garde la section la plus visible parmi celles à l'écran.
        const visible = entrees
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ancres]);

  return active;
}
