import { Preview } from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends Preview {
  constructor() {
    super('.results', 'Can not found recipe with this query');
  }

  _generateHTML() {
    return this._data.map(result => this._generateHTMLpreview(result)).join('');
  }
}
export default new ResultView();
