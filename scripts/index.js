import { popupImageContainer, openPopup, closePopup, closePopupByClickOnOverlay } from './utils.js'
import { FormValidator } from './FormValidator.js'
import { Card } from './card.js'

const cardsContainer = document.querySelector('.elements__list');
const initialCards = [
  {
    name: 'Павловск',
    link: './images/tinified/element-pavlovsk_medium.jpg'
  },
  {
    name: 'Ораниенбаум',
    link: './images/tinified/element-lomonosov-medium.jpg'
  },
  {
    name: 'Кронштадт',
    link: './images/tinified/element-kronshtadt.jpg'
  },
  {
    name: 'Петергоф - парк Александрия',
    link: './images/tinified/element-aleksandria-medium.jpg'
  },
  {
    name: 'Гатчина',
    link: './images/tinified/element-gatchina-medium.jpg'
  },
  {
    name: 'Пушкин',
    link: './images/tinified/element-pushkin-medium.jpg'
  },
];

const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupEdit = document.querySelector('.popup_type_edit');

const elementTemplate = document.querySelector('#element-template');

const validationStates = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_visible'
}

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

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
}

editButton.addEventListener('click', () => {openPopup(popupEdit); putValue();});

profileCloseButton.addEventListener('click', () => closePopup(popupEdit));
popupEdit.addEventListener('submit', (evt) => {handleEditFormSubmit(evt); closePopup(popupEdit)});
popupEdit.addEventListener('click', (evt) => closePopupByClickOnOverlay(evt));


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
  cardForm.reset();
}

plusButton.addEventListener('click', () => {cardValidator.enableValidation(); openPopup(popupAddPlace)});
placePopupCloseButton.addEventListener('click', () => closePopup(popupAddPlace));
popupAddPlace.addEventListener('submit', (evt) => {handleCardFormSubmit(evt); closePopup(popupAddPlace)});
popupAddPlace.addEventListener('click', (evt) => closePopupByClickOnOverlay(evt));



const imageCloseButton = popupImageContainer.querySelector('.popup__close-button');
imageCloseButton.addEventListener('click', () => closePopup(popupImageContainer));
popupImageContainer.addEventListener('click', (evt) => closePopupByClickOnOverlay(evt));


addElementsFromInitialArray();
