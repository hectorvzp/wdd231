// 🌟 ES MODULE - Módulo principal para funcionalidades globais e Local Storage

// 1. Funcionalidade de Navegação Responsiva (Hamburger)
function setupNavigation() {
  const navLinks = document.querySelector(".nav-links");
  const hamburger = document.querySelector(".hamburger");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // 1.1. Wayfinding: Adiciona a classe 'active' ao link da página atual
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-links a");

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// 2. Local Storage Implementation (Tema/Preferência)
function setupLocalStorage() {
  const body = document.body;
  const themeButton = document.getElementById("theme-toggle-btn");
  const savedTheme = localStorage.getItem("theme");

  // Aplica o tema salvo ao carregar
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      // Alterna a classe no body
      body.classList.toggle("dark-mode");

      // Salva a nova preferência no Local Storage
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }
}

// 3. Inicialização Global
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupLocalStorage();
});
