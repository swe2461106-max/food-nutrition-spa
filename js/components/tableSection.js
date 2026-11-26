import { openImageModal } from "./imageModal.js";

export function renderFoodTable(container, foods, nutrientGroup = "energy", lang = "mn") {
  container.innerHTML = "";

  if (!foods || foods.length === 0) {
    container.innerHTML = `
      <div class="notification is-warning is-light has-text-centered my-4">
        <strong>${lang === "mn" ? "Илэрц олдсонгүй!" : "No matching food found!"}</strong>
        <p>${lang === "mn" ? "Өөр түлхүүр үгээр дахин хайна уу." : "Please try a different search term."}</p>
      </div>
    `;
    return;
  }

  const tableWrapper = document.createElement("div");
  tableWrapper.className = "table-container";

  const table = document.createElement("table");
  table.className = "table is-fullwidth is-striped is-hoverable is-bordered";

  const headers =
    nutrientGroup === "minerals"
      ? [
          lang === "mn" ? "Код" : "ID",
          lang === "mn" ? "Хүнсний нэр" : "Food Name",
          lang === "mn" ? "Кальци (мг)" : "Calcium (mg)",
          lang === "mn" ? "Төмөр (мг)" : "Iron (mg)",
          lang === "mn" ? "Амин дэм C (мг)" : "Vitamin C (mg)"
        ]
      : [
          lang === "mn" ? "Код" : "ID",
          lang === "mn" ? "Хүнсний нэр" : "Food Name",
          lang === "mn" ? "Илчлэг (ккал)" : "Energy (kcal)",
          lang === "mn" ? "Уураг (г)" : "Protein (g)",
          lang === "mn" ? "Өөх тос (г)" : "Fat (g)",
          lang === "mn" ? "Нүүрс ус (г)" : "Carbs (g)"
        ];

  const thead = document.createElement("thead");
  thead.className = "has-background-light";
  thead.innerHTML = `<tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>`;

  const tbody = document.createElement("tbody");

  foods.forEach((food) => {
    const tr = document.createElement("tr");
    tr.style.cursor = "pointer";

    const foodName = lang === "mn" ? food.name_mn : food.name_en;

    if (nutrientGroup === "minerals") {
      tr.innerHTML = `
        <td><span class="tag is-info is-light">${food.id}</span></td>
        <td class="has-text-weight-medium has-text-link">${foodName}</td>
        <td>${food.calcium_mg ?? "-"}</td>
        <td>${food.iron_mg ?? "-"}</td>
        <td>${food.vit_c_mg ?? "-"}</td>
      `;
    } else {
      tr.innerHTML = `
        <td><span class="tag is-info is-light">${food.id}</span></td>
        <td class="has-text-weight-medium has-text-link">${foodName}</td>
        <td><strong>${food.energy_kcal}</strong></td>
        <td>${food.protein_g}</td>
        <td>${food.fat_g}</td>
        <td>${food.carb_g}</td>
      `;
    }

    tr.addEventListener("click", () => openImageModal(food, lang));
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  container.appendChild(tableWrapper);
}