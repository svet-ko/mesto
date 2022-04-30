export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._closeByEsc = this._closeByEsc.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeByEsc);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeByEsc);
  }

  _closePopupByClickOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.closePopup();
    }
    return;
  }

  _closeByEsc(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.closePopup.bind(this));
    this._popup.addEventListener('click', this._closePopupByClickOnOverlay.bind(this));
  }
}
