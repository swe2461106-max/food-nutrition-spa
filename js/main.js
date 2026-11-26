import { renderSearchPage } from "./pages/searchPage.js";
import { renderComparePage } from "./pages/comparePage.js";

let currentLang = "mn";
let cachedFoods = [];

async function loadData() {
  if (cachedFoods.length === 0) {
    const res = await fetch("./data/food_mn_en.json");
    cachedFoods = await res.json();
  }
}

async function router() {
  await loadData();
  const root = document.getElementById("app-root");
  const hash = window.location.hash || "#search";

  document.getElementById("nav-search").textContent = currentLang === "mn" ? "Хайлт" : "Search";
  document.getElementById("nav-compare").textContent = currentLang === "mn" ? "Харьцуулалт" : "Compare";

  if (hash === "#compare") {
    renderComparePage(root, cachedFoods, currentLang);
  } else {
    renderSearchPage(root, currentLang);
  }
}

document.getElementById("btn-mn").addEventListener("click", () => {
  currentLang = "mn";
  router();
});

document.getElementById("btn-en").addEventListener("click", () => {
  currentLang = "en";
  router();
});

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);