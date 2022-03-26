import { enableValidation, checkInputValidity, toggleButtonState, validationStates } from './valid.js';

document.addEventListener('DOMContentLoaded', function() {

  const elementsList = document.querySelector('.elements__list');
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
  const popupImageContainer = document.querySelector('.popup_type_photo');
  const popupEdit = document.querySelector('.popup_type_edit');
  const popupImage = popupImageContainer.querySelector('.popup__image');
  const popupCaption = popupImageContainer.querySelector('.popup__caption');

  function createCard(element) {
    const cardTemplate = document.querySelector('#element-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardElementName = cardElement.querySelector('.element__name');
    const cardElementImage = cardElement.querySelector('.element__image');
    const likeButton = cardElement.querySelector('.element__like-button');
    const removeButton = cardElement.querySelector('.element__delete-button');

    cardElementName.textContent = element.name;
    cardElementImage.src = element.link;
    cardElementImage.alt = `Картинка "${element.name}"`;

    function toggleLike() {
      likeButton.classList.toggle('element__like-button_active');
    }

    function removeButtonHandler(evt) {
      cardElement.remove();
    }

    cardElementImage.addEventListener('click', () => {
        popupImage.src = element.link;
        popupImage.alt = `Картинка "${element.name}"`;
        popupCaption.textContent = element.name;
        openPopup(popupImageContainer);
    });

    likeButton.addEventListener('click', toggleLike);
    removeButton.addEventListener('click', (evt) => removeButtonHandler(evt));
    return cardElement;
  }

  function addElementToElementsList(element) {
    const cardElement = createCard(element);
    elementsList.prepend(cardElement);
  }

  function addElementsFromInitialArray() {
    initialCards.reverse().forEach((element) => addElementToElementsList(element));
  }

  function openPopup(popup) {
    popup.classList.add('popup_opened');
  }

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }

  function closePopupByClickOnOverlay(evt, popup) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
    return;
  }

  function closePopupByEsc(evt, popup) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    };
  }

  function addEditPopupEventsListneners(){
    console.log("addEditPopupEventsListneners!!!!");
    const profileCloseButton = popupEdit.querySelector('.popup__close-button');
    const profileForm = popupEdit.querySelector('.form');
    const profileInputList = Array.from(profileForm.querySelectorAll('.form__input'));
    const nameInput = profileForm.querySelector('.form__input_type_name');
    const aboutInput = profileForm.querySelector('.form__input_type_about');
    const submitProfileButton = profileForm.querySelector('.form__submit-button');

    const profileName = document.querySelector('.profile__user-name');
    const profileAbout = document.querySelector('.profile__user-about');
    const editButton = document.querySelector('.profile__edit-button');

    function putValue() {
      nameInput.value = profileName.textContent;
      aboutInput.value = profileAbout.textContent;
    };

    function handleEditFormSubmit(evt) {
      evt.preventDefault();
      console.log("handleEditFormSubmit!!!!");
      profileName.textContent = nameInput.value;
      profileAbout.textContent = aboutInput.value;
    }

    editButton.addEventListener('click', () => {
      openPopup(popupEdit);
      putValue();
      profileInputList.forEach((input) => checkInputValidity(profileForm, input, validationStates));
      toggleButtonState(profileInputList, submitProfileButton, validationStates);
    });

    profileCloseButton.addEventListener('click', () => closePopup(popupEdit));
    popupEdit.addEventListener('submit', (evt) => {handleEditFormSubmit(evt); closePopup(popupEdit)});
    popupEdit.addEventListener('click', (evt) => closePopupByClickOnOverlay(evt, popupEdit));
    document.addEventListener('keydown', (evt) => closePopupByEsc(evt, popupEdit));
  }

  function addPlacePopupEventsListneners() {
    console.log("addPlacePopupEventsListneners!!!!");
    const placePopupCloseButton = popupAddPlace.querySelector('.popup__close-button');
    const cardForm = popupAddPlace.querySelector('.form');
    const cardInputList = Array.from(cardForm.querySelectorAll('.form__input'));
    const placeInput = cardForm.querySelector('.form__input_type_place');
    const urlInput = cardForm.querySelector('.form__input_type_url');
    const submitCardButton = cardForm.querySelector('.form__submit-button');

    const addButton = document.querySelector('.profile__add-button');

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

    addButton.addEventListener('click', () => {
      openPopup(popupAddPlace);
      toggleButtonState(cardInputList, submitCardButton, validationStates);
    });
    placePopupCloseButton.addEventListener('click', () => closePopup(popupAddPlace));
    popupAddPlace.addEventListener('submit', (evt) => {handleCardFormSubmit(evt); closePopup(popupAddPlace)});
    popupAddPlace.addEventListener('click', (evt) => closePopupByClickOnOverlay(evt, popupAddPlace));
    document.addEventListener('keydown', (evt) => closePopupByEsc(evt, popupAddPlace));
  }

  function addImagePopupEventsListeners() {
    const imageCloseButton = popupImageContainer.querySelector('.popup__close-button');
    imageCloseButton.addEventListener('click', () => closePopup(popupImageContainer));
    document.addEventListener('keydown', (evt) => closePopupByEsc(evt, popupImageContainer));
  }

  addElementsFromInitialArray();
  addEditPopupEventsListneners();
  addPlacePopupEventsListneners();
  addImagePopupEventsListeners();
  enableValidation(validationStates);
})
