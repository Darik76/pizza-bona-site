# Carte de fidélité digitale — Pizza Bona

Système de carte de fidélité à tampons (1 tampon / 5€ d'achat, 10 tampons =
5€ de réduction) compatible **Google Wallet** et **Apple Wallet**.

- ✅ **Google Wallet** : 100% gratuit, fonctionnel dès que tu as suivi les
  étapes ci-dessous.
- 🅰️ **Apple Wallet** : le code est prêt et testé, mais nécessite un compte
  Apple Developer payant (99$/an) que tu activeras quand tu seras prêt.

Ce projet est pensé pour quelqu'un qui n'est pas développeur : chaque étape
manuelle (créer un compte, récupérer une clé...) est expliquée en détail.
Aucune étape n'est supposée déjà faite.

---

## Sommaire

1. [Structure du projet](#structure-du-projet)
2. [Installation en local](#installation-en-local)
3. [Configurer Google Wallet (gratuit)](#configurer-google-wallet-gratuit)
4. [Tester la partie Google Wallet](#tester-la-partie-google-wallet)
5. [Configurer Apple Wallet (payant, plus tard)](#configurer-apple-wallet-payant-plus-tard)
6. [Le QR code à distribuer](#le-qr-code-à-distribuer)
7. [Déployer gratuitement en ligne](#déployer-gratuitement-en-ligne)
8. [Règles du programme de fidélité](#règles-du-programme-de-fidélité)
9. [Sécurité](#sécurité)

---

## Structure du projet

```
Carte/
├── backend/                  Le serveur (Node.js + Express)
│   ├── server.js             Point d'entrée : démarre le serveur
│   ├── config.js             Lit le fichier .env
│   ├── db.js                 Base de données SQLite (clients + tampons)
│   ├── data/                 Fichier .sqlite créé automatiquement ici
│   ├── routes/
│   │   ├── walletGoogle.js   Endpoints /wallet/google/...
│   │   └── walletApple.js    Endpoint /wallet/apple/...
│   └── services/
│       ├── googleWallet.js   Logique Google Wallet (API + JWT)
│       ├── appleWallet.js    Logique Apple Wallet (.pkpass)
│       └── qrcode.js         Génération du QR code
├── wallet-google/
│   └── service-account.json  Ta clé Google (à ajouter toi-même, secret)
├── wallet-apple/
│   ├── certs/                Tes certificats Apple (à ajouter toi-même, secret)
│   └── models/pizzaBona.pass/ Le modèle de carte (pass.json + images)
├── assets/apple/              Logo et icônes de la carte
├── public/                    Page web où le client s'inscrit
│   ├── index.html
│   └── qr.html                Page à imprimer avec le QR code
├── .env.example                Modèle du fichier de configuration
└── README.md                   Ce fichier
```

---

## Installation en local

**Prérequis : Node.js installé.** Si tu ne l'as pas, télécharge-le sur
[nodejs.org](https://nodejs.org/) (version "LTS").

```bash
cd Carte
npm install
cp .env.example .env
```

Sous Windows (PowerShell), remplace la dernière commande par :

```powershell
Copy-Item .env.example .env
```

À ce stade, tu peux déjà lancer le serveur (Google Wallet ne fonctionnera
pas encore, mais tout le reste oui) :

```bash
npm run dev
```

Puis ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur
: tu dois voir la page d'inscription à la carte de fidélité.

---

## Configurer Google Wallet (gratuit)

Il y a 4 choses à récupérer : un projet Google Cloud, une clé de compte de
service, un accès à l'API Wallet, et un "Issuer ID". Compte environ 20-30
minutes, plus le délai d'approbation de Google pour l'Issuer ID (voir étape 3).

### 1. Créer un projet Google Cloud

1. Va sur [console.cloud.google.com](https://console.cloud.google.com/)
   et connecte-toi avec un compte Google (n'importe lequel, un compte Gmail
   suffit).
2. En haut de la page, clique sur le sélecteur de projet puis **"Nouveau
   projet"**.
3. Donne-lui un nom, par exemple `pizza-bona-fidelite`, puis **Créer**.

### 2. Activer l'API Google Wallet et créer une clé de compte de service

1. Dans la barre de recherche en haut, tape **"Google Wallet API"** et
   ouvre-la, puis clique **Activer**.
2. Toujours dans la console, va dans le menu ☰ > **IAM et administration** >
   **Comptes de service**.
3. Clique **Créer un compte de service**. Donne-lui un nom (ex.
   `pizza-bona-wallet`), clique **Créer et continuer**, puis **OK** (pas
   besoin de rôle particulier ici).
4. Clique sur le compte de service que tu viens de créer, va dans l'onglet
   **Clés**, puis **Ajouter une clé** > **Créer une clé** > format **JSON**.
   Un fichier `.json` se télécharge : c'est ta clé secrète.
5. Renomme ce fichier en `service-account.json` et place-le dans le dossier
   `Carte/wallet-google/` (il est déjà exclu de git, donc jamais partagé
   par erreur).
6. Note l'adresse e-mail du compte de service (visible sur sa page, du
   genre `pizza-bona-wallet@pizza-bona-fidelite.iam.gserviceaccount.com`) —
   tu en auras besoin à l'étape suivante.

### 3. Créer ton compte "Issuer" Google Wallet (approbation Google requise)

C'est l'étape qui prend le plus de temps, car Google valide manuellement
les nouveaux comptes (gratuit, mais pas instantané).

1. Va sur [pay.google.com/business/console](https://pay.google.com/business/console/)
   et connecte-toi avec le même compte Google.
2. Crée un compte "Google Wallet API" pour ton activité (Pizza Bona).
   Remplis les informations demandées sur ton commerce.
3. Une fois le compte créé, va dans **Users** (Utilisateurs) et **ajoute
   l'adresse e-mail de ton compte de service** (celle notée à l'étape 2.6),
   avec le rôle **Admin** — c'est indispensable, sinon le serveur n'aura pas
   le droit de créer des cartes en son nom.
4. Note ton **Issuer ID**, un numéro visible sur le tableau de bord (ex.
   `3388000000012345678`).

> Tant que Google n'a pas validé ton compte, tu peux quand même tester :
> les cartes que tu crées avec un compte non-encore-approuvé restent
> visibles pour toi (le compte qui a créé le projet), ce qui suffit pour
> tester avant le lancement public.

### 4. Remplir le fichier `.env`

Ouvre `Carte/.env` (créé à l'étape "Installation en local") et remplis :

```
GOOGLE_APPLICATION_CREDENTIALS=./wallet-google/service-account.json
GOOGLE_WALLET_ISSUER_ID=3388000000012345678
GOOGLE_WALLET_CLASS_SUFFIX=pizza_bona_fidelite
GOOGLE_WALLET_LOGO_URL=https://4754433.atwebpages.com/images/logo.webp
```

`GOOGLE_WALLET_LOGO_URL` doit être une URL **publique en HTTPS** (Google
doit pouvoir la télécharger) — celle du site Pizza Bona déjà en ligne
fonctionne très bien, pas besoin de la changer.

---

## Tester la partie Google Wallet

Relance le serveur si besoin (`npm run dev`), puis :

```bash
curl -X POST http://localhost:3000/wallet/google/carte \
  -H "Content-Type: application/json" \
  -d '{"nom": "Jean Dupont", "telephone": "0612345678"}'
```

Tu dois recevoir une réponse avec un `lienAjout` du type
`https://pay.google.com/gp/v/save/eyJhbGciOi...`. Ouvre ce lien (sur un
téléphone Android, ou dans Chrome) : la carte doit s'ajouter à Google
Wallet.

Pour ajouter un tampon (remplace `CLIENT_ID` par le `clientId` reçu
ci-dessus). Si tu as défini `ADMIN_KEY` dans ton `.env`, ajoute l'en-tête
`x-admin-key` (voir section [Sécurité](#sécurité)) :

```bash
curl -X POST http://localhost:3000/wallet/google/tampon/CLIENT_ID \
  -H "x-admin-key: TA_CLE_ADMIN"
```

La carte déjà ajoutée au téléphone du client se met à jour **automatiquement**,
sans qu'il ait besoin de rescanner quoi que ce soit.

Quand un client réclame sa récompense (10 tampons) en pizzeria, remets son
compteur à zéro avec :

```bash
curl -X POST http://localhost:3000/wallet/google/reclamer/CLIENT_ID \
  -H "x-admin-key: TA_CLE_ADMIN"
```

Le plus simple au quotidien reste d'utiliser la page web
(`http://localhost:3000`) plutôt que ces commandes.

---

## Configurer Apple Wallet (payant, plus tard)

Le code est déjà écrit et testé (voir `backend/services/appleWallet.js`).
Il te manque seulement 3 fichiers, obtenus via un compte Apple Developer.

### 1. Compte Apple Developer

Inscris-toi sur [developer.apple.com/programs](https://developer.apple.com/programs/enroll/)
— 99$/an. Une fois inscrit, note ton **Team ID** (menu "Membership", 10
caractères, ex. `AB12CD34EF`).

### 2. Créer un "Pass Type ID"

1. Va sur [developer.apple.com/account/resources/identifiers](https://developer.apple.com/account/resources/identifiers/list/passTypeId)
2. Clique **+**, choisis **Pass Type IDs**, puis donne un identifiant du
   type `pass.com.pizzabona.fidelite` (remplace par ton propre nom de
   domaine si tu en as un).
3. Valide. Cet identifiant est celui à mettre dans `.env` sous
   `APPLE_PASS_TYPE_IDENTIFIER`.

### 3. Générer le certificat du Pass Type ID

Tu as besoin d'un fichier CSR (demande de certificat). Deux méthodes :

**Avec un Mac (recommandé)** : ouvre "Trousseaux d'accès" (Keychain
Access) > menu Assistant certification > "Demander un certificat à une
autorité de certification". Enregistre le fichier `.certSigningRequest`.

**Sans Mac (avec OpenSSL, Windows/Linux)** :

```bash
openssl req -new -newkey rsa:2048 -nodes \
  -keyout signerKey.pem \
  -out request.csr \
  -subj "/CN=Pizza Bona Pass/O=Pizza Bona/C=FR"
```

Cela te donne directement `signerKey.pem` (ta clé privée, à garder
précieusement) et `request.csr` à uploader à l'étape suivante.

4. Retourne sur la page de ton Pass Type ID (developer.apple.com), clique
   **Create Certificate**, upload ton fichier `.csr`, puis télécharge le
   certificat généré (`pass.cer`).

5. Convertis-le en `.pem` :

```bash
openssl x509 -inform der -in pass.cer -out signerCert.pem
```

Si tu es passé par Keychain (méthode Mac), il faut en plus exporter la clé
privée associée depuis Keychain Access (clic droit sur le certificat
installé > Exporter > format .p12, avec un mot de passe), puis :

```bash
openssl pkcs12 -in Certificats.p12 -nocerts -out signerKey.pem -nodes
```

### 4. Télécharger le certificat WWDR (gratuit, identique pour tous)

Télécharge-le ici :
[www.apple.com/certificateauthority/AppleWWDRCAG4.cer](https://www.apple.com/certificateauthority/AppleWWDRCAG4.cer)

Convertis-le en `.pem` :

```bash
openssl x509 -inform der -in AppleWWDRCAG4.cer -out wwdr.pem
```

### 5. Placer les fichiers et remplir `.env`

Place `wwdr.pem`, `signerCert.pem` et `signerKey.pem` dans
`Carte/wallet-apple/certs/` (déjà exclu de git), puis complète `.env` :

```
APPLE_TEAM_ID=AB12CD34EF
APPLE_PASS_TYPE_IDENTIFIER=pass.com.pizzabona.fidelite
APPLE_WWDR_CERT_PATH=./wallet-apple/certs/wwdr.pem
APPLE_SIGNER_CERT_PATH=./wallet-apple/certs/signerCert.pem
APPLE_SIGNER_KEY_PATH=./wallet-apple/certs/signerKey.pem
APPLE_SIGNER_KEY_PASSPHRASE=
```

Teste avec :

```bash
curl http://localhost:3000/wallet/apple/carte/CLIENT_ID --output carte.pkpass
```

Ouvre `carte.pkpass` sur un iPhone (par exemple en te l'envoyant par mail)
pour l'ajouter à Apple Wallet.

---

## Le QR code à distribuer

Une fois le serveur lancé (en local ou déployé), va sur `/qr.html`
(ex. `http://localhost:3000/qr.html`), fais un clic droit sur le QR code
pour l'enregistrer, et imprime-le sur tes flyers, en caisse, sur les
boîtes à pizza... Il pointe vers la page d'inscription (`/`), où le client
entre son nom et obtient ses boutons "Ajouter à Google Wallet" / "Ajouter
à Apple Wallet".

---

## Déployer gratuitement en ligne

**Recommandation : [Render](https://render.com/)**, c'est le plus simple à
mettre en place gratuitement pour ce type de projet (Node.js + Express),
sans carte bancaire requise sur l'offre gratuite. Railway est correct mais
son offre gratuite est devenue plus limitée. Vercel est mal adapté ici : il
est pensé pour du "serverless", et ne permet pas de garder un fichier
SQLite persistant entre les requêtes.

### Étapes avec Render

1. Mets ton code sur GitHub (crée un dépôt, `git push`).
2. Sur [render.com](https://render.com/), crée un compte, puis **New +** >
   **Web Service**, et connecte ton dépôt GitHub.
3. Configure :
   - **Root Directory** : `Carte`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Instance Type** : Free
4. Dans l'onglet **Environment**, ajoute toutes les variables de ton
   fichier `.env` (une par une, sous "Environment Variables").
5. Toujours dans **Environment**, utilise la section **Secret Files** pour
   uploader `service-account.json` et, plus tard, tes certificats Apple —
   indique le chemin de montage exact attendu (celui que tu as mis dans
   `.env`, ex. `wallet-google/service-account.json`).
6. Déploie. Render te donne une URL du type
   `https://pizza-bona-carte.onrender.com` — mets-la à jour dans `.env`
   (variable `BASE_URL`) et redéploie.

### ⚠️ À savoir sur le stockage gratuit

Sur l'offre gratuite de Render (et la plupart des hébergeurs gratuits), le
disque **n'est pas garanti persistant** : le fichier `.sqlite` peut être
effacé lors d'un redémarrage ou redéploiement. Pour une phase de test,
c'est très bien. Pour un usage réel avec de vrais clients, deux options
plus tard :

- Passer sur un plan Render payant avec disque persistant (quelques $/mois).
- Migrer vers une base de données hébergée gratuitement en continu, comme
  [Turso](https://turso.tech/) (compatible SQLite, offre gratuite généreuse
  et pensée pour durer).

Je peux t'aider à faire cette migration quand tu seras prêt à passer en
production avec de vrais clients.

---

## Règles du programme de fidélité

Modifiables dans `backend/config.js` (section `loyalty`) :

- 1 tampon tous les **5€** d'achat
- **10 tampons** = **5€ de réduction**

---

## Sécurité

- Ne partage **jamais** le contenu de `.env`, de
  `wallet-google/service-account.json`, ni des fichiers dans
  `wallet-apple/certs/` — ce sont des secrets qui donnent accès à ton
  compte Google Wallet / Apple Wallet. Ils sont déjà exclus par
  `.gitignore`.
- Les endpoints qui modifient les tampons (`/wallet/google/tampon/:clientId`,
  `/wallet/google/reclamer/:clientId`) sont protégés par une clé secrète
  (`ADMIN_KEY` dans `.env`), à envoyer dans l'en-tête `x-admin-key` de
  chaque requête. **Tant que `ADMIN_KEY` est vide, ces routes ne sont pas
  protégées** (pratique pour tester en local, dangereux en production) —
  pense à la définir avant un vrai lancement, sinon n'importe qui connaissant
  l'identifiant d'un client pourrait s'ajouter des tampons lui-même.
  Un message d'avertissement s'affiche dans les logs du serveur tant
  qu'elle n'est pas définie.
