import { openPopup, popupImageContainer, popupCaption, popupImage } from './index.js'

class Card {
  constructor(cardElementTemplate, element) {
    this.cardTemplate = cardElementTemplate.content;
    this.cardElement = this.cardTemplate.querySelector('.element').cloneNode(true);
    this.cardElementName = this.cardElement.querySelector('.element__name');
    this.cardElementImage = this.cardElement.querySelector('.element__image');
    this.likeButton = this.cardElement.querySelector('.element__like-button');
    this.trashButton = this.cardElement.querySelector('.element__delete-button');

    this.cardElementName.textContent = element.name;
    this.cardElementImage.src = element.link;
    this.cardElementImage.alt = `Картинка "${element.name}"`;
  }

  _toggleLike() {
    this.likeButton.classList.toggle('element__like-button_active');
  }

  _removeButtonHandler(evt) {
    this.cardElement.remove();
  }

  _addCardPopupOpener() {
    this.cardElementImage.addEventListener('click', () => {
      popupImage.src = this.cardElementImage.src;
      popupImage.alt = `Картинка "${this.cardElementName.textContent}"`;
      popupCaption.textContent = this.cardElementName.textContent;
      openPopup(popupImageContainer);
  });
  }

  _addCardEventListeners() {
    this._addCardPopupOpener();
    this.likeButton.addEventListener('click', () => {this._toggleLike()});
    this.trashButton.addEventListener('click', (evt) => this._removeButtonHandler(evt));
  }

  getCard(popup) {
    this._addCardEventListeners(popup);
    return this.cardElement;
  }

}

export {Card}
