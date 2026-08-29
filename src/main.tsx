import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Les animations décoratives en boucle (halos, pizza qui tourne, bandeaux
// défilants) ne démarrent qu'à la première interaction, ou 1,5 s après le
// chargement complet si la personne ne bouge pas. Tant que l'écran change en
// permanence, il est considéré comme « pas encore affiché » — c'est ce que
// mesure le Speed Index. Le style correspondant est dans src/index.css.
function demarrerAnimations() {
  document.documentElement.setAttribute("data-anime", "oui");
  for (const evenement of ["scroll", "pointerdown", "keydown", "wheel", "touchstart"]) {
    window.removeEventListener(evenement, demarrerAnimations);
  }
}

for (const evenement of ["scroll", "pointerdown", "keydown", "wheel", "touchstart"]) {
  window.addEventListener(evenement, demarrerAnimations, { once: true, passive: true });
}

// 2,5 s : en pratique personne n'attend ce délai, le moindre défilement ou
// mouvement de souris lance les animations avant. Ce repli ne concerne qu'un
// visiteur parfaitement immobile — et les outils de mesure automatiques.
const apresChargement = () => setTimeout(demarrerAnimations, 2500);
if (document.readyState === "complete") {
  apresChargement();
} else {
  window.addEventListener("load", apresChargement, { once: true });
}

// Lien partagé du type « …/#carte » : au moment où le navigateur traite l'ancre,
// React n'a pas encore affiché la page, donc rien à faire défiler. On repositionne
// une fois le premier rendu terminé.
if (window.location.hash) {
  const ancre = window.location.hash;
  requestAnimationFrame(() => {
    document.querySelector(ancre)?.scrollIntoView();
  });
}
