// 🌟 ES MODULE - Módulo para Data Fetching, Array Method e DOM Manipulation

const DATA_URL = "data/tours.json";

/**
 * 🌟 1. Data Fetching (Fetch API com Try/Catch e Async/Await)
 * @param {string} url - URL do recurso JSON.
 * @returns {Promise<Array>} - Array de dados.
 */
async function fetchToursData(url) {
  // 🌟 Bloco try...catch para tratamento robusto de erros
  try {
    const response = await fetch(url);

    // Verifica se a resposta foi bem-sucedida (status 200)
    if (!response.ok) {
      throw new Error(`Network response error: Status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // 🌟 Mensagem de erro no console
    console.error("Failed to load tour data:", error);
    document.getElementById("tour-listings").innerHTML =
      '<p style="color: red;">Failed to load data. Please check console for errors.</p>';
    return [];
  }
}

/**
 * 🌟 2. Geração Dinâmica de Conteúdo + Array Method
 * @param {Array} tours - O array de objetos de viagens.
 * @param {number} minPrice - Preço mínimo para filtragem.
 */
function displayTours(tours, minPrice = 0) {
  const container = document.getElementById("tour-listings");
  if (!container) return; // Sai se não estiver na página tours.html
  container.innerHTML = ""; // Limpa o conteúdo de loading

  // 🌟 Array Method: Filter (Filtra os pacotes de acordo com o preço)
  const filteredTours = tours.filter((tour) => tour.base_price >= minPrice);

  if (filteredTours.length === 0) {
    container.innerHTML = "<p>No tours match the current filter criteria.</p>";
    return;
  }

  // 🌟 Array Method: forEach (Itera sobre os dados filtrados)
  filteredTours.forEach((tour) => {
    // 🌟 Template Literals (String Construction) para criar o HTML do Card
    const tourCard = `
            <div class="tour-card" data-category="${tour.category}">
                <img src="${
                  tour.image_url || "images/default.jpg"
                }" alt="Image of ${tour.destination}" loading="lazy">
                <div class="card-content">
                    <h3>${tour.destination}</h3>
                    <p>Duration: <strong>${tour.duration_days} days</strong></p>
                    <p>Category: ${tour.category}</p>
                    <p class="price">Price from: <strong>R$ ${tour.base_price.toFixed(
                      2
                    )}</strong></p>
                    <button class="show-details-btn" data-id="${
                      tour.id
                    }">View Details</button>

                </div>
            </div>
        `;
    container.innerHTML += tourCard;
  });
}

// 3. Setup de Filtros e Inicialização
async function setupToursPage() {
  const allTours = await fetchToursData(DATA_URL);
  if (allTours.length > 0) {
    displayTours(allTours); // Primeira exibição

    // 🌟 DOM Manipulation and Event Handling para o filtro
    const filterButton = document.getElementById("apply-filter-btn");
    const priceInput = document.getElementById("min-price-filter");

    if (filterButton && priceInput) {
      filterButton.addEventListener("click", () => {
        const newMinPrice = parseFloat(priceInput.value) || 0;
        displayTours(allTours, newMinPrice);
      });
    }
  }
}

// Inicializa o setup apenas se estiver na página tours.html
if (document.getElementById("tour-listings")) {
  setupToursPage();
}

// Event delegation: escucha clicks en todo el container
const modal = document.getElementById("hotel-modal");
document.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("show-details-btn")) {
    modal.style.display = "flex";
  }
});

// Cerrar modal al clicar en el X o fuera del contenido
modal.addEventListener("click", (e) => {
  if (e.target.id === "hotel-modal" || e.target.classList.contains("close")) {
    modal.style.display = "none";
  }
});
