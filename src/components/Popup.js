export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleCloseByEsc = this._handleCloseByEsc.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleCloseByEsc);
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleCloseByEsc);
  }

  _handleClosePopupByClickOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      this.closePopup();
    }
    return;
  }

  _handleCloseByEsc(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', this.closePopup.bind(this));
    this._popup.addEventListener('click', this._handleClosePopupByClickOnOverlay.bind(this));
  }
}
