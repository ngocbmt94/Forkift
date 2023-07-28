import { async } from 'regenerator-runtime';
import { API_URL, API_KEY, RECIPE_PER_PAGE } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
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
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultPage = function (page = 1) {
  const start = (page - 1) * state.search.resultPerPage; // 0
  const end = page * state.search.resultPerPage; // 9

  state.search.page = page;

  return state.search.searchResult.slice(start, end);
};

export const updateServing = function (newServing) {
  const oldServing = state.recipe.servings;

  // loop forEach to dont change anything about state.recipe.ingredients
  state.recipe.ingredients.forEach(ing => {
    return (ing.quantity = (newServing * ing.quantity) / oldServing);
  });

  state.recipe.servings = newServing;
};
