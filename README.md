# CynaAppMobile 🚀

Bienvenue sur **CynaAppMobile**, une application mobile moderne développée avec React Native et Expo, intégrant gestion d'utilisateurs, abonnement à des produits, et affichage de contenu dynamique via une API sécurisée.

## 📱 Fonctionnalités

- **Authentification utilisateur :** Connexion, inscription, gestion du profil utilisateur.
- **Dashboard dynamique :** Affichage des produits, gestion des abonnements (subscribe/unsubscribe).
- **Navigation intuitive :** Menu burger pour un accès rapide aux pages principales.
- **Stockage sécurisé :** Gestion des tokens et sessions utilisateurs avec AsyncStorage et Zustand.

## 🛠 Technologies

- **React Native & Expo** pour la compatibilité multiplateforme (Android, iOS, Web).
- **Expo Router** pour une navigation fluide basée sur les fichiers.
- **Axios** pour les requêtes API sécurisées.
- **Zustand** pour la gestion d'état globale.
- **React Native Paper** pour des composants UI élégants et réactifs.

## 📁 Structure du projet

```
mesdcu-app/
├── android/
├── app/
│   ├── _layout.js
│   ├── index.js (login)
│   ├── register.js
│   ├── dashboard.js
│   ├── account.js
│   ├── BurgerMenu.js
│   └── commonStyles.js
├── api.js
├── store.js
├── app.json
└── package.json
```

## 🚀 Installation

Clone le projet et installe les dépendances :

```bash
git clone <ton-repo-github>
cd mesdcu-app
npm install
```

## ▶️ Démarrer l'application

- **En développement :**

```bash
npm run start
```

- **Sur Android/iOS/Web :**

```bash
npm run android
npm run ios
npm run web
```

## 📖 Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Expo Router](https://docs.expo.dev/router/introduction/)

## 💬 Contribution

Tu veux améliorer l'app ? Toute contribution est bienvenue :

1. Fork ce repo
2. Crée ta branche (`git checkout -b fonctionnalite-geniale`)
3. Commit tes changements (`git commit -m 'Ajout d'une super fonctionnalité'`)
4. Push ta branche (`git push origin fonctionnalite-geniale`)
5. Ouvre une pull request 👌

---

Créé avec ❤️ par l'équipe CynaAppMobile.
