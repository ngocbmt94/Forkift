import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';

import 'core-js/stable'; // core-js là tập hợp các polyfill cho các tính năng chưa được trình duyệt cập nhập. vd Tren IE8 k support array.prototype.find
import 'regenerator-runtime/runtime.js'; // polyfill for async/ await
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

// hot module replacement (HMR): browser can not read, only use for parcel
if (module.hot) {
  module.hot.accept(); // hiện các thay đổi đối code và xem kết quả ngay lập tức trong trình duyệt mà không cần load trang.
}
///////////////////////////////////////
const controlRecipe = async function () {
  try {
    // get id from URLhash
    const id = window.location.hash.slice(1);
    if (!id) return;

    // show spinner when loading recipe
    recipeView.renderSpinner();

    // loading recipe
    await model.loadRecipe(id);

    // show recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
    console.error(err);
  }
};

const controlSearchResult = async function (query) {
  try {
    // show spinner when loading result
    resultView.renderSpinner();

    // load list recipe with query
    await model.loadSearchResult(query);

    // show list recipe of query result
    resultView.render(model.state.search.searchResult);
  } catch (err) {
    resultView.renderError(err);
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
};
init();
