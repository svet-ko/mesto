const pavlovsk = new URL('../../images/tinified/element-pavlovsk_medium.jpg', import.meta.url);
const oranienbaum = new URL('../../images/tinified/element-lomonosov-medium.jpg', import.meta.url);
const kronstadt = new URL('../../images/tinified/element-kronshtadt.jpg', import.meta.url);
const petergof = new URL('../../images/tinified/element-aleksandria-medium.jpg', import.meta.url);
const gatchina = new URL('../../images/tinified/element-gatchina-medium.jpg', import.meta.url);
const pushkin = new URL('../../images/tinified/element-pushkin-medium.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Павловск',
    link: pavlovsk
  },
  {
    name: 'Ораниенбаум',
    link: oranienbaum
  },
  {
    name: 'Кронштадт',
    link: kronstadt
  },
  {
    name: 'Петергоф - парк Александрия',
    link: petergof
  },
  {
    name: 'Гатчина',
    link: gatchina
  },
  {
    name: 'Пушкин',
    link: pushkin
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

const userEditButton = document.querySelector('.profile__edit-button');
const plusButton = document.querySelector('.profile__add-button');

export { initialCards, validationStates, cardsContainer, elementTemplate, popupAddPlace, popupEdit, popupImageContainer, userEditButton, plusButton }
