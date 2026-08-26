// Génère un fichier .pkpass (carte Apple Wallet) pour un client donné.
//
// Ce fichier a besoin de 3 éléments que Apple ne fournit qu'aux comptes
// Apple Developer payants (99$/an) : le certificat WWDR, le certificat
// "Pass Type ID" et sa clé privée. Tant qu'ils ne sont pas configurés dans
// le .env, cette fonction renvoie une erreur claire plutôt que de planter.
// Voir README.md, section "Apple Wallet", pour la procédure complète.

const fs = require("fs");
const path = require("path");
const { PKPass } = require("passkit-generator");
const config = require("../config");

const MODEL_PATH = path.join(__dirname, "..", "..", "wallet-apple", "models", "pizzaBona.pass");

function messageProgression(tampons) {
  const objectif = config.loyalty.tamponsPourRecompense;
  if (tampons >= objectif) {
    return `Récompense disponible : ${config.loyalty.recompenseTexte} !`;
  }
  const restant = objectif - tampons;
  return `Encore ${restant} tampon${restant > 1 ? "s" : ""} avant ${config.loyalty.recompenseTexte}`;
}

/** Vérifie que tout est configuré et renvoie le contenu des certificats. */
function chargerCertificats() {
  const { teamId, passTypeIdentifier, wwdrCertPath, signerCertPath, signerKeyPath } = config.apple;

  const manquants = [];
  if (!teamId) manquants.push("APPLE_TEAM_ID");
  if (!passTypeIdentifier) manquants.push("APPLE_PASS_TYPE_IDENTIFIER");
  if (!wwdrCertPath || !fs.existsSync(wwdrCertPath)) manquants.push("APPLE_WWDR_CERT_PATH");
  if (!signerCertPath || !fs.existsSync(signerCertPath)) manquants.push("APPLE_SIGNER_CERT_PATH");
  if (!signerKeyPath || !fs.existsSync(signerKeyPath)) manquants.push("APPLE_SIGNER_KEY_PATH");

  if (manquants.length > 0) {
    throw new Error(
      `Apple Wallet n'est pas configuré (variables manquantes ou fichiers introuvables : ` +
        `${manquants.join(", ")}). C'est normal tant que tu n'as pas de compte Apple ` +
        `Developer (99$/an) — voir README.md, section "Apple Wallet".`
    );
  }

  return {
    wwdr: fs.readFileSync(wwdrCertPath),
    signerCert: fs.readFileSync(signerCertPath),
    signerKey: fs.readFileSync(signerKeyPath),
    signerKeyPassphrase: config.apple.signerKeyPassphrase || undefined,
  };
}

/** Génère le .pkpass (en mémoire, sous forme de Buffer) pour un client. */
async function genererPkpass(clientRecord) {
  const certificates = chargerCertificats();

  const pass = await PKPass.from(
    {
      model: MODEL_PATH,
      certificates,
    },
    {
      serialNumber: clientRecord.id,
      passTypeIdentifier: config.apple.passTypeIdentifier,
      teamIdentifier: config.apple.teamId,
    }
  );

  pass.type = "storeCard";

  pass.headerFields.push({
    key: "tampons",
    label: "Tampons",
    value: `${clientRecord.tampons}/${config.loyalty.tamponsPourRecompense}`,
  });

  pass.primaryFields.push({
    key: "nom",
    label: "Client",
    value: clientRecord.nom,
  });

  pass.secondaryFields.push({
    key: "progression",
    label: "Progression",
    value: messageProgression(clientRecord.tampons),
  });

  pass.backFields.push({
    key: "regles",
    label: "Comment ça marche",
    value:
      `1 tampon tous les ${config.loyalty.euroParTampon}€ d'achat. ` +
      `${config.loyalty.tamponsPourRecompense} tampons = ${config.loyalty.recompenseTexte}. ` +
      `Présente cette carte en pizzeria à chaque commande.`,
  });

  // QR code scannable en caisse, avec l'id du client encodé dedans.
  pass.setBarcodes(clientRecord.id);

  return pass.getAsBuffer();
}

module.exports = { genererPkpass };
