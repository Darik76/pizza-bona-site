// Point d'entrée du serveur. Lance avec `npm start` (ou `npm run dev` pour
// le rechargement automatique pendant le développement).

const path = require("path");
const express = require("express");
const config = require("./config");
const qrcode = require("./services/qrcode");

const walletGoogleRoutes = require("./routes/walletGoogle");
const walletAppleRoutes = require("./routes/walletApple");

const app = express();

app.use(express.json());

// Sert la page publique (public/index.html) où le client s'inscrit.
app.use(express.static(path.join(__dirname, "..", "public")));

// Sert les images de la carte (logo, etc.) pour qu'elles soient accessibles
// publiquement en HTTPS une fois déployé (nécessaire pour Google Wallet).
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

app.use("/wallet/google", walletGoogleRoutes);
app.use("/wallet/apple", walletAppleRoutes);

// Vérification rapide que le serveur tourne.
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// QR code à imprimer / afficher en pizzeria, qui pointe vers la page
// d'inscription (public/index.html).
app.get("/api/qrcode", async (req, res) => {
  try {
    const dataUrl = await qrcode.genererQrInscription();
    res.json({ qrCodeDataUrl: dataUrl });
  } catch (err) {
    console.error("Erreur GET /api/qrcode :", err.message);
    res.status(500).json({ erreur: "Impossible de générer le QR code." });
  }
});

// Gestionnaire d'erreurs global : si une route plante avec une erreur non
// prévue, on renvoie une réponse JSON propre plutôt qu'une page HTML brute.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Erreur non gérée :", err);
  res.status(500).json({ erreur: "Erreur interne du serveur.", details: err.message });
});

app.listen(config.port, () => {
  console.log(`✅ Serveur carte de fidélité Pizza Bona lancé sur ${config.baseUrl}`);
  console.log(`   Page d'inscription : ${config.baseUrl}/`);
});
