// Protège les routes réservées au personnel (ajouter un tampon, remettre à
// zéro) avec une clé secrète simple, envoyée dans l'en-tête "x-admin-key".
// Si ADMIN_KEY n'est pas défini dans le .env, on laisse passer (pratique
// pour tester en local) mais on avertit dans la console.

const config = require("../config");

function exigerCleAdmin(req, res, next) {
  if (!config.adminKey) {
    console.warn(
      "⚠️  ADMIN_KEY n'est pas configuré : cette route n'est pas protégée. " +
        "À définir avant un vrai lancement (voir README.md, section Sécurité)."
    );
    return next();
  }

  const cleFournie = req.headers["x-admin-key"];
  if (cleFournie !== config.adminKey) {
    return res.status(401).json({ erreur: "Clé admin manquante ou invalide." });
  }

  next();
}

module.exports = exigerCleAdmin;
