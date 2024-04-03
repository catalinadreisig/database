import { apikey, endpoint } from "./settings.js";
export async function getRecipes() {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
  };

  let response = await fetch(endpoint, {
    method: "GET",
    headers: headersList,
  });

  let data = await response.json();
  return data;
}
//WET - Write Everything Twice
//DRY - Don't Repeat Yourself
//AHA - Avoid Hasty Abstractions

export async function createRecipe() {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    name: "Sol over Gudhjem",
    description: "En klassisk præ salmonella ret",
    ingredients: ["Æggeblomme", "Rugbrød"],
    serves: 1,
    allergens: ["Æg"],
    diet: "Vegetar",
    studentFriendly: true,
    origin: "Denmark",
  });

  let response = await fetch(endpoint, {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  console.log(data);
}

export async function deleteRecipe(id) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
  };

  let response = await fetch(endpoint + "?id=eq." + id, {
    method: "DELETE",
    headers: headersList,
  });

  let data = await response.json();
  return data;
}
export async function updateRecipe(id) {
  let headersList = {
    Accept: "application/json",
    apikey: apikey,
    Prefer: "return=representation",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    studentFriendly: false,
  });

  let response = await fetch(endpoint + "?id=eq." + id, {
    method: "PATCH",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  return data;
}
