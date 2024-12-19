import {
  mapRawCocktailData,
  getRandomCard,
  showRandomCard,
  handleOnNavbarClick,
  handleOnLinkClick,
  showDetailsofCocktailStartPage,
  showDetailsofCocktailSearchPage,
  searchEngine,
  detailsOfCocktailID,
} from "./utilities.js";

const navbar = document.querySelector(".navbar");
const startPage = document.querySelector("#start-page");
const detailsPage = document.querySelector("#details-page");
const searchPage = document.querySelector("#search-page");
const searchInputBtn = document.querySelector("#searchBtn");
const detailsOnSearch = searchPage.querySelector("#details-link");

console.log(detailsOnSearch);

getRandomCard();
searchEngine();
detailsOfCocktailID;

navbar.addEventListener("click", handleOnNavbarClick);
startPage.addEventListener("click", handleOnNavbarClick);
