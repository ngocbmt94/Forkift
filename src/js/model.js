import { API_URL, API_KEY, RECIPE_PER_PAGE } from './config.js';
import { getJSON, sendJSON } from './helper.js';

export const state = {
  recipe: {
    bookMarkAdded: false,
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
    const data = await getJSON(`${API_URL}/${id}?key=${API_KEY}`);

    state.recipe = { ...data.data.recipe };

    // reset add Bookmark for each recipe
    state.recipe.bookMarkAdded =
      state.bookMark.findIndex(rep => rep.id === id) >= 0;
  } catch (err) {
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
  if (!state.recipe.bookMarkAdded) {
    state.bookMark.push(recipe);
    state.recipe.bookMarkAdded = true;
  } else {
    const index = state.bookMark.findIndex(rep => rep.id === id);
    state.bookMark.splice(index, 1);
    state.recipe.bookMarkAdded = false;
  }

  // set on local storage
  localStorage.setItem('bookMarkList', JSON.stringify(state.bookMark));
};

export const getLocalStorage = function () {
  // get from local storage
  const dataLocal = JSON.parse(localStorage.getItem('bookMarkList'));
  state.bookMark = dataLocal || [];

  return state.bookMark;
};

export const uploadNewRecipe = async function (data) {
  try {
    // console.log('data-before', data);
    // format ingredients of new data follow format of ingredients array in recipe
    data.ingredients = [];
    for (const property in data) {
      if (
        property.includes('ingredient') &&
        !property.includes('ingredients')
      ) {
        if (!data[property]) {
          delete data[property];
          continue;
        }

        const valueArr = data[property].split(','); // output : [0.5', 'kg', 'Rice']
        if (valueArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format'
          );
        const valueObject = valueArr.reduce((ob, _, __, arr) => {
          ob.quantity = Number(arr[0]);
          ob.unit = arr[1];
          ob.description = arr[2];
          return ob;
        }, {});

        data.ingredients.push(valueObject);

        delete data[property];
      }
    }

    // follow format recipe of API
    const recipeUpload = {
      title: data.title,
      publisher: data.publisher,
      ingredients: data.ingredients,
      servings: +data.serving,
      cooking_time: +data.cooking_time,
      source_url: data.source_url,
      image_url: data.image_url,
    };

    // send JSON
    const dataUploaded = await sendJSON(
      `${API_URL}?key=${API_KEY}`,
      recipeUpload
    );

    state.recipe = { ...dataUploaded.data.recipe };
  } catch (err) {
    throw err;
  }
};
