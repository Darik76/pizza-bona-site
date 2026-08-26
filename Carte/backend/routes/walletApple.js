// Routes API pour Apple Wallet.
//   GET /wallet/apple/carte/:clientId -> génère et renvoie le fichier .pkpass
//
// Nécessite un compte Apple Developer (99$/an) et des certificats — voir
// backend/services/appleWallet.js et le README.md, section "Apple Wallet".

const express = require("express");
const db = require("../db");
const appleWallet = require("../services/appleWallet");

const router = express.Router();

router.get("/carte/:clientId", async (req, res) => {
  const { clientId } = req.params;

  const client = db.getClient(clientId);
  if (!client) {
    return res.status(404).json({ erreur: "Client introuvable." });
  }

  try {
    const pkpassBuffer = await appleWallet.genererPkpass(client);
    res.set({
      "Content-Type": "application/vnd.apple.pkpass",
      "Content-Disposition": `attachment; filename="pizza-bona-fidelite-${clientId}.pkpass"`,
    });
    res.send(pkpassBuffer);
  } catch (err) {
    console.error("Erreur GET /wallet/apple/carte/:clientId :", err.message);
    res.status(503).json({
      erreur:
        "Apple Wallet n'est pas encore configuré sur ce serveur (certificats manquants).",
      details: err.message,
    });
  }
});

module.exports = router;
