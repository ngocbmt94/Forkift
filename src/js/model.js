import { async } from 'regenerator-runtime';
import { API_URL, API_KEY } from './config.js';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    searchResult: [],
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

    console.log(data);
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
