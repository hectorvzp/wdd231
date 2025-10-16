// 🌟 ES MODULE - Módulo para implementar o Modal Dialog na página places.html

function setupModal() {
  const modal = document.getElementById("hotel-modal");
  const openButtons = document.querySelectorAll(".show-details-btn");
  const closeButton = document.querySelector(".close-button");

  if (!modal) return; // Sai se não estiver na página places.html

  // 🌟 Event Listener para abrir o modal
  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 🌟 Modifica a propriedade de estilo para exibir o modal
      modal.style.display = "flex";
    });
  });

  // 🌟 Event Listener para fechar o modal no botão X
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // 🌟 Event Listener para fechar o modal clicando fora
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // 🌟 Event Listener para fechar o modal com a tecla ESC (melhor acessibilidade)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.style.display = "none";
    }
  });
}

// Inicializa o setup apenas se o modal estiver presente
document.addEventListener("DOMContentLoaded", () => {
  setupModal();
});

// Carrega o arquivo JSON
fetch("trips.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("trips");

    // Percorre cada cidade
    data.tours.forEach((city) => {
      const cityDiv = document.createElement("div");
      cityDiv.innerHTML = `<h2>${city.city}</h2>`;

      // Lista de passeios
      const list = document.createElement("ul");

      city.options.forEach((tour) => {
        const li = document.createElement("li");
        li.textContent = `${tour.name} — $${tour.price} (${tour.duration})`;
        list.appendChild(li);
      });

      cityDiv.appendChild(list);
      container.appendChild(cityDiv);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
