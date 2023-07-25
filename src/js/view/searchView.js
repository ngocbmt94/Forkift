import { View } from './view';

class SearchView extends View {
  searchInput = this._parentEl.querySelector('.search__field');
  constructor() {
    super('.search');
  }

  addHandlerSearch(action) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();

      //console.log(this); // class SearchView
      action(this.searchInput.value);
      this._clearInput();
    });
  }

  _clearInput() {
    this.searchInput.value = '';
  }
}
export default new SearchView();
