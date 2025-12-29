// ================================
// AUTHENTICATION HANDLER
// ================================

// Make sure Firebase is initialized in firebase.js before this script
// Example: const app = firebase.initializeApp(firebaseConfig);

// Check if user is logged in
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("User logged in:", user.email, user.uid);
    // Optionally display user info in UI
  } else {
    console.log("No user logged in");
  }
});

// ================================
// LOGIN FUNCTION
// ================================
function login(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log("Login successful:", userCredential.user.uid);
      alert("Login successful!");
      // Redirect or update UI
    })
    .catch(error => {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    });
}

// ================================
// REGISTER FUNCTION
// ================================
function register(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log("Registration successful:", userCredential.user.uid);
      alert("Registration successful!");
      // Redirect or update UI
    })
    .catch(error => {
      console.error("Registration error:", error.message);
      alert("Registration failed: " + error.message);
    });
}

// ================================
// LOGOUT FUNCTION
// ================================
function logout() {
  auth.signOut()
    .then(() => {
      console.log("User logged out");
      alert("Logged out successfully");
      // Redirect or update UI
    })
    .catch(error => {
      console.error("Logout error:", error.message);
    });
}
