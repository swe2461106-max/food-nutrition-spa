export function renderComparePage(rootElement, allFoods, lang = "mn") {
  const isMn = lang === "mn";

  rootElement.innerHTML = `
    <div class="container mt-5">
      <h1 class="title is-3 has-text-primary-dark">
        ${isMn ? "Хүнсний бүтээгдэхүүн харьцуулах" : "Compare Food Samples"}
      </h1>
      <div class="box">
        <div class="columns">
          <div class="column is-6">
            <label class="label">${isMn ? "1-р хүнсний дээж сонгох" : "Select 1st Food"}</label>
            <div class="select is-fullwidth is-primary">
              <select id="food-select-1"></select>
            </div>
          </div>
          <div class="column is-6">
            <label class="label">${isMn ? "2-р хүнсний дээж сонгох" : "Select 2nd Food"}</label>
            <div class="select is-fullwidth is-info">
              <select id="food-select-2"></select>
            </div>
          </div>
        </div>
      </div>

      <div id="compare-result" class="box"></div>
    </div>
  `;

  const select1 = document.getElementById("food-select-1");
  const select2 = document.getElementById("food-select-2");
  const resultBox = document.getElementById("compare-result");

  allFoods.forEach((food, index) => {
    const label = `${food.code} - ${isMn ? food.name_mn : food.name_en}`;
    select1.add(new Option(label, index));
    select2.add(new Option(label, index));
  });

  if (allFoods.length > 2) select2.selectedIndex = 2; // Анхнаасаа Ингэний хоормогийг сонгоно

  function updateComparison() {
    const f1 = allFoods[select1.value];
    const f2 = allFoods[select2.value];
    const diffCal = Math.abs(f1.calories - f2.calories).toFixed(1);

    resultBox.innerHTML = `
      <table class="table is-fullwidth is-bordered is-striped">
        <thead>
          <tr class="has-background-light">
            <th>${isMn ? "Шим тэжээлийн үзүүлэлт" : "Nutrient"}</th>
            <th class="has-text-primary-dark">${isMn ? f1.name_mn : f1.name_en}</th>
            <th class="has-text-info-dark">${isMn ? f2.name_mn : f2.name_en}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>${isMn ? "Хүнсний бүлэг" : "Food Group"}</strong></td>
            <td>${isMn ? f1.group_mn : f1.group_en}</td>
            <td>${isMn ? f2.group_mn : f2.group_en}</td>
          </tr>
          <tr>
            <td><strong>${isMn ? "Илчлэг (ккал)" : "Calories (kcal)"}</strong></td>
            <td><strong>${f1.calories}</strong></td>
            <td><strong>${f2.calories}</strong></td>
          </tr>
          <tr>
            <td><strong>${isMn ? "Уураг (г)" : "Protein (g)"}</strong></td>
            <td>${f1.protein}</td>
            <td>${f2.protein}</td>
          </tr>
          <tr>
            <td><strong>${isMn ? "Өөх тос (г)" : "Fat (g)"}</strong></td>
            <td>${f1.fat}</td>
            <td>${f2.fat}</td>
          </tr>
          <tr>
            <td><strong>${isMn ? "Нүүрс ус (г)" : "Carbs (g)"}</strong></td>
            <td>${f1.carbs}</td>
            <td>${f2.carbs}</td>
          </tr>
        </tbody>
      </table>
      <div class="notification is-primary is-light mt-3">
        <strong>${isMn ? "Дүгнэлт зөрүү:" : "Calorie Difference:"}</strong> 
        ${isMn ? `Сонгосон 2 хүнсний илчлэгийн зөрүү <b>${diffCal} ккал</b> байна.` : `The calorie difference is <b>${diffCal} kcal</b>.`}
      </div>
    `;
  }

  select1.addEventListener("change", updateComparison);
  select2.addEventListener("change", updateComparison);
  updateComparison();
}