// Toute la logique Google Wallet est ici : créer/mettre à jour la "classe"
// (le modèle de carte), créer/mettre à jour un "objet" (la carte d'un client
// précis), et générer le lien "Ajouter à Google Wallet".
//
// Doc officielle utilisée comme référence :
// https://developers.google.com/wallet/retail/loyalty-cards/qsg-android

const fs = require("fs");
const jwt = require("jsonwebtoken");
const { GoogleAuth } = require("google-auth-library");
const config = require("../config");

const WALLET_API_BASE = "https://walletobjects.googleapis.com/walletobjects/v1";

let cachedAuthClient = null;
let cachedServiceAccount = null;

/** Lit le fichier de clé de compte de service et le garde en mémoire. */
function getServiceAccount() {
  if (cachedServiceAccount) return cachedServiceAccount;

  if (!config.google.credentialsPath || !fs.existsSync(config.google.credentialsPath)) {
    throw new Error(
      "Fichier de clé Google introuvable. Vérifie GOOGLE_APPLICATION_CREDENTIALS dans " +
        "ton .env et que le fichier wallet-google/service-account.json existe bien " +
        "(voir README.md, section Google Wallet)."
    );
  }

  cachedServiceAccount = JSON.parse(fs.readFileSync(config.google.credentialsPath, "utf8"));
  return cachedServiceAccount;
}

/** Client HTTP authentifié auprès de l'API Google Wallet. */
async function getAuthClient() {
  if (cachedAuthClient) return cachedAuthClient;

  // S'assure que le fichier de clé existe avant d'aller plus loin (message
  // d'erreur clair plutôt qu'une erreur Google cryptique).
  getServiceAccount();

  const auth = new GoogleAuth({
    keyFile: config.google.credentialsPath,
    scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
  });
  cachedAuthClient = await auth.getClient();
  return cachedAuthClient;
}

function requireIssuerId() {
  if (!config.google.issuerId) {
    throw new Error(
      "GOOGLE_WALLET_ISSUER_ID manquant dans le .env. Tu l'obtiens en créant un " +
        "compte sur https://pay.google.com/business/console (voir README.md)."
    );
  }
}

function classId() {
  requireIssuerId();
  return `${config.google.issuerId}.${config.google.classSuffix}`;
}

function objectId(clientId) {
  requireIssuerId();
  // Google n'autorise que lettres/chiffres/underscore/tiret dans le suffixe.
  return `${config.google.issuerId}.${clientId.replace(/[^a-zA-Z0-9_-]/g, "_")}`;
}

/** Message affiché sur la carte selon le nombre de tampons. */
function messageProgression(tampons) {
  const objectif = config.loyalty.tamponsPourRecompense;
  if (tampons >= objectif) {
    return `🎉 Récompense disponible : ${config.loyalty.recompenseTexte} !`;
  }
  const restant = objectif - tampons;
  return `Encore ${restant} tampon${restant > 1 ? "s" : ""} avant ${config.loyalty.recompenseTexte}`;
}

/**
 * Crée la classe de fidélité chez Google si elle n'existe pas encore.
 * La classe est le "modèle" commun à toutes les cartes clients.
 * Sans effet si elle existe déjà (on ne fait rien).
 */
async function ensureLoyaltyClass() {
  const client = await getAuthClient();
  const id = classId();

  const getRes = await client.request({
    url: `${WALLET_API_BASE}/loyaltyClass/${id}`,
    method: "GET",
    validateStatus: () => true, // on gère nous-mêmes le 404
  });

  if (getRes.status === 200) {
    return getRes.data;
  }

  const classPayload = {
    id,
    issuerName: "Pizza Bona",
    programName: "Carte de fidélité Pizza Bona",
    programLogo: {
      sourceUri: { uri: config.google.logoUrl },
      contentDescription: { defaultValue: { language: "fr", value: "Logo Pizza Bona" } },
    },
    hexBackgroundColor: "#c1272d", // rouge tomate du site
    reviewStatus: "UNDER_REVIEW",
    rewardsTier: "",
    rewardsTierLabel: "",
  };

  const createRes = await client.request({
    url: `${WALLET_API_BASE}/loyaltyClass`,
    method: "POST",
    data: classPayload,
  });

  return createRes.data;
}

/**
 * Crée (ou met à jour si elle existe déjà) la carte d'un client précis chez
 * Google, avec son nombre de tampons actuel.
 */
async function upsertLoyaltyObject(clientRecord) {
  await ensureLoyaltyClass();
  const client = await getAuthClient();
  const id = objectId(clientRecord.id);

  const objectPayload = {
    id,
    classId: classId(),
    state: "ACTIVE",
    accountId: clientRecord.id,
    accountName: clientRecord.nom,
    loyaltyPoints: {
      label: "Tampons",
      balance: { string: `${clientRecord.tampons}/${config.loyalty.tamponsPourRecompense}` },
    },
    textModulesData: [
      {
        id: "progression",
        header: "Ma progression",
        body: messageProgression(clientRecord.tampons),
      },
    ],
    barcode: {
      type: "QR_CODE",
      value: clientRecord.id,
      alternateText: clientRecord.nom,
    },
  };

  const getRes = await client.request({
    url: `${WALLET_API_BASE}/loyaltyObject/${id}`,
    method: "GET",
    validateStatus: () => true,
  });

  if (getRes.status === 200) {
    // La carte existe déjà chez Google : on la met à jour (PATCH). Comme
    // l'utilisateur l'a déjà ajoutée à son téléphone, ce changement se
    // synchronise automatiquement sur son Google Wallet.
    const patchRes = await client.request({
      url: `${WALLET_API_BASE}/loyaltyObject/${id}`,
      method: "PATCH",
      data: objectPayload,
    });
    return patchRes.data;
  }

  const createRes = await client.request({
    url: `${WALLET_API_BASE}/loyaltyObject`,
    method: "POST",
    data: objectPayload,
  });
  return createRes.data;
}

/**
 * Génère le lien "Ajouter à Google Wallet" pour un client (JWT signé avec la
 * clé privée du compte de service).
 */
function genererLienAjout(clientRecord) {
  const serviceAccount = getServiceAccount();

  const payload = {
    iss: serviceAccount.client_email,
    aud: "google",
    typ: "savetowallet",
    iat: Math.floor(Date.now() / 1000),
    payload: {
      loyaltyObjects: [{ id: objectId(clientRecord.id) }],
    },
  };

  const token = jwt.sign(payload, serviceAccount.private_key, { algorithm: "RS256" });
  return `https://pay.google.com/gp/v/save/${token}`;
}

module.exports = {
  ensureLoyaltyClass,
  upsertLoyaltyObject,
  genererLienAjout,
  messageProgression,
};
