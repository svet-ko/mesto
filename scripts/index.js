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

  function addElementToElementsList(element) {
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
      evt.target.parentElement.remove();
    }

    const popupImage = popupImageContainer.querySelector('.popup__image');
    const popupCaption = popupImageContainer.querySelector('.popup__caption');

    function copyPhotoToPopup(photo) {
      popupImage.src = photo.src;
    }

    function copyCaptionToPopup(name) {
      popupCaption.textContent = name.textContent;
    }

    cardElementImage.addEventListener('click', () => {
        copyPhotoToPopup(cardElementImage);
        copyCaptionToPopup(cardElementName);
        openPopup(popupImageContainer);
    });

    likeButton.addEventListener('click', toggleLike);
    removeButton.addEventListener('click', (evt) => removeButtonHandler(evt));
    elementsList.prepend(cardElement);
  }

  function addElementsFromInitialArray() {
    initialCards.reverse().forEach((element) => addElementToElementsList(element));
  }

  function addHidden(popup) {
    popup.classList.add('popup_hidden');
  }

  function openPopup(popup) {
    popup.classList.remove('popup_hidden');
    popup.classList.remove('popup_fade');
    popup.classList.add('popup_opened');
  }

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_fade');
    setTimeout(() => addHidden(popup), 355);
  }

  function closePopupByClickOnOverlay(evt, popup) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
    return;
  }

  function addEditPopupEventsListneners(){
    const closeButton = popupEdit.querySelector('.popup__close-button');
    const popupForm = popupEdit.querySelector('.popup__form');
    const nameInput = popupForm.querySelector('.popup__form-item_type_name');
    const aboutInput = popupForm.querySelector('.popup__form-item_type_about');

    const profileName = document.querySelector('.profile__user-name');
    const profileAbout = document.querySelector('.profile__user-about');
    const editButton = document.querySelector('.profile__edit-button');

    function putValue() {
      nameInput.value = profileName.textContent;
      aboutInput.value = profileAbout.textContent;
    };

    function editFormSubmitHandler(evt) {
      evt.preventDefault();
      profileName.textContent = nameInput.value;
      profileAbout.textContent = aboutInput.value;
    }

    editButton.addEventListener('click', () => {openPopup(popupEdit); putValue()});
    closeButton.addEventListener('click', () => closePopup(popupEdit));
    popupEdit.addEventListener('submit', (evt) => {editFormSubmitHandler(evt); closePopup(popupEdit)});
    popupEdit.addEventListener('click', (evt) => closePopupByClickOnOverlay(evt, popupEdit));
  }

  function addAddPlacePopupEventsListneners() {
    const closeButton = popupAddPlace.querySelector('.popup__close-button');
    const popupForm = popupAddPlace.querySelector('.popup__form');
    const placeInput = popupForm.querySelector('.popup__form-item_type_place');
    const urlInput = popupForm.querySelector('.popup__form-item_type_url');

    const addButton = document.querySelector('.profile__add-button');

    function createElement() {
      const element = {};
      element.name = placeInput.value;
      element.link = urlInput.value;
      return element;
    }

    function addFormSubmitHandler(evt) {
      evt.preventDefault();
      const newElement = createElement();
      addElementToElementsList(newElement);
      popupForm.reset();
    }

    addButton.addEventListener('click', () => openPopup(popupAddPlace));
    closeButton.addEventListener('click', () => closePopup(popupAddPlace));
    popupAddPlace.addEventListener('submit', (evt) => {addFormSubmitHandler(evt); closePopup(popupAddPlace)});
    popupAddPlace.addEventListener('click', (evt) => closePopupByClickOnOverlay(evt, popupAddPlace));
  }

  function addImagePopupEventsListeners() {
    const closeButton = popupImageContainer.querySelector('.popup__close-button');

    closeButton.addEventListener('click', () => closePopup(popupImageContainer));
  }

  addElementsFromInitialArray();
  addEditPopupEventsListneners();
  addAddPlacePopupEventsListneners();
  addImagePopupEventsListeners();
})
