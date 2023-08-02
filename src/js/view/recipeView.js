import icons from 'url:../../img/icons.svg'; //console.log(icons);
import { Fraction } from 'fractional';
import { View } from './view.js';

class RecipeView extends View {
  constructor() {
    super('.recipe', 'We cound not find that recipe. Please try again');
  }

  _generateHTML() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image_url}" alt="${
      this._data.title
    }" class="recipe__img"/>
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>
  
    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          this._data.cooking_time
        }</span>
       
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this._data.servings
        }</span>
        <span class="recipe__info-text">servings</span>
  
        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings - 1
          }">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--update-servings" data-update-to="${
            this._data.servings + 1
          }">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
  
      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      ${this._renderAddBookMark(this._data.add)}
    </div>
  
    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${this._renderIngredients(this._data.ingredients)}
      </ul>
    </div>
  
    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this._data.publisher}</span>. Please
        check out directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.source_url}"
        target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  }

  _renderAddBookMark(add) {
    const href = !add
      ? `${icons}#icon-bookmark`
      : `${icons}#icon-bookmark-fill`;
    return `
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${href}"></use>
      </svg>
    </button>
    `;
  }

  _renderIngredients(ingredients) {
    return ingredients
      .map(ing => {
        return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }
          </div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`;
      })
      .join('');
  }

  // change URL and load page to show recipe
  addHandlerRender(action) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, action));
  }

  // event to change servings
  addHandlerClickServings(action) {
    this._parentEl.addEventListener('click', function (e) {
      const btnClicked = e.target.closest('.btn--update-servings');

      if (!btnClicked) return;
      const updateTo = +btnClicked.dataset.updateTo;
      if (updateTo > 0) action(updateTo);
    });
  }

  addHandlerBookmark(action) {
    this._parentEl.addEventListener('click', e => {
      const eLclicked = e.target.closest('.btn--bookmark');

      if (!eLclicked) return;
      let svg = eLclicked.querySelector('svg use');

      if (!this._data.add) {
        svg.setAttribute('href', `${icons}#icon-bookmark-fill`);
      } else {
        svg.setAttribute('href', `${icons}#icon-bookmark`);
      }

      action();
    });
  }
}
export default new RecipeView();
