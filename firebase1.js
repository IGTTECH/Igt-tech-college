
const firebaseConfig = {
  apiKey: "AIzaSyCQzgTCwKhuXQreCvRm4wHJXNDtUHnGDEw",
  authDomain: "postpage-b6fab.firebaseapp.com",
  projectId: "postpage-b6fab",
  storageBucket: "postpage-b6fab.firebasestorage.app",
  messagingSenderId: "570490230784",
  appId: "1:570490230784:web:b125636fe7dcd9d237e0e5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

const appCheck = firebase.appCheck();

appCheck.activate(
  "6LcOCj0sAAAAAF0N0SZ1QFMqFq7FEh-lIdpzaum-", // 🔴 PASTE FROM FIREBASE CONSOLE
  true // Auto-refresh tokens
);

