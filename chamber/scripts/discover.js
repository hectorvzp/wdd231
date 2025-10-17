const grid = document.getElementById("items-grid");
const visitMessage = document.getElementById("visit-message");

// Load JSON data
async function loadItems() {
  try {
    const response = await fetch("data/data.json");
    const items = await response.json();

    items.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "item-card";
      card.style.gridArea = `item${index + 1}`;
      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure><img src="${item.image}" alt="${item.name}"></figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      grid.appendChild(card);
    });
  } catch (error) {
    grid.innerHTML = "<p>Failed to load items.</p>";
  }
}

// LocalStorage visit message
function showVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();
  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const diff = now - Number(lastVisit);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 1) {
      message = "Back so soon! Awesome!";
    } else {
      message = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
  }

  visitMessage.textContent = message;
  localStorage.setItem("lastVisit", now);
}

window.addEventListener("DOMContentLoaded", () => {
  loadItems();
  showVisitMessage();
});
