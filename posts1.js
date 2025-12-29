// ================================
// REQUIRED GLOBALS
// ================================
const postsContainer = document.getElementById("postsContainer");

// ================================
// AUTH + LOAD POSTS
// ================================
auth.onAuthStateChanged(user => {

  db.collection("posts")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

      postsContainer.innerHTML = "";

      snapshot.forEach(doc => {
        const post = doc.data();
        const postId = doc.id;
        const isAdmin = user && ADMIN_UIDS.includes(user.uid);

        postsContainer.innerHTML += `
          <div class="post">

            <h2>${escapeHTML(post.title)}</h2>

            ${post.image ? `<img src="${post.image}" alt="${escapeHTML(post.title)}">` : ""}

            <p>${escapeHTML(post.content)}</p>

            <div class="post-actions">

              <button onclick="likePost('${postId}')">
                👍 Like (${post.likes || 0})
              </button>

              <button onclick="sharePost('${encodeURIComponent(post.title)}')">
                🔗 Share
              </button>

              ${isAdmin ? `
                <button class="edit-btn" onclick="editPost('${postId}')">
                  ✏ Edit
                </button>
                <button class="delete-btn" onclick="deletePost('${postId}')">
                  🗑 Delete
                </button>
              ` : ""}

            </div>

          </div>
        `;
      });

    });

});

// ================================
// LIKE POST
// ================================
function likePost(postId) {
  const ref = db.collection("posts").doc(postId);
  ref.update({
    likes: firebase.firestore.FieldValue.increment(1)
  });
}

// ================================
// SHARE POST
// ================================
function sharePost(title) {
  const decodedTitle = decodeURIComponent(title);

  if (navigator.share) {
    navigator.share({
      title: decodedTitle,
      url: window.location.href
    });
  } else {
    prompt("Copy link:", window.location.href);
  }
}

// ================================
// EDIT POST (ADMIN ONLY)
// ================================
function editPost(postId) {
  db.collection("posts").doc(postId).get().then(doc => {
    if (!doc.exists) return;

    const post = doc.data();

    const newTitle = prompt("Edit title:", post.title);
    if (!newTitle) return;

    const newContent = prompt("Edit content:", post.content);

    db.collection("posts").doc(postId).update({
      title: escapeHTML(newTitle),
      content: escapeHTML(newContent)
    });
  });
}

// ================================
// DELETE POST (ADMIN ONLY)
// ================================
function deletePost(postId) {
  if (!confirm("Are you sure you want to delete this post?")) return;
  db.collection("posts").doc(postId).delete();
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
