import icons from 'url:../../img/icons.svg';
export class View {
  _parentEl;
  _data;
  _errorMessage = '';
  _message = '';

  constructor(element, textError) {
    this._parentEl = document.querySelector(element);
    this._errorMessage = textError;
  }

  render(data) {
    this._data = data;
    const html = this._generateHTML();
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  renderError(err) {
    const htmlError = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${this._errorMessage}. ${err}</p>
      </div>
    `;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', htmlError);
  }
  renderMessage(message = this._message) {
    const htmlMessage = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
      </div>
    `;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', htmlMessage);
  }
  renderSpinner() {
    const htmlSpinner = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', htmlSpinner);
  }
}
