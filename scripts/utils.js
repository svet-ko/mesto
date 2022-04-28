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

const popupImageContainer = document.querySelector('.popup_type_photo');

export { initialCards, validationStates, popupImageContainer }
