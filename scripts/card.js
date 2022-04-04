import { openPopup, popupImageContainer, popupCaption, popupImage } from './utils.js'

class Card {
  constructor(cardElementTemplate, element) {
    this._cardTemplate = cardElementTemplate.content;
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._cardElementName = this._cardElement.querySelector('.element__name');
    this._cardElementImage = this._cardElement.querySelector('.element__image');
    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._trashButton = this._cardElement.querySelector('.element__delete-button');

    this._cardElementName.textContent = element.name;
    this._cardElementImage.src = element.link;
    this._cardElementImage.alt = `Картинка "${element.name}"`;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _removeButtonHandler(evt) {
    this._cardElement.remove();
    this._cardElement = '';
  }

  _addCardPopupOpener() {
    this._cardElementImage.addEventListener('click', () => {
      popupImage.src = this._cardElementImage.src;
      popupImage.alt = `Картинка "${this._cardElementName.textContent}"`;
      popupCaption.textContent = this._cardElementName.textContent;
      openPopup(popupImageContainer);
  });
  }

  _addCardEventListeners() {
    this._addCardPopupOpener();
    this._likeButton.addEventListener('click', () => {this._toggleLike()});
    this._trashButton.addEventListener('click', (evt) => this._removeButtonHandler(evt));
  }

  getCard() {
    this._addCardEventListeners();
    return this._cardElement;
  }

}

export {Card}
