export const validationStates = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_visible'
}

function showInputError(errorElement, inputElement, errorMessage, validObj) {
  inputElement.classList.add(validObj.inputErrorClass);
  errorElement.classList.add(validObj.errorClass);
  errorElement.textContent = errorMessage;
};

function hideInputError(errorElement, inputElement, validObj) {
  inputElement.classList.remove(validObj.inputErrorClass);
  errorElement.classList.remove(validObj.errorClass);
  errorElement.textContent = '';
};

export function checkInputValidity(formElement, inputElement, validObj) {
  const errorElement = formElement.querySelector(`.form__input-error_type_${inputElement.id}`);
  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement, inputElement.validationMessage, validObj);
  } else {
    hideInputError(errorElement, inputElement, validObj);
  }
};

function setEventListeners(formElement, validObj) {
  const inputList = Array.from(formElement.querySelectorAll(validObj.inputSelector));
  const buttonElement = formElement.querySelector(validObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validObj);
      toggleButtonState(inputList, buttonElement, validObj);
    });
  });
};

export function enableValidation(validObj) {
  const formList = Array.from(document.querySelectorAll(validObj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validObj);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((field) => {
    return !field.validity.valid;
  })
}

export function toggleButtonState(inputList, buttonElement, validObj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validObj.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validObj.inactiveButtonClass);
  }
}

