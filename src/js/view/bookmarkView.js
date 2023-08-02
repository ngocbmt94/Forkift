import { Preview } from './previewView.js';

class BookMark extends Preview {
  constructor() {
    super(
      '.bookmarks__list',
      'No bookmark yet. Find a nice recipe and bookmark it :)'
    );
  }

  _generateHTML() {
    return this._data
      .map(bookmark => this._generateHTMLpreview(bookmark))
      .join('');
  }

  addHandlerLoadPage(action) {
    window.addEventListener('load', action);
  }
}
export default new BookMark();
