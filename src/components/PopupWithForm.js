import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() {
    const inputList = Array.from(this._popup.querySelectorAll('.form__input'));
    const values = {};
    inputList.forEach(input => {
      values[input.id] = input.value;
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
      this.closePopup()
    });
  }
}
