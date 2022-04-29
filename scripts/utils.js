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

const validationStates = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_visible'
}

const cardsContainer = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImageContainer = document.querySelector('.popup_type_photo');

const editButton = document.querySelector('.profile__edit-button');
const plusButton = document.querySelector('.profile__add-button');

export { initialCards, validationStates, cardsContainer, elementTemplate, popupAddPlace, popupEdit, popupImageContainer, editButton, plusButton }
