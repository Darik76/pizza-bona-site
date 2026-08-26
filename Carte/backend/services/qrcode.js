// Génère un QR code (image PNG en data URL) qui pointe vers la page web où
// le client s'inscrit et récupère ses boutons "Ajouter au Wallet".
// À imprimer sur un flyer, l'afficher en caisse, etc.

const QRCode = require("qrcode");
const config = require("../config");

/** Renvoie une image QR code en "data URL" (utilisable directement dans un <img src="...">). */
async function genererQrInscription() {
  const url = `${config.baseUrl}/`;
  return QRCode.toDataURL(url, {
    width: 500,
    margin: 2,
    color: {
      dark: "#2b2b2b", // anthracite du site
      light: "#fdf8f0", // crème du site
    },
  });
}

module.exports = { genererQrInscription };
