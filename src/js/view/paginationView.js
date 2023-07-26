import { View } from './view.js';
import { RECIPE_PER_PAGE } from '../config.js';
import icons from 'url:../../img/icons.svg'; //console.log(icons);

class PaginationView extends View {
  constructor() {
    super('.pagination');
  }
  _renderBtnNext() {
    return `
    <button class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;
  }
  _renderBtnPrev() {
    return `
    <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
    </button>`;
  }

  _generateHTML() {
    const numberPage = Math.ceil(
      this._data.searchResult.length / this._data.resultPerPage
    );

    // page 1, and other page
    if (this._data.page === 1 && numberPage > 1) {
      return `${this._renderBtnNext()}`;
    }
    // last page
    if (this._data.page === numberPage && numberPage > 1) {
      return `${this._renderBtnPrev()}`;
    }
    // orther page
    if (this._data.page > 1 && this._data.page < numberPage) {
      return `${this._renderBtnPrev()}${this._renderBtnNext()}`;
    }
    // apply for page 1, NO orther page
    return '';
  }

  addHandlerPaginationBtn(action) {
    this._parentEl.addEventListener('click', function (e) {
      const btnClicked = e.target.closest('.btn--inline');
      const pageClicked = Number(btnClicked.querySelector('span').innerHTML);
      action(pageClicked);
    });
  }
}
export default new PaginationView();
