export default class FormValidator {
  constructor(validConfig, formElement) {
    this.validConfig = validConfig,
    this.formElement = formElement;
    this.hasSetEvents = false;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.form__input-error_type_${inputElement.id}`);
    inputElement.classList.add(this.validConfig.inputErrorClass);
    errorElement.classList.add(this.validConfig.errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.form__input-error_type_${inputElement.id}`);
    inputElement.classList.remove(this.validConfig.inputErrorClass);
    errorElement.classList.remove(this.validConfig.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners(inputList, buttonElement) {
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    this.hasSetEvents = true;
  };

  enableValidation() {
    const inputList = Array.from(this.formElement.querySelectorAll(this.validConfig.inputSelector));
    const buttonElement = this.formElement.querySelector(this.validConfig.submitButtonSelector);
    if (!this.hasSetEvents) {
      this.formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(inputList, buttonElement);
    } else {
      this._toggleButtonState(inputList, buttonElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((field) => {
      return !field.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.validConfig.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.validConfig.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
}
