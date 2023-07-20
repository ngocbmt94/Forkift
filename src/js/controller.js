import 'core-js/stable'; // core-js là tập hợp các polyfill cho các tính năng chưa được trình duyệt cập nhập. vd Tren IE8 k support array.prototype.find
import 'regenerator-runtime/runtime.js'; // polyfill for async/ await
import { async } from 'regenerator-runtime';
import { state, loadRecipe } from './model.js';
import recipeView from './view/recipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    // get id from URLhash
    const id = window.location.hash.slice(1);
    if (!id) return;

    // show spinner
    recipeView.renderSpinner();

    // loading recipe
    await loadRecipe(id);

    // show recipe
    recipeView.render(state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};
init();
