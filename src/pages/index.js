import {
  validationStates,
  cardsContainer,
  elementTemplate,
  popupAddPlace,
  popupEdit,
  popupImageContainer,
  popupConfirm,
  popupEditAvatar,
  userEditButton,
  plusButton,
  avatarEditButton,
  profileForm,
  nameInput,
  aboutInput,
  host,
  headers
 } from '../utils/constants.js';
import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const apiInfo = new Api(host, headers);

const imagePopupItem = new PopupWithImage(popupImageContainer);
const profileValidator = new FormValidator(validationStates, profileForm);


const userInfoItem = new UserInfo({
  nameSelector: '.profile__user-name',
  aboutSelector: '.profile__user-about',
  avatarSelector: '.profile__avatar'
});

const cardForm = popupAddPlace.querySelector('.form');
const cardValidator = new FormValidator(validationStates, cardForm);

const avatarEditForm = popupEditAvatar.querySelector('.form');
const avatarValidator = new FormValidator(validationStates, avatarEditForm);

const confirmationPopup = new PopupWithConfirmation(popupConfirm);


function handleCardClick(cardImage, cardName) {
  imagePopupItem.openPopup(cardImage, cardName);
}

function handleTrashButtonClick(card) {
  confirmationPopup.openPopup();
  confirmationPopup.setPopupSubmitHandler(() =>
  {
    apiInfo.deleteCard(card._cardId)
    .then(() => {
      card.deleteCard();
      confirmationPopup.closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
  })
}

function handleLikeOnServer(cardId) {
  return apiInfo.putCardLike(cardId)
  .then(card => {
    this.putLike(card.likes);
  })
  .catch((err) => {
    console.log(err);
  })
}

function removeLikeOnServer(cardId) {
  return apiInfo.removeCardLike(cardId)
  .then(card => {
    this.removeLike(card.likes);
  })
  .catch((err) => {
    console.log(err);
  })
}

function createCard(element) {
  const cardElement = new Card(
    elementTemplate,
    element,
    handleCardClick,
    handleLikeOnServer,
    removeLikeOnServer,
    userInfoItem.getUserId(),
    handleTrashButtonClick
  );
  return cardElement.getCard(element);
}

function addNewCard(element) {
  initialCardsSection.addItem(createCard(element));
}

function putValue() {
  const userProfile = userInfoItem.getUserInfo();
  nameInput.value = userProfile.name;
  aboutInput.value = userProfile.about;
}

function handleEditFormSubmit(evt, getInputs) {
  evt.preventDefault();
  const userData = getInputs();
  this.renderLoading(true);
  apiInfo.applyUserInfo({name: userData.name, about: userData.about })
  .then(data => {
    userInfoItem.setUserInfo(data);
    this.closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(this.renderLoading(false))
}

function createObjFromInputsData(getInputs) {
  const inputData = getInputs();
  const element = {};
  element.name = inputData.place;
  element.link = inputData.url;
  return element;
}

function handleCardFormSubmit(evt, getInputs) {
  evt.preventDefault();
  const newElement = createObjFromInputsData(getInputs);
  this.renderLoading(true);
  apiInfo.sendCreatedCard(newElement)
  .then(card => {
    addNewCard(card);
    this.closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(this.renderLoading(false))
}

function handleAvatarEditFormSubmit(evt, getInputs) {
  evt.preventDefault();
  const newAvatar = getInputs();
  this.renderLoading(true);
  apiInfo.updateUserAvatar(newAvatar.avatar)
  .then((avatar) => {
    userInfoItem.setUserAvatar(avatar);
    this.closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(this.renderLoading(false))
}

const editPopupWithFormItem = new PopupWithForm(popupEdit, handleEditFormSubmit);
const placePopupWithFormItem = new PopupWithForm(popupAddPlace, handleCardFormSubmit);
const avatarEditPopupWithFormItem = new PopupWithForm(popupEditAvatar, handleAvatarEditFormSubmit);

const initialCardsSection = new Section({renderer: createCard}, cardsContainer);

confirmationPopup.setEventListeners();

const initialUserInfo = apiInfo.getUserInfo();
const initialCards = apiInfo.getInitialCards();

Promise.all([initialUserInfo, initialCards])
.then((values) => {
  const [userValues, cardsValues] = values;

  userInfoItem.setUserInfo(userValues);
  userInfoItem.setUserAvatar(userValues);
  userInfoItem.setUserId(userValues._id);

  cardsValues.reverse();
  initialCardsSection.renderItems(cardsValues);
})
.catch((err) => {
  console.log(err);
});

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();

imagePopupItem.setEventListeners();
editPopupWithFormItem.setEventListeners();
placePopupWithFormItem.setEventListeners();
avatarEditPopupWithFormItem.setEventListeners();

userEditButton.addEventListener('click', () => {
  putValue();
  editPopupWithFormItem.openPopup();
});

plusButton.addEventListener('click', () => {
  cardValidator.enableValidation();
  placePopupWithFormItem.openPopup();
});

avatarEditButton.addEventListener('click', () => {
  avatarValidator.enableValidation();
  avatarEditPopupWithFormItem.openPopup();
})
