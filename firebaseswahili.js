const firebaseConfig = {
  apiKey: "AIzaSyCFn1V2FRpwXqz1JQHerG9PuQ2GY4ggEzw",
  authDomain: "famillyweb-bf64c.firebaseapp.com",
  projectId: "famillyweb-bf64c",
  storageBucket: "famillyweb-bf64c.firebasestorage.app",
  messagingSenderId: "914238498025",
  appId: "1:914238498025:web:6b91f1960ded0212f1fc78"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

