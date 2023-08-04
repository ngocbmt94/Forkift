import { View } from './view';

class AddNewRecipe extends View {
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _addRecipeContainer = document.querySelector('.add-recipe-window');

  constructor() {
    super('.upload', 'need to fill the form:)');
    this._addHandlerForm();
  }

  _toggleForm() {
    this._addRecipeContainer.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerForm() {
    // show form
    this._btnOpen.addEventListener('click', this._toggleForm.bind(this));

    // close form
    this._btnClose.addEventListener('click', this._toggleForm.bind(this));
    this._overlay.addEventListener('click', this._toggleForm.bind(this));
  }

  addHandlerUpload(active) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();

      const dataArr = [...new FormData(this._parentEl)]; // get all property value from form with format [name of input, value of input]
      // convert array data to Object(to follow format of recipe)
      const newDataRecipe = dataArr.reduce((obRecipe, cur) => {
        obRecipe[cur[0]] = cur[1];
        return obRecipe;
      }, {});

      active(newDataRecipe);

      this._toggleForm();
    });
  }
}

export default new AddNewRecipe();
