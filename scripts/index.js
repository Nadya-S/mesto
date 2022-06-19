let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__button-close');
let saveButton = document.querySelector('.popup__button-save');
let popup = document.querySelector('.popup');
let editForm = document.querySelector('.profile__edit-form');
let nameInput = document.querySelector('.popup__input-name');
let aboutInput = document.querySelector('.popup__input-about');
let formElement = document.querySelector('.popup__container');

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function openPopup(event) {
    event.preventDefault()
    popup.classList.add('popup_opened')
    let profileName = document.querySelector('.profile__name').textContent;
    let profileAbout = document.querySelector('.profile__about').textContent;
    nameInput.value = profileName;
    aboutInput.value = profileAbout;
}

function closePopup(event) {
    event.preventDefault()
    popup.remove('popup_opened')
}

function formSubmitHandler (event) {
    event.preventDefault(); 
    let nameValue = document.querySelector('.popup__input-name').value;
    let aboutValue = document.querySelector('.popup__input-about').value;
    let profileName = document.querySelector('.profile__name');
    let profileAbout = document.querySelector('.profile__about');

    profileName.textContent = nameValue;
    profileAbout.textContent = aboutValue;
    closePopup(event);
}

formElement.addEventListener('submit', formSubmitHandler);