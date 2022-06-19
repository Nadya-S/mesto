let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__button-close');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_type_name');
let aboutInput = document.querySelector('.popup__input_type_about');
let formElement = document.querySelector('.popup__container');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');


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