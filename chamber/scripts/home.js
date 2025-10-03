const weatherDiv = document.getElementById("weatherr");
const urll =
  "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=d7a8642c608406d089ae112b2e7073b4&units=metric";
const fores =
  "https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&appid=d7a8642c608406d089ae112b2e7073b4&units=metric";
async function apiFetch() {
  try {
    const response = await fetch(urll);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}
function displayResults(weatherData) {
  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = weatherData.weather[0].description;
  weatherDiv.innerHTML = `
    <strong><p>${weatherData.main.temp.toFixed(0)}°C</p></strong>
    <img src="${iconsrc}" alt="${desc}" />
    <strong><p>${desc}</p></strong>
    <strong><p>Humidity: ${weatherData.main.humidity}%</p></strong>
  `;
  weatherDiv.classList.add("weather-content");
}
apiFetch();
async function loadForecast() {
  try {
    const response = await fetch(fores);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("Forecast error:", error);
  }
}

function displayForecast(data) {
  const container = document.getElementById("forecast");
  container.innerHTML = "<h3>3-Day Forecast</h3>";

  // Pega apenas uma previsão por dia (meio-dia) para 3 dias
  const daily = {};
  data.list.forEach((item) => {
    const date = new Date(item.dt_txt);
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    if (date.getHours() === 12 && !daily[day]) {
      daily[day] = item;
    }
  });

  const days = Object.keys(daily).slice(0, 3);
  days.forEach((day) => {
    const item = daily[day];
    const temp = item.main.temp.toFixed(0);
    const desc = item.weather[0].description;
    const icon = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
    container.innerHTML += `
      <div class="forecast-day">
        <p><strong>${day}</strong></p>
        <img src="${icon}" alt="${desc}">
        <p id="pp">${temp}°C - ${desc}</p>
      </div>
    `;
  });
}

loadForecast();

async function loadSpotlights() {
  const response = await fetch("./data/members.json");
  const data = await response.json();
  // Filtra apenas membros Gold ou Silver
  const eligible = data.filter((m) => m.membership_level >= 2);
  // Embaralha o array
  eligible.sort(() => Math.random() - 0.5);
  // Seleciona 2 ou 3 membros aleatórios
  const count = Math.floor(Math.random() * 2) + 2; // 2 ou 3
  const spotlights = eligible.slice(0, count);

  // Monta os cards
  const container = document.getElementById("busineses");
  container.innerHTML = "";
  spotlights.forEach((member) => {
    const card = document.createElement("div");
    card.className = "spotlight-card";
    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="./images/${member.image}" alt="Logo of ${member.name}" />
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><a href="${member.website}" target="_blank">Website</a></p>
      <p><strong>Membership:</strong> ${member.membership_level}</p>
    `;
    container.appendChild(card);
  });
}
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

loadSpotlights();
