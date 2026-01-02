function subscribe() {
  const emailInput = document.getElementById("subscribeEmail");
  const msg = document.getElementById("subscribeMsg");

  const email = emailInput.value.trim().toLowerCase();

  if (!email || !email.includes("@")) {
    msg.textContent = "❌ Please enter a valid email";
    return;
  }

  db.collection("subscribers").add({
    email: email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    msg.textContent = "✅ Subscribed successfully!";
    emailInput.value = "";
  })
  .catch(error => {
    console.error(error);
    msg.textContent = "❌ Error. Please try again.";
  });
}
