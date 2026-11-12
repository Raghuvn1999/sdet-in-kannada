const modules = [
  { id: "01", track: "foundation", label: "ಮೂಲ ಕೌಶಲ್ಯ", title: "ರಿಸ್ಕ್ ಆಧಾರಿತ ಟೆಸ್ಟಿಂಗ್", description: "ಚೆಕ್‌ಲಿಸ್ಟ್ ಅಲ್ಲ, ಮೊದಲು ರಿಸ್ಕ್‌ಗೆ ಆದ್ಯತೆ.", color: "lime" },
  { id: "02", track: "foundation", label: "ಮೂಲ ಕೌಶಲ್ಯ", title: "ಟೆಸ್ಟ್ ವಿನ್ಯಾಸ ತಂತ್ರಗಳು", description: "ಬೌಂಡರಿ, ಸ್ಟೇಟ್, ನಿರ್ಧಾರ ಮತ್ತು what-if ಚಿಂತನೆ.", color: "coral" },
  { id: "03", track: "foundation", label: "ಮೂಲ ಕೌಶಲ್ಯ", title: "ದೋಷ ವರದಿ", description: "ದೋಷ ಸರಿಯಾಗುವ ಮೊದಲು ಅದನ್ನು ಉಪಯುಕ್ತವಾಗಿಸಿ.", color: "blue" },
  { id: "04", track: "automation", label: "ಆಟೊಮೇಷನ್", title: "Playwright patterns", description: "ಬಳಕೆದಾರರ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡುವ ಟೆಸ್ಟ್ ನಿರ್ಮಿಸಿ.", color: "lime" },
  { id: "05", track: "automation", label: "ಆಟೊಮೇಷನ್", title: "ಸ್ಥಿರ ಟೆಸ್ಟ್ ಆರ್ಕಿಟೆಕ್ಚರ್", description: "Page objects, steps ಮತ್ತು data ಅನ್ನು ಸರಿಯಾದ ಜಾಗದಲ್ಲಿಡಿ.", color: "coral" },
  { id: "06", track: "automation", label: "ಆಟೊಮೇಷನ್", title: "ಡೀಬಗ್ಗಿಂಗ್ ಸಿಗ್ನಲ್", description: "Failure ಅನ್ನು ವೇಗವಾದ ಮುಂದಿನ action ಆಗಿ ಬದಲಿಸಿ.", color: "blue" },
  { id: "07", track: "delivery", label: "ಡೆಲಿವರಿ", title: "CI/CD quality gates", description: "ನಂಬಿಕೆಯನ್ನು ಕಳೆದುಕೊಳ್ಳದೆ ವೇಗವಾಗಿ ರಿಲೀಸ್ ಮಾಡಿ.", color: "lime" },
  { id: "08", track: "delivery", label: "ಡೆಲಿವರಿ", title: "ಗುಣಮಟ್ಟದ ಜವಾಬ್ದಾರಿ", description: "ಇಡೀ ತಂಡವನ್ನು quality conversation ಗೆ ಸೇರಿಸಿ.", color: "coral" }
];

const moduleGrid = document.querySelector("[data-module-grid]");
const filterButtons = document.querySelectorAll("[data-filter]");

function renderModules(filter = "all") {
  if (!moduleGrid) return;
  moduleGrid.innerHTML = modules
    .filter((module) => filter === "all" || module.track === filter)
    .map((module) => `
      <article class="module-card">
        <span class="module-index">${module.id}</span>
        <div class="module-copy">
          <p class="eyebrow">${module.label}</p>
          <h3>${module.title}</h3>
          <p>${module.description}</p>
        </div>
        <span class="module-arrow" aria-hidden="true">↗</span>
      </article>
    `)
    .join("");
}

renderModules();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderModules(button.dataset.filter);
  });
});

const checklist = document.querySelector("[data-checklist]");
const progressLabel = document.querySelector("[data-progress-label]");
const progressBar = document.querySelector("[data-progress-bar]");
const progressCopy = document.querySelector("[data-progress-copy]");

function updateProgress() {
  if (!checklist || !progressLabel || !progressBar || !progressCopy) return;
  const items = [...checklist.querySelectorAll("input")];
  const complete = items.filter((item) => item.checked).length;
  const percent = Math.round((complete / items.length) * 100);
  progressLabel.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
  progressCopy.textContent = complete === items.length ? "ಹಂಚಿಕೊಳ್ಳಲು ಸಿದ್ಧ." : complete ? `${items.length - complete} ಕೆಲಸಗಳು ಬಾಕಿ.` : "ಒಂದರಿಂದ ಪ್ರಾರಂಭಿಸಿ.";
}

checklist?.addEventListener("change", updateProgress);

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});
