const navbar = document.querySelector(".navbar");
const startPage = document.querySelector("#start-page");
const detailsPage = document.querySelector("#details-page");
const searchPage = document.querySelector("#search-page");
const body = document.querySelector("body");



export async function getRandomCard() {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    showRandomCard(data.drinks[0]);
  } catch (error) {
    console.log(error);
  }
}

export function showRandomCard(cocktail) {
    const mappedCocktail = mapRawCocktailData(cocktail);

  const randomCard = `
        <div class="randomcard" style="width: 18rem">
        <img src="${mappedCocktail.thumbnail}" class="card-img-top" alt="${mappedCocktail.name}" />
        <div class="card-body">
          <h5 class="card-title">${mappedCocktail.name}</h5>
          <span id="details-link" class="link">View Details</span>
          <button id="newRandom">Generate new Drink</button>
        </div>
    `;
  startPage.innerHTML += randomCard;

  const viewDetails = startPage.querySelector("#details-link");
  viewDetails.addEventListener("click", () => {
        showDetailsofCocktailStartPage(mappedCocktail);
    });

    const randomButton = startPage.querySelector("#newRandom");
    randomButton.addEventListener("click", () => {
        location.reload();
    });

    const searchInputBtn = document.querySelector("#searchBtn")
    searchInputBtn.addEventListener("click", () => {
      event.preventDefault()
      const searchInput = document.querySelector("#inputfield").value.trim();
      if (searchInput) {
        searchEngine(searchInput);
      } else {
        results.innerHTML = "<p>Waiting for your input...</p>"
      }
    });

    const results = document.querySelector("#results");

    results.addEventListener("click", (event) => {
      if (event.target.id === "details-link") {
        const parent = event.target.closest(".randomcard");
        const cocktailID = event.target.getAttribute("data-id");
        detailsOfCocktailID(cocktailID);

      } else {console.log("not clicked id LINK")}
    });


}

export function mapRawCocktailData(rawCocktial) {
    return {
      id: rawCocktial.idDrink,
      name: rawCocktial.strDrink,
      tags: rawCocktial.strTags ? rawCocktial.strTags.split(",") : [],
      category: rawCocktial.strCategory,
      alcoholic: rawCocktial.strAlcoholic === "Alcoholic",
      glass: rawCocktial.strGlass,
      instructions: rawCocktial.strInstructions,
      thumbnail: rawCocktial.strDrinkThumb,
      ingredients: Array.from({ length: 15 })
        .map((_, i) => ({
          ingredient: rawCocktial[`strIngredient${i + 1}`],
          measure: rawCocktial[`strMeasure${i + 1}`],
        }))
        .filter((item) => item.ingredient),
    };
}


export function showDetailsofCocktailStartPage(cocktail) {

    console.log(cocktail); // För att se den mappade-datan
    detailsPage.innerHTML = "";
    
    const mappedIngredients = cocktail.ingredients
    .map((ingredient) => `<li>${ingredient.ingredient} - ${ingredient.measure || "After preference"}</li>`) // La till en OR check om measurement är null
    .join("");
        

    const selectedCard = `
        <h1>Details Page</h1>
        <p>This is the details page of a cocktail</p>
        <div class="randomcard" style="width: 18rem">
        <img src="${cocktail.thumbnail}" class="card-img-top" alt="${cocktail.name}" />
        <div class="card-body">
        <h5 class="card-title">${cocktail.name}</h5>
        <ul>
        <li>Category: ${cocktail.category}</li>
        <li>Tags: ${cocktail.tags.join(", ") || 'No tags'}</li>
        <li>Instructions: ${cocktail.instructions}</li>
        <li>Ingredients:</li>
        <ul>
            ${mappedIngredients}
        </ul>
        <li>Which glass to use: ${cocktail.glass}</li>
        <button id="return-start">Return</button>
        </div>
    `;
    detailsPage.innerHTML = selectedCard;

    detailsPage.classList.add("open");
    startPage.classList.remove("open");
    searchPage.classList.remove("open");

    detailsPage.addEventListener("click", () => {
      if (event.target.id === "return-start") {
        startPage.classList.add("open");
        detailsPage.classList.remove("open");
        searchPage.classList.remove("open");
      }
    });
}

export function showDetailsofCocktailSearchPage(cocktail) {

  console.log(cocktail); // För att se den mappade-datan
  detailsPage.innerHTML = "";
  
  const mappedIngredients = cocktail.ingredients
  .map((ingredient) => `<li>${ingredient.ingredient} - ${ingredient.measure || "After preference"}</li>`) // La till en OR check om measurement är null
  .join("");
      

  const selectedCard = `
      <h1>Details Page</h1>
      <p>This is the details page of a cocktail</p>
      <div class="randomcard" style="width: 18rem">
      <img src="${cocktail.thumbnail}" class="card-img-top" alt="${cocktail.name}" />
      <div class="card-body">
      <h5 class="card-title">${cocktail.name}</h5>
      <ul>
      <li>Category: ${cocktail.category}</li>
      <li>Tags: ${cocktail.tags.join(", ") || 'No tags'}</li>
      <li>Instructions: ${cocktail.instructions}</li>
      <li>Ingredients:</li>
      <ul>
          ${mappedIngredients}
      </ul>
      <li>Which glass to use: ${cocktail.glass}</li>
      <button id="return-search">Return</button>
      </div>
  `;
  detailsPage.innerHTML = selectedCard;

  detailsPage.classList.add("open");
  startPage.classList.remove("open");
  searchPage.classList.remove("open");

  detailsPage.addEventListener("click", () => {
    if (event.target.id === "return-search") {
      searchPage.classList.add("open");
      detailsPage.classList.remove("open");
      startPage.classList.remove("open");
    }
  });
}

export function handleOnNavbarClick(event) {
  // Alla funktioner i eventlisterners tar emot ett event i parametrar
  if (event.target.classList.contains("link"))
    return handleOnLinkClick(event.target.id);
}

export function handleOnLinkClick(id) {
  if (id === "start-link") {
    // Visa Start-sidan
    startPage.classList.add("open");
    detailsPage.classList.remove("open");
    searchPage.classList.remove("open");
  }

  if (id === "search-link") {
    // Visa Search-sidan
    searchPage.classList.add("open");
    detailsPage.classList.remove("open");
    startPage.classList.remove("open");
  }

  // View details span som skapas vid fetch
  if (id === "details-link") {
    detailsPage.classList.add("open");
    searchPage.classList.remove("open");
    startPage.classList.remove("open");
  }
}

export async function searchEngine(searchInput) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();
    const results = document.querySelector("#results");

    console.log("Works")

    if (data.drinks) {
    results.innerHTML = data.drinks.map(drink => `
      <div class="randomcard" style="width: 18rem">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}" />
        <div class="card-body">
          <h5 class="card-title">${drink.strDrink}</h5>
          <span id="details-link" class="link" data-id="${drink.idDrink}">View Details</span>
        </div>
      </div>
      `).join("");
    } else {results.innerHTML = "<p>No results found, try again.</p>"}

  } catch (error) {
    console.log(error);
  }
}

export async function detailsOfCocktailID(cocktailID) {
  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailID}`);
    const data = await response.json();
    if (data.drinks) {
      const cocktail = data.drinks[0];
      showDetailsofCocktailSearchPage(mapRawCocktailData(cocktail));
    } else {
      console.log("No ID found")
    }

  } catch (error) {
    console.log(error);
  }
}