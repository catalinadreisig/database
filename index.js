import { createRecipe, getRecipes, deleteRecipe, updateRecipe } from "./modules/data.js";

import { setupCountries } from "./modules/setup.js";

setupCountries();

async function showRecipes() {
  const response = await getRecipes();
  const el = document.querySelector("template").content;
  const parent = document.querySelector(".recipes");
  parent.innerHTML = "";
  response.forEach((rec) => {
    const clone = el.cloneNode(true);
    clone.querySelector("[data-name]").textContent = rec.name;
    clone.querySelector("[data-origin]").textContent = rec.origin;
    if (rec.studentFriendly) {
      clone.querySelector(".status").hidden = false;
    } else {
      clone.querySelector(".status").hidden = true;
    }

    clone.querySelectorAll("[data-id]").forEach((e) => (e.dataset.id = rec.id));
    clone.querySelector("button[data-action='delete']").addEventListener("click", async () => {
      await deleteRecipe(rec.id);
      await showRecipes();
    });
    clone.querySelector("button[data-action='update']").addEventListener("click", async () => {
      await updateRecipe(rec.id);
      await showRecipes();
    });
    parent.appendChild(clone);
  });
}
showRecipes();
