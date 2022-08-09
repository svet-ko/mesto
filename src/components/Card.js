export default class Card {
  constructor(
    cardElementTemplate,
    element,
    handleCardClick,
    handleLikeOnServer,
    removeLikeOnServer,
    userId,
    handleTrashButtonClick
  ) {
      this._cardTemplate = cardElementTemplate.content;
      this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
      this._cardElementName = this._cardElement.querySelector('.element__name');
      this._cardElementImage = this._cardElement.querySelector('.element__image');
      this._likeButton = this._cardElement.querySelector('.element__like-button');
      this._cardElementLikeAmount = this._cardElement.querySelector('.element__like-counter');
      this._trashButton = this._cardElement.querySelector('.element__delete-button');
      this._likeButtonActiveClass = 'element__like-button_active';
      this._card = element;
      this._clickCard = handleCardClick;
      this._handleLikeOnServer = handleLikeOnServer;
      this._removeLikeOnServer = removeLikeOnServer;
      this._cardId = element._id;
      this._cardOwnerId = element.owner._id;
      this._userId = userId;
      this._isLiked = false;
      this._handleTrashButtonClick = handleTrashButtonClick;
  }

  _putLike() {
    this._likeButton.classList.add('element__like-button_active');
  }

  _removeLike() {
    this._likeButton.classList.remove('element__like-button_active');
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _addCardPopupOpener() {
    this._cardElementImage.addEventListener('click', () => {
      this._clickCard(this._cardElementImage, this._cardElementName);
  });
  }

  _handleTrashButton() {
    this._trashButton.addEventListener('click', () => {
      this._handleTrashButtonClick(this);
    });
  }

  _addCardEventListeners() {
    this._addCardPopupOpener();

    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like-button_active')) {
        this._removeLikeOnServer(this._cardId)
        .then((card) => {
          this._removeLike();
          this._cardElementLikeAmount.textContent = card.likes.length;
          this._isLiked = false;
        })
      } else {
        console.log(this._cardId);
        this._handleLikeOnServer(this._cardId)
        .then((card) => {
          this._putLike();
          this._cardElementLikeAmount.textContent = card.likes.length;
          this._isLiked = true;
        })
      }
    });

    this._handleTrashButton();
  }

  getCard(element) {
    this._cardElementName.textContent = element.name;
    this._cardElementImage.src = element.link;
    this._cardElementImage.alt = `Картинка "${element.name}"`;
    this._addCardEventListeners();
    this.getLikesAmount(element.likes);
    this.checkLike(element.likes);
    if (this._cardOwnerId !== this._userId) {
      this._trashButton.remove();
    };
    return this._cardElement;
  }

  getLikesAmount(likes) {
    this._cardElementLikeAmount.textContent = likes.length;
  }

  checkLike(likes) {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i]._id === this._userId) {
        this._putLike();
        this._isLiked = true;
        break;
      }
    }
  }

}
