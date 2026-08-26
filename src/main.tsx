import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Lien partagé du type « …/#carte » : au moment où le navigateur traite l'ancre,
// React n'a pas encore affiché la page, donc rien à faire défiler. On repositionne
// une fois le premier rendu terminé.
if (window.location.hash) {
  const ancre = window.location.hash;
  requestAnimationFrame(() => {
    document.querySelector(ancre)?.scrollIntoView();
  });
}
