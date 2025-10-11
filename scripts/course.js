// Courses array
const courses = [
  { name: "CSE 110", type: "CSE", completed: true },
  { name: "WDD 130", type: "WDD", completed: false },
  { name: "CSE 111", type: "CSE", completed: false },
  { name: "CSE 210", type: "CSE", completed: false },
  { name: "WDD 131", type: "WDD", completed: false },
  { name: "WDD 231", type: "WDD", completed: false },
];
function lista() {
  const coursesContainer = document.getElementById("courses");
  let nav = document.querySelector(".nav");

  //  function to create a new ul elemente//
  function criaul() {
    const ul = document.createElement("ul");
    ul.classList.add("lista2");
    return ul;
  }
  // Function to display all courses
  function displayAll(courses) {
    const ul = criaul();
    coursesContainer.innerHTML = ""; // Clear existing courses
    coursesContainer.appendChild(ul);
    for (iten of courses) {
      const li = document.createElement("li");
      li.innerHTML = iten.name;
      li.className = iten.completed ? "completed" : "not-completed";
      li.classList.add("allfinal");
      ul.appendChild(li);
    }
  }
  // Function to display cse courses
  function displayCse(courses) {
    const ul = criaul();
    coursesContainer.innerHTML = ""; // Clear existing courses
    coursesContainer.appendChild(ul);
    filteredCse = courses.filter((course) => course.name.includes("CSE"));
    for (iten of filteredCse) {
      const li = document.createElement("li");
      li.innerHTML = iten.name;
      li.className = iten.completed ? "completed" : "not-completed";
      li.classList.add("csefinal");
      ul.appendChild(li);
    }
  }
  // Function to display wdd courses
  function displayWdd(courses) {
    const ul = criaul();
    coursesContainer.innerHTML = ""; // Clear existing courses
    coursesContainer.appendChild(ul);
    filteredCse = courses.filter((course) => course.name.includes("WDD"));
    for (iten of filteredCse) {
      const li = document.createElement("li");
      li.innerHTML = iten.name;
      li.className = iten.completed ? "completed" : "not-completed";
      li.classList.add("wddfinal");
      ul.appendChild(li);
    }
  }
  // Function to get clicks//
  function getClicks() {
    document.addEventListener("click", (e) => {
      const el = e.target;
      if (el.classList.contains("all")) {
        displayAll(courses);
        modalCourse();
      }
      if (el.classList.contains("cse")) {
        displayCse(courses);
        modalCourse();
      }
      if (el.classList.contains("wdd")) {
        displayWdd(courses);
        modalCourse();
      }
      if (el.classList.contains("menu")) {
        actBotton();
      }
      if (el.classList.contains("fechar")) {
        notdisplatbotton();
      }
    });
  }
  function actBotton() {
    nav.style.display = "grid";
  }
  function notdisplatbotton() {
    nav.style.display = "none";
  }
  getClicks();
}

lista();

function modalCourse() {
  const modal = document.getElementById("modal");
  modal.showModal();
  const closeButton = document.getElementById("close-modal");
  closeButton.addEventListener("click", () => {
    modal.close();
  });
}
