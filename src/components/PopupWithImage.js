import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  openPopup(cardImage, cardName) {
     this._popupImage.src = cardImage.src;
    this._popupImage.alt = `Картинка "${cardName.textContent}"`;
    this._popupCaption.textContent = cardName.textContent;
    super.openPopup();
  }
}
