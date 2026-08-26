// Charge les variables du fichier .env et les rend disponibles partout dans
// le projet via `require("./config")`. Centraliser ça ici évite de répéter
// des vérifications dans chaque fichier.

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const config = {
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || "http://localhost:3000",

  // Clé secrète que seul le personnel en caisse doit connaître, pour
  // autoriser l'ajout de tampons / la remise à zéro (voir README, section
  // Sécurité). Laisse vide pour tester en local sans t'en soucier.
  adminKey: process.env.ADMIN_KEY || "",

  google: {
    credentialsPath: process.env.GOOGLE_APPLICATION_CREDENTIALS
      ? path.join(__dirname, "..", process.env.GOOGLE_APPLICATION_CREDENTIALS)
      : null,
    issuerId: process.env.GOOGLE_WALLET_ISSUER_ID || "",
    classSuffix: process.env.GOOGLE_WALLET_CLASS_SUFFIX || "pizza_bona_fidelite",
    logoUrl: process.env.GOOGLE_WALLET_LOGO_URL || "",
  },

  apple: {
    teamId: process.env.APPLE_TEAM_ID || "",
    passTypeIdentifier: process.env.APPLE_PASS_TYPE_IDENTIFIER || "",
    wwdrCertPath: process.env.APPLE_WWDR_CERT_PATH
      ? path.join(__dirname, "..", process.env.APPLE_WWDR_CERT_PATH)
      : null,
    signerCertPath: process.env.APPLE_SIGNER_CERT_PATH
      ? path.join(__dirname, "..", process.env.APPLE_SIGNER_CERT_PATH)
      : null,
    signerKeyPath: process.env.APPLE_SIGNER_KEY_PATH
      ? path.join(__dirname, "..", process.env.APPLE_SIGNER_KEY_PATH)
      : null,
    signerKeyPassphrase: process.env.APPLE_SIGNER_KEY_PASSPHRASE || "",
  },

  // Règles du programme de fidélité — modifie ces deux nombres si tu changes
  // les conditions un jour.
  loyalty: {
    euroParTampon: 5, // 1 tampon tous les 5€ d'achat
    tamponsPourRecompense: 10, // 10 tampons = récompense
    recompenseTexte: "5€ de réduction",
  },
};

module.exports = config;
