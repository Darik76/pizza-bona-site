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
// défilants) ne démarrent qu'une fois la page chargée : pendant le premier
// rendu, un écran qui bouge en permanence est mesuré comme un affichage lent.
// Le style correspondant est dans src/index.css.
function demarrerAnimations() {
  setTimeout(() => document.documentElement.setAttribute("data-anime", "oui"), 300);
}

if (document.readyState === "complete") {
  demarrerAnimations();
} else {
  window.addEventListener("load", demarrerAnimations, { once: true });
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
