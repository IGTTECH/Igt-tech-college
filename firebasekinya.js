const firebaseConfig = {
  apiKey: "AIzaSyCAHTkJXsVF6K8MfgetZLCt4pV_xuQZGKU",
  authDomain: "secondapp-e68fb.firebaseapp.com",
  projectId: "secondapp-e68fb",
  storageBucket: "secondapp-e68fb.firebasestorage.app",
  messagingSenderId: "489851715324",
  appId: "1:489851715324:web:ff8826938622d42b59a179"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

