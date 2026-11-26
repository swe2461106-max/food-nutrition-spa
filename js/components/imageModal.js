export function createImageModal() {
  const modal = document.createElement("div");
  modal.id = "food-image-modal";
  modal.className = "modal";

  modal.innerHTML = `
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-primary-dark">
        <p class="modal-card-title has-text-white" id="modal-food-title">Хүнсний зураг</p>
        <button class="delete" aria-label="close" id="modal-close-btn"></button>
      </header>
      <section class="modal-card-body has-text-centered">
        <figure class="image is-4by3">
          <img id="modal-food-img" src="" alt="Food Sample" style="object-fit: cover; border-radius: 8px;" />
        </figure>
        <p class="mt-3 has-text-weight-semibold is-size-5" id="modal-food-info"></p>
      </section>
    </div>
  `;

  const closeModal = () => modal.classList.remove("is-active");
  modal.querySelector(".modal-background").addEventListener("click", closeModal);
  modal.querySelector("#modal-close-btn").addEventListener("click", closeModal);

  return modal;
}

export function openImageModal(food, lang = "mn") {
  const modal = document.getElementById("food-image-modal");
  if (!modal) return;

  const title = lang === "mn" ? food.name_mn : food.name_en;
  const group = lang === "mn" ? food.group_mn : food.group_en;

  modal.querySelector("#modal-food-title").textContent = title;
  modal.querySelector("#modal-food-img").src = food.image || "images/khoormog.jpg";
  modal.querySelector("#modal-food-info").textContent = `${group} • ${food.energy_kcal} ккал`;

  modal.classList.add("is-active");
}