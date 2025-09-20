const url = "./data/members.json";
const container = document.querySelector("section");
const opcaoDiv = document.querySelector(".opcao");
const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");
const texto = document.querySelector(".texto");
const fechar = document.querySelector(".fechar");

// Botões para alternar visualização
const gridBtn = document.createElement("button");
gridBtn.classList.add("active");
gridBtn.textContent = "Grid";
const listBtn = document.createElement("button");
listBtn.classList.add("active");
listBtn.textContent = "List";
opcaoDiv.appendChild(gridBtn);
opcaoDiv.appendChild(listBtn);
async function fetchMembers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data, "grid"); // Visualização padrão em grid
    gridBtn.addEventListener("click", () => displayMembers(data, "grid"));
    listBtn.addEventListener("click", () => displayMembers(data, "list"));
    listBtn.addEventListener("click", () => {
      document.querySelectorAll(".member-card img").forEach((img) => {
        img.style.margin = "0px";
      });
    });
  } catch (error) {
    console.error("Fetch error: ", error);
    container.innerHTML = "<p>Failed to load members data.</p>";
  }
}

function displayMembers(members, view) {
  container.innerHTML = "";
  container.className = view === "grid" ? "grid-view" : "list-view";
  members.forEach((member) => {
    const card = document.createElement("div");
    card.className = "member-card";
    card.innerHTML = `
      <img src="./images/${member.image}" alt="${member.name}" width="80" height="80">
      <h3>${member.name}</h3>
      <p>${member.industry}</p>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p>${member.description}</p>
    `;
    card.classList.add("fade-in");
    container.appendChild(card);
  });
}

// Estilos básicos para grid/lista (adicione ao seu CSS)
const style = document.createElement("style");
style.textContent = `
  .grid-view { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
  .list-view { display: block; }
  .member-card { background: #fff; border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; }
  .list-view .member-card { margin-bottom: 1rem; }
`;
document.head.appendChild(style);
menu.addEventListener("click", () => {
  nav.style.display = "flex";
  texto.style.display = "none";
  menu.style.display = "none";
  fechar.style.display = "block";
});
fechar.addEventListener("click", () => {
  nav.style.display = "none";
  texto.style.display = "block";
  menu.style.display = "block";
  fechar.style.display = "none";
});

fetchMembers();
