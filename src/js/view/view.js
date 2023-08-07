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

  /**
   * Render the received object to the DOM
   * @param {Object | Array} The data to be rendered
   * @returns {undefined}
   * @this {Object} View instance
   * @author Bich Ngoc
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const html = this._generateHTML();
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', html);
  }

  update(data) {
    this._data = data;
    const newHTML = this._generateHTML(); // output: String

    const newDOM = new Range().createContextualFragment(newHTML); // output: #document-fragment: html fake
    const newElement = Array.from(newDOM.querySelectorAll('*')); // covert from Nodelist to array
    const curElement = Array.from(this._parentEl.querySelectorAll('*')); // covert from Nodelist to array

    newElement.forEach((newEl, i) => {
      const curEl = curElement[i];
      // compare content of node & change textContent
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('before', curEl, 'after', newEl);
        curEl.textContent = newEl.textContent;
      }

      // compare content of node & change attributes
      if (!newEl.isEqualNode(curEl)) {
        const arrAttr = Array.from(newEl.attributes);

        arrAttr.forEach(itemAttr =>
          curEl.setAttribute(itemAttr.name, itemAttr.value)
        );
      }
    });
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
