import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
    this._formSubmitButton = this._form.querySelector('.form__submit-button');
    this._formSubmitButtonOriginalText = this._formSubmitButton.textContent;
  }

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll('.form__input'));
    const values = {};
    inputList.forEach(input => {
      values[input.name] = input.value;
    });
    return values;
  }

  closePopup() {
    this._form.reset();
    super.closePopup();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._submitHandler(evt, this._getInputValues.bind(this));
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._formSubmitButton.textContent = 'Сохранение...';
    } else {
      this._formSubmitButton.textContent = this._formSubmitButtonOriginalText;
    }
  }
}
