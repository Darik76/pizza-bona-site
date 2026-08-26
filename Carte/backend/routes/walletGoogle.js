// Routes API pour Google Wallet.
//   POST /wallet/google/carte             -> crée une carte pour un client
//   POST /wallet/google/tampon/:clientId  -> ajoute un tampon
//   POST /wallet/google/reclamer/:clientId -> remet le compteur à 0 après
//                                              une récompense donnée en caisse

const express = require("express");
const db = require("../db");
const googleWallet = require("../services/googleWallet");
const exigerCleAdmin = require("../middleware/exigerCleAdmin");

const router = express.Router();

/**
 * Crée un nouveau client (ou récupère celui déjà existant avec ce numéro de
 * téléphone) et renvoie le lien "Ajouter à Google Wallet".
 * Body attendu : { "nom": "Jean Dupont", "telephone": "0612345678" }
 */
router.post("/carte", async (req, res) => {
  const { nom, telephone } = req.body || {};

  if (!nom || typeof nom !== "string" || nom.trim().length === 0) {
    return res.status(400).json({ erreur: "Le champ 'nom' est obligatoire." });
  }

  try {
    let client = telephone ? db.getClientByTelephone(telephone) : undefined;
    if (!client) {
      client = db.createClient({ nom: nom.trim(), telephone: telephone || null });
    }

    await googleWallet.upsertLoyaltyObject(client);
    const lienAjout = googleWallet.genererLienAjout(client);

    res.status(201).json({
      clientId: client.id,
      nom: client.nom,
      tampons: client.tampons,
      lienAjout,
    });
  } catch (err) {
    console.error("Erreur POST /wallet/google/carte :", err.message);
    res.status(500).json({
      erreur: "Impossible de créer la carte Google Wallet.",
      details: err.message,
    });
  }
});

/**
 * Ajoute un tampon (ou plusieurs via { "count": 2 } dans le body) au client
 * indiqué, et met à jour sa carte Google Wallet en temps réel.
 */
router.post("/tampon/:clientId", exigerCleAdmin, async (req, res) => {
  const { clientId } = req.params;
  const count = Number.isInteger(req.body?.count) ? req.body.count : 1;

  const clientAvant = db.getClient(clientId);
  if (!clientAvant) {
    return res.status(404).json({ erreur: "Client introuvable." });
  }

  try {
    const client = db.addStamp(clientId, count);
    await googleWallet.upsertLoyaltyObject(client);

    res.json({
      clientId: client.id,
      nom: client.nom,
      tampons: client.tampons,
      message: googleWallet.messageProgression(client.tampons),
    });
  } catch (err) {
    console.error("Erreur POST /wallet/google/tampon/:clientId :", err.message);
    res.status(500).json({
      erreur: "Impossible de mettre à jour la carte Google Wallet.",
      details: err.message,
    });
  }
});

/**
 * À utiliser en caisse quand un client réclame sa récompense (10 tampons) :
 * retire 10 tampons de son compteur (garde l'excédent éventuel).
 */
router.post("/reclamer/:clientId", exigerCleAdmin, async (req, res) => {
  const { clientId } = req.params;

  const clientAvant = db.getClient(clientId);
  if (!clientAvant) {
    return res.status(404).json({ erreur: "Client introuvable." });
  }

  try {
    const client = db.reclaimReward(clientId);
    await googleWallet.upsertLoyaltyObject(client);

    res.json({
      clientId: client.id,
      nom: client.nom,
      tampons: client.tampons,
      message: googleWallet.messageProgression(client.tampons),
    });
  } catch (err) {
    console.error("Erreur POST /wallet/google/reclamer/:clientId :", err.message);
    res.status(500).json({
      erreur: "Impossible de mettre à jour la carte Google Wallet.",
      details: err.message,
    });
  }
});

module.exports = router;
