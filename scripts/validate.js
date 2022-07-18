const allSelectors = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'};

// функция показывающая ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(allSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(allSelectors.errorClass);
};

  // функция скрывающая ошибку
const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(allSelectors.inputErrorClass);
    errorElement.classList.remove(allSelectors.errorClass);
    errorElement.textContent = '';
};

//проверка на валидность
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      hideInputError(formElement, inputElement);
    }
};

//функция проверки наличия невалидного поля
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
  return !inputElement.validity.valid;
    })
};

//функция переключения кнопки сабмит
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(allSelectors.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(allSelectors.inactiveButtonClass);
    }
  }; 

// функция слушатели событий
const setEventListenersForm = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(allSelectors.inputSelector));
  const buttonElement = formElement.querySelector(allSelectors.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

//включить валидацию для всех форм
const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(allSelectors.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListenersForm(formElement);
    });
};

enableValidation();

