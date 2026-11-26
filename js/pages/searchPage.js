import { renderFoodTable } from "../components/tableSection.js";
import { createImageModal } from "../components/imageModal.js";

export async function renderSearchPage(rootElement, lang = "mn") {
  const response = await fetch("./data/food_mn_en.json");
  const allFoods = await response.json();

  const groups = [...new Set(allFoods.map((item) => (lang === "mn" ? item.group_mn : item.group_en)))];

  rootElement.innerHTML = `
    <section class="section">
      <div class="container">
        <h1 class="title is-3 has-text-primary-dark">
          ${lang === "mn" ? "Хүнсний найрлагын хайлт" : "Food Composition Search"}
        </h1>

        <div class="box">
          <div class="columns is-multiline">
            <div class="column is-4">
              <label class="label">${lang === "mn" ? "Хүнсний нэр" : "Food Name"}</label>
              <input id="search-input" class="input is-primary" type="text"
                placeholder="${lang === "mn" ? "Жишээ нь: Ингэний хоормог, Сүү..." : "e.g., Camel milk, Beef..."}" />
            </div>

            <div class="column is-4">
              <label class="label">${lang === "mn" ? "Хүнсний бүлэг" : "Food Group"}</label>
              <div class="select is-fullwidth is-primary">
                <select id="group-select">
                  <option value="ALL">${lang === "mn" ? "Бүх бүлэг" : "All Groups"}</option>
                  ${groups.map((g) => `<option value="${g}">${g}</option>`).join("")}
                </select>
              </div>
            </div>

            <div class="column is-4">
              <label class="label">${lang === "mn" ? "Үзүүлэлтийн төрөл" : "Nutrient Category"}</label>
              <div class="select is-fullwidth is-primary">
                <select id="nutrient-select">
                  <option value="energy">${lang === "mn" ? "Илчлэг ба Макро шим тэжээл" : "Energy & Macronutrients"}</option>
                  <option value="minerals">${lang === "mn" ? "Эрдэс бодис ба Амин дэм" : "Minerals & Vitamins"}</option>
                </select>
              </div>
            </div>
          </div>

          <p class="has-text-weight-semibold has-text-grey-dark mt-2" id="result-count"></p>
        </div>

        <div id="table-container"></div>
      </div>
    </section>
  `;

  if (!document.getElementById("food-image-modal")) {
    document.body.appendChild(createImageModal());
  }

  const searchInput = document.getElementById("search-input");
  const groupSelect = document.getElementById("group-select");
  const nutrientSelect = document.getElementById("nutrient-select");
  const tableContainer = document.getElementById("table-container");
  const resultCount = document.getElementById("result-count");

  function updateResults() {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedGroup = groupSelect.value;
    const selectedNutrient = nutrientSelect.value;

    const filtered = allFoods.filter((food) => {
      const name = (lang === "mn" ? food.name_mn : food.name_en).toLowerCase();
      const group = lang === "mn" ? food.group_mn : food.group_en;

      const matchesName = name.includes(keyword);
      const matchesGroup = selectedGroup === "ALL" || group === selectedGroup;
      return matchesName && matchesGroup;
    });

    resultCount.textContent =
      lang === "mn" ? `Нийт олдсон дээж: ${filtered.length}` : `Total samples found: ${filtered.length}`;

    renderFoodTable(tableContainer, filtered, selectedNutrient, lang);
  }

  searchInput.addEventListener("input", updateResults);
  groupSelect.addEventListener("change", updateResults);
  nutrientSelect.addEventListener("change", updateResults);

  updateResults();
}