import { useEffect, useState } from "react";
import { etatOuverture, type EtatOuverture } from "../lib/horaires";

/** Indique en direct si la pizzeria est ouverte, réévalué chaque minute. */
export function useEtatOuverture(): EtatOuverture {
  const [etat, setEtat] = useState<EtatOuverture>(() => etatOuverture());

  useEffect(() => {
    const id = setInterval(() => setEtat(etatOuverture()), 60_000);
    return () => clearInterval(id);
  }, []);

  return etat;
}
