// ================================
// REQUIRED GLOBALS
// ================================
const adminPanel = document.getElementById("adminPanel");
const postTitleInput = document.getElementById("postTitle");
const postContentInput = document.getElementById("postContent");
const postImageInput = document.getElementById("postImage");

// ================================
// CHECK IF USER IS ADMIN
// ================================
auth.onAuthStateChanged(user => {
  if (user && ADMIN_UIDS.includes(user.uid)) {
    adminPanel.classList.remove("hidden");
  } else {
    adminPanel.classList.add("hidden");
  }
});

// ================================
// CREATE POST FUNCTION
// ================================
function createPost() {
  const title = postTitleInput.value.trim();
  const content = postContentInput.value.trim();
  const file = postImageInput.files[0]; // optional

  if (!title || !content) {
    alert("Title and content are required!");
    return;
  }

  if (file) {
    // Convert image to Base64
    const reader = new FileReader();
    reader.onload = function(e) {
      const base64Image = e.target.result; // full Base64 string
      savePostToFirestore(title, content, base64Image);
    };
    reader.readAsDataURL(file);
  } else {
    // No image uploaded
    savePostToFirestore(title, content, "");
  }
}

// ================================
// SAVE POST TO FIRESTORE
// ================================
function savePostToFirestore(title, content, image) {
  db.collection("posts").add({
    title: escapeHTML(title),
    content: escapeHTML(content),
    image: image,                   // empty string if no image
    createdAt: firebase.firestore.Timestamp.now(),
    likes: 0
  })
  .then(() => {
    alert("Post created successfully!");
    postTitleInput.value = "";
    postContentInput.value = "";
    postImageInput.value = "";
  })
  .catch(err => {
    console.error("Error creating post:", err);
    alert("Failed to create post. See console for details.");
  });
}

// ================================
// ESCAPE HTML (XSS PROTECTION)
// ================================
function escapeHTML(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
