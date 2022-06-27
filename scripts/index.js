let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_type_name');
let aboutInput = document.querySelector('.popup__input_type_about');
let formElement = document.querySelector('.popup__container');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
const placesList = document.querySelector('.places__list');
const placeTemplate = document.querySelector('.place-template').content;

const initialPlaces = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  initialPlaces.forEach(function (element) {
    const placeElement = placeTemplate.cloneNode(true);
  
    placeElement.querySelector('.place__name').textContent = element.name; // Укажите здесь значение поля name каждого перебираемого элемента;
    placeElement.querySelector('.place__image').alt = element.name; // Укажите здесь значение поля career каждого перебираемого элемента;
    placeElement.querySelector('.place__image').src = element.link; // Укажите здесь значение поля films каждого перебираемого элемента;
  
    placesList.append(placeElement);
  
  });


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function openPopup(event) {
    event.preventDefault()
    popup.classList.add('popup_opened')
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

function closePopup(event) {
    event.preventDefault()
    popup.classList.remove('popup_opened')
}

function formSubmitHandler (event) {
    event.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(event);
}

formElement.addEventListener('submit', formSubmitHandler);