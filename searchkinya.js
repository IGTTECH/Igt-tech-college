// ================================
// SEARCH POSTS BY TITLE
// ================================
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  document.querySelectorAll(".post").forEach(post => {
    const title = post.querySelector("h2")?.textContent.toLowerCase() || "";
    post.style.display = title.includes(value) ? "block" : "none";
  });
});
