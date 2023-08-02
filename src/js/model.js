import { async } from 'regenerator-runtime';
import { API_URL, API_KEY, RECIPE_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';
import esArrayIterator from 'core-js/modules/es.array.iterator.js';

export const state = {
  recipe: {
    add: false,
  },
  search: {
    query: '',
    searchResult: [],
    resultPerPage: RECIPE_PER_PAGE,
    page: 1,
  },
  bookMark: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    state.recipe = { ...data.data.recipe };

    // reset add Bookmark for each recipe
    state.recipe.add = state.bookMark.findIndex(rep => rep.id === id) >= 0;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);

    // check query valid.
    if (data.results === 0)
      throw new Error(`can not found recipe with ${query}`);

    state.search.query = query;
    state.search.searchResult = [...data.data.recipes];

    // reset page when load result
    state.search.page = 1;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  const start = (page - 1) * state.search.resultPerPage; // 0
  const end = page * state.search.resultPerPage; // 9

  state.search.page = page;

  return state.search.searchResult.slice(start, end);
};

export const updateServing = function (newServing) {
  const oldServing = state.recipe.servings;

  // loop forEach to dont change anything about state.recipe.ingredients]
  state.recipe.ingredients.forEach(ing => {
    return (ing.quantity = (newServing * ing.quantity) / oldServing);
  });

  state.recipe.servings = newServing;
};

export const addBookMark = function (recipe) {
  const id = recipe.id;
  if (!state.recipe.add) {
    state.bookMark.push(recipe);
    state.recipe.add = true;
  } else {
    const index = state.bookMark.findIndex(rep => rep.id === id);
    state.bookMark.splice(index, 1);
    state.recipe.add = false;
  }

  // set on local storage
  localStorage.setItem('bookMarkList', JSON.stringify(state.bookMark));
};

export const getLocalStorage = function () {
  // get from local storage
  const dataLocal = JSON.parse(localStorage.getItem('bookMarkList'));
  state.bookMark = dataLocal;

  return state.bookMark;
};
