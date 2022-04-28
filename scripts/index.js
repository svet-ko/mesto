import { initialCards, validationStates, popupImageContainer } from './utils.js'
import { FormValidator } from './FormValidator.js'
import { Card } from './card.js'
import PopupWithForm from './PopupWithForm.js';

const cardsContainer = document.querySelector('.elements__list');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupEdit = document.querySelector('.popup_type_edit');

const elementTemplate = document.querySelector('#element-template');

function addElementToElementsList(element) {
  const cardElement = new Card(elementTemplate, element);
  cardsContainer.prepend(cardElement.getCard(popupImageContainer));
}

function addElementsFromInitialArray() {
  initialCards.reverse().forEach((element) => addElementToElementsList(element));
}

const profileCloseButton = popupEdit.querySelector('.popup__close-button');
const profileForm = popupEdit.querySelector('.form');
const profileValidator = new FormValidator(validationStates, profileForm);
profileValidator.enableValidation();
const nameInput = profileForm.querySelector('.form__input_type_name');
const aboutInput = profileForm.querySelector('.form__input_type_about');

const profileName = document.querySelector('.profile__user-name');
const profileAbout = document.querySelector('.profile__user-about');
const editButton = document.querySelector('.profile__edit-button');

function putValue() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
};

function handleEditFormSubmit(evt, getInputs) {
  evt.preventDefault();
  const [name, about] = getInputs();
  profileName.textContent = name.value;
  profileAbout.textContent = about.value;
}

const editPopupWithFormItem = new PopupWithForm(popupEdit, handleEditFormSubmit);
editPopupWithFormItem.setEventListeners();
editButton.addEventListener('click', () => {editPopupWithFormItem.openPopup(); putValue();});


const placePopupCloseButton = popupAddPlace.querySelector('.popup__close-button');
const cardForm = popupAddPlace.querySelector('.form');
const cardValidator = new FormValidator(validationStates, cardForm);
cardValidator.enableValidation();
const placeInput = cardForm.querySelector('.form__input_type_place');
const urlInput = cardForm.querySelector('.form__input_type_url');

const plusButton = document.querySelector('.profile__add-button');

function createElement() {
  const element = {};
  element.name = placeInput.value;
  element.link = urlInput.value;
  return element;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newElement = createElement();
  addElementToElementsList(newElement);
}

//plusButton.addEventListener('click', () => {cardValidator.enableValidation(); openPopup(popupAddPlace)});
//placePopupCloseButton.addEventListener('click', () => closePopup(popupAddPlace));
//popupAddPlace.addEventListener('submit', (evt) => {handleCardFormSubmit(evt); closePopup(popupAddPlace)});
//popupAddPlace.addEventListener('click', (evt) => closePopupByClickOnOverlay(evt));


addElementsFromInitialArray();
