import { initialCards, validationStates, popupImageContainer } from './utils.js'
import { FormValidator } from './FormValidator.js'
import { Card } from './card.js'
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const cardsContainer = document.querySelector('.elements__list');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupEdit = document.querySelector('.popup_type_edit');

const elementTemplate = document.querySelector('#element-template');

function handleCardClick(cardImage, cardName) {
  const imagePopupItem = new PopupWithImage(popupImageContainer);
  imagePopupItem.openPopup(cardImage, cardName);
  imagePopupItem.setEventListeners();
}

function addElementToElementsList(element) {
  const cardElement = new Card(elementTemplate, element, handleCardClick);
  cardsContainer.prepend(cardElement.getCard(popupImageContainer));
}

function addElementsFromInitialArray() {
  initialCards.reverse().forEach((element) => addElementToElementsList(element));
}

const profileForm = popupEdit.querySelector('.form');
const profileValidator = new FormValidator(validationStates, profileForm);
profileValidator.enableValidation();
const nameInput = profileForm.querySelector('.form__input_type_name');
const aboutInput = profileForm.querySelector('.form__input_type_about');

const editButton = document.querySelector('.profile__edit-button');

const userInfoItem = new UserInfo({nameSelector: '.profile__user-name', aboutSelector: '.profile__user-about'});

function putValue() {
  const userProfile = userInfoItem.getUserInfo();
  nameInput.value = userProfile.name;
  aboutInput.value = userProfile.about;
}

function handleEditFormSubmit(evt, getInputs) {
  evt.preventDefault();
  const [name, about] = getInputs();
  userInfoItem.setUserInfo({newName: name.value, newAbout: about.value});
}

const editPopupWithFormItem = new PopupWithForm(popupEdit, handleEditFormSubmit);
editPopupWithFormItem.setEventListeners();
editButton.addEventListener('click', () => {editPopupWithFormItem.openPopup(); putValue();});


const cardForm = popupAddPlace.querySelector('.form');
const cardValidator = new FormValidator(validationStates, cardForm);
cardValidator.enableValidation();

const plusButton = document.querySelector('.profile__add-button');

function createElement(getInputs) {
  const [name, link] = getInputs();
  const element = {};
  element.name = name.value;
  element.link = link.value;
  return element;
}

function handleCardFormSubmit(evt, getInputs) {
  evt.preventDefault();
  const newElement = createElement(getInputs);
  addElementToElementsList(newElement);
}

const placePopupWithFormItem = new PopupWithForm(popupAddPlace, handleCardFormSubmit);
placePopupWithFormItem.setEventListeners();
plusButton.addEventListener('click', () => {cardValidator.enableValidation(); placePopupWithFormItem.openPopup()});


addElementsFromInitialArray();
