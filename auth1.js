// ================================
// AUTHENTICATION HANDLER
// ================================

// Make sure Firebase is initialized in firebase.js before this script
// auth and db are already available

// ================================
// ADMIN UID LIST (matches Firestore rules)
// ================================
const ADMIN_UIDS = [
  "bcZrjdpD3kOXLsroL9Msn865z8B2", // Admin 1
  "5hGEMDloRkeakOYwrl3SatR8Npz1"  // Admin 2
];

// ================================
// AUTH STATE CHANGE
// ================================
auth.onAuthStateChanged(user => {
  const adminPanel = document.getElementById("adminPanel");
  if (!adminPanel) return; // ignore pages without admin panel

  if (user && ADMIN_UIDS.includes(user.uid)) {
    // Admin logged in → show admin panel
    adminPanel.classList.remove("hidden");
    console.log("Admin logged in:", user.email, user.uid);
  } else {
    // Not admin or logged out → hide admin panel
    adminPanel.classList.add("hidden");
    if (user) {
      console.log("Regular user logged in:", user.email, user.uid);
    } else {
      console.log("No user logged in");
    }
  }
});

// ================================
// LOGIN FUNCTION
// ================================
function login(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      const uid = userCredential.user.uid;
      console.log("Login successful:", uid);
      alert("Login successful!");
      // Redirect to posts page
      window.location.href = "posts1.html";
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
      const uid = userCredential.user.uid;
      console.log("Registration successful:", uid);
      alert("Registration successful! Your UID:\n" + uid +
            "\n\nAdd this UID to ADMIN_UIDS array and Firestore rules to enable admin access.");
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
      window.location.href = "login1.html"; // redirect to login
    })
    .catch(error => {
      console.error("Logout error:", error.message);
      alert("Logout failed: " + error.message);
    });
}



