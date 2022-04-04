const popupImageContainer = document.querySelector('.popup_type_photo');
const popupCaption = popupImageContainer.querySelector('.popup__caption');
const popupImage = popupImageContainer.querySelector('.popup__image');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc)
}

function closePopupByClickOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
  return;
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export { popupImageContainer, popupCaption, popupImage, openPopup, closePopup, closePopupByClickOnOverlay }
