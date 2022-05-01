import {
  initialCards,
  validationStates,
  cardsContainer,
  elementTemplate,
  popupAddPlace,
  popupEdit,
  popupImageContainer,
  userEditButton,
  plusButton
 } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

const imagePopupItem = new PopupWithImage(popupImageContainer);
const profileForm = popupEdit.querySelector('.form');
const profileValidator = new FormValidator(validationStates, profileForm);
const nameInput = profileForm.querySelector('.form__input_type_name');
const aboutInput = profileForm.querySelector('.form__input_type_about');
const userInfoItem = new UserInfo({nameSelector: '.profile__user-name', aboutSelector: '.profile__user-about'});
const cardForm = popupAddPlace.querySelector('.form');
const cardValidator = new FormValidator(validationStates, cardForm);


function handleCardClick(cardImage, cardName) {
  imagePopupItem.openPopup(cardImage, cardName);
}

function createCard(element) {
  const cardElement = new Card(elementTemplate, element, handleCardClick);
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
  userInfoItem.setUserInfo({newName: userData.name, newAbout: userData.about});
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
  addNewCard(newElement);
}

const initialCardsSection = new Section({items: initialCards, renderer: addNewCard}, cardsContainer);
const editPopupWithFormItem = new PopupWithForm(popupEdit, handleEditFormSubmit);
const placePopupWithFormItem = new PopupWithForm(popupAddPlace, handleCardFormSubmit);

initialCardsSection.renderItems();

profileValidator.enableValidation();
cardValidator.enableValidation();

imagePopupItem.setEventListeners();
editPopupWithFormItem.setEventListeners();
placePopupWithFormItem.setEventListeners();

userEditButton.addEventListener('click', () => {
  putValue();
  editPopupWithFormItem.openPopup();
});

plusButton.addEventListener('click', () => {
  cardValidator.enableValidation();
  placePopupWithFormItem.openPopup();
});
