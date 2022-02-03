document.addEventListener('DOMContentLoaded', function() {
  const popup = document.querySelector('.popup');
  const popupForm = popup.querySelector('.popup__form');
  const nameInput = popupForm.querySelector('.popup__form-item_type_name');
  const aboutInput = popupForm.querySelector('.popup__form-item_type_about');
  const closeButton = popupForm.querySelector('.popup__close-button');

  const profileName = document.querySelector('.profile__user-name');
  const profileAbout = document.querySelector('.profile__user-about');
  const editButton = document.querySelector('.profile__edit-button');

  function addHidden(){
    popup.classList.add('popup_hidden');
  }

  function putValue() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
  };

  function openPopup() {
    popup.classList.remove('popup_hidden');
    popup.classList.remove('popup_fade');
    popup.classList.add('popup_opened');
    putValue();
  }

  function closePopup() {
    popup.classList.remove('popup_opened');
    popup.classList.add('popup_fade');
    setTimeout(addHidden, 355);
  }

  function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup();
  }

  editButton.addEventListener('click', openPopup);
  closeButton.addEventListener('click', closePopup);
  popup.addEventListener('submit', formSubmitHandler);

})
