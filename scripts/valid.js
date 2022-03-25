function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.form__input-error_type_${inputElement.id}`);
  inputElement.classList.add('form__input_invalid');
  errorElement.classList.add('form__input-error_visible');
  errorElement.textContent = errorMessage;
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.form__input-error_type_${inputElement.id}`);
  inputElement.classList.remove('form__input_invalid');
  errorElement.classList.remove('form__input-error_visible');
  errorElement.textContent = '';
};

export function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((field) => {
    return !field.validity.valid;
  })
}

export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit-button_inactive');
  } else {
    buttonElement.classList.remove('form__submit-button_inactive');
  }
}

