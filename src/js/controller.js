import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import bookmarkView from './view/bookmarkView.js';

import 'core-js/stable'; // core-js là tập hợp các polyfill cho các tính năng chưa được trình duyệt cập nhập. vd Tren IE8 k support array.prototype.find
import 'regenerator-runtime/runtime.js'; // polyfill for async/ await
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

// hot module replacement (HMR): browser can not read, only use for parcel
// if (module.hot) {
//   module.hot.accept(); // hiện các thay đổi đối code và xem kết quả ngay lập tức trong trình duyệt mà không cần load trang.
// }
///////////////////////////////////////
const controlRecipe = async function () {
  try {
    // 0.get id from URLhash
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 1.Update results view to mark selected search result(active class "preview__link--active" base on id)
    resultView.update(model.getSearchResultPage());

    // 2. Update results bookmark view to mark selected search result(active class "preview__link--active" base on id)
    bookmarkView.update(model.state.bookMark);

    // 2.show spinner when loading recipe
    recipeView.renderSpinner();

    // 3.loading recipe
    await model.loadRecipe(id);

    // 4.show recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err);
    console.error(err);
  }
};

const controlSearchResult = async function (query) {
  try {
    // 1.show spinner when loading result
    resultView.renderSpinner();

    // 2.load list recipe with query
    await model.loadSearchResult(query);

    // 3.show list recipe of query results (10 item)
    resultView.render(model.getSearchResultPage());

    // 4.show pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError(err);
    console.error(err);
  }
};

const controlPagination = function (pageIndex) {
  model.state.search.page = pageIndex;

  // render new new result and new pagination
  resultView.render(model.getSearchResultPage(model.state.search.page));
  paginationView.render(model.state.search);
};

const controlServings = function (numberServing) {
  // 1. update NEW ingredient of recipe in state
  model.updateServing(numberServing);
  // 2. update NEW ingredient of recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1.add / remove bookMark in array on state.
  model.addBookMark(model.state.recipe);

  // 2. renderbookMark list
  bookmarkView.render(model.state.bookMark);
};

const controlLocalStorage = function () {
  // render bookmark list from local storage
  bookmarkView.render(model.getLocalStorage());
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerPaginationBtn(controlPagination);
  recipeView.addHandlerClickServings(controlServings); // not async
  recipeView.addHandlerBookmark(controlAddBookmark);
  bookmarkView.addHandlerLoadPage(controlLocalStorage);
};
init();
