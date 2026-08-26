import { siteConfig } from "../config/site";

type Creneau = { debut: number; fin: number };

/** "11h00 – 14h00 / 18h00 – 21h30" → [{debut: 660, fin: 840}, {debut: 1080, fin: 1290}] */
function lireCreneaux(horaires: string): Creneau[] {
  const creneaux: Creneau[] = [];
  const motif = /(\d{1,2})h(\d{2})\s*[–—-]\s*(\d{1,2})h(\d{2})/g;
  let trouve: RegExpExecArray | null;

  while ((trouve = motif.exec(horaires)) !== null) {
    creneaux.push({
      debut: Number(trouve[1]) * 60 + Number(trouve[2]),
      fin: Number(trouve[3]) * 60 + Number(trouve[4]),
    });
  }

  return creneaux;
}

function enHeure(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h${String(m).padStart(2, "0")}`;
}

export type EtatOuverture = {
  ouvert: boolean;
  /** Ex. « Ouvert jusqu'à 14h00 » ou « Fermé · ouvre mardi à 11h00 » */
  message: string;
};

/**
 * Calcule si la pizzeria est ouverte à l'instant `maintenant`, à partir des
 * horaires déclarés dans src/config/site.ts. Le tableau `hours` commence au
 * lundi, alors que Date.getDay() commence au dimanche : d'où le décalage.
 */
export function etatOuverture(maintenant = new Date()): EtatOuverture {
  const indexJour = (maintenant.getDay() + 6) % 7;
  const minutesActuelles = maintenant.getHours() * 60 + maintenant.getMinutes();
  const jours = siteConfig.hours;

  const creneauxDuJour = lireCreneaux(jours[indexJour].hours);

  for (const creneau of creneauxDuJour) {
    if (minutesActuelles >= creneau.debut && minutesActuelles < creneau.fin) {
      return { ouvert: true, message: `Ouvert jusqu'à ${enHeure(creneau.fin)}` };
    }
  }

  // Prochaine ouverture : un créneau plus tard dans la journée, sinon on
  // avance jour par jour sur la semaine suivante.
  const plusTardAujourdhui = creneauxDuJour.find((c) => c.debut > minutesActuelles);
  if (plusTardAujourdhui) {
    return {
      ouvert: false,
      message: `Fermé · ouvre à ${enHeure(plusTardAujourdhui.debut)}`,
    };
  }

  for (let decalage = 1; decalage <= 7; decalage++) {
    const jour = jours[(indexJour + decalage) % 7];
    const creneaux = lireCreneaux(jour.hours);
    if (creneaux.length > 0) {
      const libelleJour = decalage === 1 ? "demain" : jour.day.toLowerCase();
      return {
        ouvert: false,
        message: `Fermé · ouvre ${libelleJour} à ${enHeure(creneaux[0].debut)}`,
      };
    }
  }

  return { ouvert: false, message: "Fermé" };
}
