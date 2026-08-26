// Stockage des clients de la carte de fidélité dans un fichier SQLite local
// (backend/data/fidelite.sqlite). Pas besoin d'installer de serveur de base
// de données : better-sqlite3 lit/écrit directement dans ce fichier.
//
// ATTENTION : sur un hébergement gratuit (Render, Railway...), le système de
// fichiers est souvent réinitialisé à chaque redéploiement/redémarrage — ce
// fichier peut alors être effacé. Voir le README, section "Déploiement",
// pour les options si tu veux une persistance garantie plus tard.

const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const Database = require("better-sqlite3");
const config = require("./config");

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "fidelite.sqlite"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    nom TEXT NOT NULL,
    telephone TEXT,
    tampons INTEGER NOT NULL DEFAULT 0,
    date_creation TEXT NOT NULL,
    google_object_id TEXT
  )
`);

/** Crée un nouveau client et sa carte (0 tampon au départ). */
function createClient({ nom, telephone }) {
  const id = crypto.randomUUID();
  const dateCreation = new Date().toISOString();

  db.prepare(
    `INSERT INTO clients (id, nom, telephone, tampons, date_creation)
     VALUES (?, ?, ?, 0, ?)`
  ).run(id, nom, telephone || null, dateCreation);

  return getClient(id);
}

/** Récupère un client par son id. Retourne undefined si non trouvé. */
function getClient(id) {
  return db.prepare("SELECT * FROM clients WHERE id = ?").get(id);
}

/** Récupère un client par son numéro de téléphone (pour éviter les doublons). */
function getClientByTelephone(telephone) {
  if (!telephone) return undefined;
  return db.prepare("SELECT * FROM clients WHERE telephone = ?").get(telephone);
}

/** Ajoute `count` tampon(s) au client et renvoie le client mis à jour. */
function addStamp(id, count = 1) {
  const client = getClient(id);
  if (!client) return undefined;

  const nouveauTotal = client.tampons + count;
  db.prepare("UPDATE clients SET tampons = ? WHERE id = ?").run(nouveauTotal, id);
  return getClient(id);
}

/**
 * Remet le compteur à 0 (ou soustrait le nombre de tampons de la
 * récompense) une fois que le client a réclamé sa réduction en pizzeria.
 */
function reclaimReward(id) {
  const client = getClient(id);
  if (!client) return undefined;

  const restant = Math.max(0, client.tampons - config.loyalty.tamponsPourRecompense);
  db.prepare("UPDATE clients SET tampons = ? WHERE id = ?").run(restant, id);
  return getClient(id);
}

/** Enregistre l'identifiant de l'objet Google Wallet créé pour ce client. */
function setGoogleObjectId(id, googleObjectId) {
  db.prepare("UPDATE clients SET google_object_id = ? WHERE id = ?").run(googleObjectId, id);
  return getClient(id);
}

module.exports = {
  createClient,
  getClient,
  getClientByTelephone,
  addStamp,
  reclaimReward,
  setGoogleObjectId,
};
