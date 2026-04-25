# Déploiement Sherlock Pro Max sur Vercel

Ce guide vous aidera à déployer le site Sherlock Pro Max sur Vercel de manière fonctionnelle.

## Prérequis

- Un compte Vercel (https://vercel.com)
- Git installé localement
- Node.js 18+ installé

## Étapes de Déploiement

### 1. Préparer le Repository Git

```bash
cd /home/ubuntu/sherlock-pro-max
git init
git add .
git commit -m "Initial commit: Sherlock Pro Max"
git branch -M main
```

### 2. Créer un Repository sur GitHub

1. Allez sur https://github.com/new
2. Créez un nouveau repository (ex: `sherlock-pro-max`)
3. Suivez les instructions pour pousser votre code local

```bash
git remote add origin https://github.com/YOUR_USERNAME/sherlock-pro-max.git
git push -u origin main
```

### 3. Connecter Vercel à GitHub

1. Allez sur https://vercel.com/new
2. Cliquez sur "Import Git Repository"
3. Sélectionnez votre repository GitHub `sherlock-pro-max`
4. Cliquez sur "Import"

### 4. Configurer les Variables d'Environnement

Sur la page de configuration Vercel, ajoutez les variables d'environnement suivantes :

**Variables Requises :**
- `VITE_APP_ID` - Votre ID d'application Manus OAuth
- `VITE_OAUTH_PORTAL_URL` - https://oauth.manus.im
- `OAUTH_SERVER_URL` - https://api.manus.im
- `JWT_SECRET` - Une clé secrète pour les sessions (générez une clé aléatoire)
- `OWNER_OPEN_ID` - Votre ID Manus
- `OWNER_NAME` - Votre nom

**Variables Optionnelles :**
- `DATABASE_URL` - Si vous utilisez une base de données
- `BUILT_IN_FORGE_API_URL` - https://api.manus.im
- `BUILT_IN_FORGE_API_KEY` - Votre clé API Manus
- `VITE_FRONTEND_FORGE_API_URL` - https://api.manus.im
- `VITE_FRONTEND_FORGE_API_KEY` - Votre clé API frontend Manus
- `VITE_APP_TITLE` - Sherlock Pro Max (ou votre titre personnalisé)
- `VITE_APP_LOGO` - URL de votre logo

### 5. Déployer

1. Cliquez sur "Deploy" sur la page Vercel
2. Attendez que le build se termine (environ 2-3 minutes)
3. Une fois terminé, vous recevrez une URL de déploiement (ex: `sherlock-pro-max.vercel.app`)

## Vérification du Déploiement

Après le déploiement, vérifiez que :

1. ✅ La page d'accueil se charge correctement
2. ✅ Le formulaire de recherche fonctionne
3. ✅ Les boutons de filtrage par catégorie sont visibles
4. ✅ Les cartes statistiques affichent les bonnes informations
5. ✅ La recherche retourne les résultats correctement

## Dépannage

### Erreur : "Build failed"

- Vérifiez que toutes les variables d'environnement sont configurées
- Vérifiez que le `package.json` contient les bons scripts
- Consultez les logs de build sur Vercel pour plus de détails

### Erreur : "Cannot find module"

- Assurez-vous que `npm install` s'exécute correctement
- Vérifiez que toutes les dépendances sont listées dans `package.json`

### Site blanc ou erreurs de chargement

- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Vérifiez que les variables d'environnement `VITE_*` sont correctement configurées
- Vérifiez que l'URL OAuth est correcte

## Mise à Jour du Site

Pour mettre à jour le site après des modifications :

```bash
git add .
git commit -m "Description de vos changements"
git push origin main
```

Vercel redéploiera automatiquement le site avec vos modifications.

## Support

Pour plus d'informations sur Vercel, consultez : https://vercel.com/docs
