import { View } from './view.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  constructor() {
    super('.results', 'Can not found recipe with this query');
  }

  _generateHTML() {
    const id = window.location.hash.slice(1);
    console.log(id);
    return this._data
      .map(el => {
        return `
        <li class="preview ${el.id === id ? 'preview__link--active' : ''}">
          <a class="preview__link " href="#${el.id}">
            <figure class="preview__fig">
              <img src="${el.image_url}" alt="${el.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${el.title}</h4>
              <p class="preview__publisher">${el.publisher}</p>
            </div>
          </a>
        </li>
        `;
      })
      .join('');
  }
}
export default new ResultView();
