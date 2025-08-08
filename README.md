# React Native Auth Dashboard

This is a mobile application built using **React Native** with **Expo**. It includes **Firebase Authentication** (Login and Signup functionality) and a simple, responsive **Dashboard screen**. The project follows a clean, modular folder structure ideal for scalability and learning best practices in mobile app development.

---

## Download App

[![Download APK](https://img.shields.io/badge/Download-APK-pastelpurple?style=for-the-badge&logo=android)](https://expo.dev/artifacts/eas/9Mwip37jErL69cNdixRxhq.apk)

> You may need to allow installation from unknown sources on your Android device.


## Features

- Firebase Email/Password Authentication
- React Navigation for screen routing
- Expo SDK for cross-platform mobile development
- Dashboard screen post-authentication
- Tailwind CSS styling via NativeWind
- Well-structured, scalable project architecture

---

## Project Structure


```
.
├── assets/             # Static assets (images, fonts, etc.)
├── config/             # Firebase and other configuration files
├── hooks/              # Custom React hooks
├── navigation/         # Navigation setup using React Navigation
├── screens/            # UI screens (Login, Signup, Dashboard)
├── theme/              # Tailwind theme configuration
├── App.js              # Entry point of the application
├── app.json            # Expo project configuration
├── tailwind.config.js  # Tailwind CSS configuration
```

---

### 2. Install dependencies

If using **npm**:

```bash
npm install
```

Or with **yarn**:

```bash
yarn install
```

### 3. Start the Expo server

```bash
npx expo start
```

---

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Email/Password Authentication**
4. Add a web app to get Firebase config
5. Replace the config inside `config/firebase.js` like this:

```js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

---

## ✨ Screens

* **LoginScreen**
* **SignupScreen**
* **Dashboard (HomeScreen)**

> Navigation handled via `@react-navigation/native`

---

## Built With

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [Firebase Auth](https://firebase.google.com/docs/auth)
* [Tailwind CSS via NativeWind](https://www.nativewind.dev/)
* [React Navigation](https://reactnavigation.org/)

---


## 🙌 Author

**Nawal Shahid**
📬 [@Nawal-Shahid](https://github.com/Nawal-Shahid)

---

## 🌟 Show Your Support

If you like this project, feel free to ⭐ star the repo and follow for more!




