import { renderSearchPage } from "./pages/searchPage.js";

const app = document.getElementById("app");
let currentLang = "mn";

// Анх хуудас ачаалахад хайлтын хуудсыг харуулна
renderSearchPage(app, currentLang);

// Хэл солих товчнууд
document.getElementById("btn-mn").addEventListener("click", () => {
  currentLang = "mn";
  renderSearchPage(app, currentLang);
});

document.getElementById("btn-en").addEventListener("click", () => {
  currentLang = "en";
  renderSearchPage(app, currentLang);
});