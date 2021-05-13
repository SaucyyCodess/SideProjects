"use strict";

let pageSize = 12;
let currentPage;
let objectIDs;

async function loadObject(id) {
  const url = `https://api.jikan.moe/v3/anime/${id}`;
  const response = await fetch(url);
  return response.json();
}

async function loadSearch(query, isHighlight) {

  let baseURL = `https://api.jikan.moe/v3/search/anime?q=`;
  baseURL = `${baseURL}&q=${query}`;
  const response = await fetch(baseURL);
    return response.json();

}


function buildAnimeFromData(obj) {
  const article = document.createElement("article");
  const title = document.createElement("h2");
  const animeDate = document.createElement("span");

  title.textContent = obj.title;
  animeDate.textContent = obj.animeDate;

  article.appendChild(title);
  article.appendChild(animeDate);


  return article;
}

async function insertArticles(objIds) {
  const result = await loadSearch(query.value)
  const articles = result.results.map(buildAnimeFromData);
  articles.forEach(a => animeresults.appendChild(a));

}

async function doSearch(ev) {
  clearResults();
  loader.classList.add("waiting");
  const result = await loadSearch(query.value);
  objectIDs = result.results;
  pgcount.textContent = `Gotcha ${objectIDs.length} anime results for "${query.value}"`;
  nPages.textContent = Math.ceil(objectIDs.length / pageSize);
  currentPage = 1;
  loadPage();
  loader.classList.remove("waiting");
}

async function loadPage() {
  clearResults();
  const myAnimes = objectIDs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  loader.classList.add("waiting");
  await insertArticles(myAnimes);
  loader.classList.remove("waiting");
  pageIndicator.textContent = currentPage;
}

function clearResults() {
  while(animeresults.firstChild) {
    animeresults.firstChild.remove();
  }
}

query.addEventListener('change', doSearch);

/*
function buildAnimeFromData(obj) {
  const article = document.createElement("article");
  const title = document.createElement("h2");
  const animeImage = document.createElement("img");
  const animeInfo = document.createElement("p");
  const animeName = document.createElement("span");
  const animeDate = document.createElement("span");
  const medium = document.createElement("p");

  title.textContent = obj.title;
  animeImage.src = obj.animeImage;
  animeImage.alt = `${obj.title} (small image)`;
  animeName.textContent = obj.animeName;
  animeDate.textContent = `, ${obj.animeDate}`;
  medium.textContent = obj.medium;


  article.appendChild(title);

  article.appendChild(animeImage);
  article.appendChild(animeInfo);
  article.appendChild(medium);

  animeInfo.appendChild(animeName);
  if(obj.animeDate) {
    animeInfo.appendChild(animeDate);
  }

  return article;
}

async function insertArticles(objIds) {
  const result = await loadSearch(query.value)
  const articles = result.results.map(buildAnimeFromData);
  articles.forEach(a => animeresults.appendChild(a));
}

async function doSearch(ev) {
  clearResults();
  loader.classList.add("waiting");
  const result = await loadSearch(query.value);
  objectIDs = result.results;
  pgcount.textContent = `Gotcha ${objectIDs.length} animeresults for "${query.value}"`;
  nPages.textContent = Math.ceil(objectIDs.length / pageSize);
  currentPage = 1;
  loadPage();
}

async function loadPage() {
  clearResults();
  const myAnimes = objectIDs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  loader.classList.add("waiting");
  await insertArticles(myAnimes);
  loader.classList.remove("waiting");
  pageIndicator.textContent = currentPage;
}

function nextPage() {
  currentPage += 1;
  const nPages = Math.ceil(objectIDs.length / pageSize);
  if(currentPage > nPages) { currentPage = 1; }
  loadPage();
}

function prevPage() {
  currentPage -= 1;
  const nPages = Math.ceil(objectIDs.length / pageSize);
  if(currentPage < 1) { currentPage = nPages; }
  loadPage();
}

function clearResults() {
  while(animeresults.firstChild) {
    animeresults.firstChild.remove();
  }
}

query.addEventListener('change', doSearch);
prev.addEventListener('click', prevPage);
next.addEventListener('click', nextPage);
*/
