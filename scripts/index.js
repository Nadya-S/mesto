const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPlace = document.querySelector('.popup_add-place');
const popupImage = document.querySelector('.popup_open-image');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const formElement = document.querySelector('.popup__container');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const placesList = document.querySelector('.places__list');
const placeTemplate = document.querySelector('.place-template').content;
const placeForm = document.querySelector('#placeform');

// загрузка карточек при старте
  initialPlaces.forEach(function (element) {
    addCard(element.name, element.link);
  });

// открытие попапов общая ОК
const openModalWindow = (popup) => {
    popup.classList.add('popup_opened');
 }

// открытие попапа профиля и заполнение полей
const handleEditProfile = () => {
   openModalWindow(popupEditProfile);
   nameInput.value = profileName.textContent;
   aboutInput.value = profileAbout.textContent;
}

buttonEdit.addEventListener('click', handleEditProfile);
buttonAdd.addEventListener('click', () => openModalWindow(popupAddPlace));

// закрытие попапов
const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

const buttonsClose = document.querySelectorAll('.popup__button-close');
buttonsClose.forEach((buttonsClose) => { 
    const popup = buttonsClose.closest('.popup'); 
    buttonsClose.addEventListener('click', () => closePopup(popup)); 
});

// сохранение профиля
function saveProfileHandler (event) {
    event.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEditProfile);
}

formElement.addEventListener('submit', saveProfileHandler);

//функция создания карточки
function renderCard(cardName, cardLink) {
  const placeElement = placeTemplate.cloneNode(true);
    
    placeElement.querySelector('.place__name').textContent = cardName;
    placeElement.querySelector('.place__image').alt = cardName;
    placeElement.querySelector('.place__image').src = cardLink;
    
    setEventListeners(placeElement);
    return placeElement;
}

// добавление разметки карточки
function addCard(cardName, cardLink) {
    const newCard = renderCard(cardName, cardLink);
    placesList.prepend(newCard);
  }
  
// сохранение карточки
placeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const cardName = document.querySelector('#card-name');
    const cardLink = document.querySelector('.popup__input_type_link');

    addCard(cardName.value, cardLink.value);
    placeForm.reset();
    closePopup(popupAddPlace);
  });

// удаление карточки 
function handleDelete(evt) {
	evt.target.closest('.place').remove();
}

//функция лайка 
function handleLike(evt) {
  evt.target.classList.toggle('place__like-button_active');
}

//открытие попапа с картинкой
function openPopupImage (evt) {
      popupImage.classList.add('popup_opened');
      handleOpenImage(evt.target.alt, evt.target.src);
  }

//open image
function handleOpenImage (name, link) {
  popupImage.querySelector('#popup_img-name').textContent = name;
  popupImage.querySelector('.popup__big-image').alt = name;
  popupImage.querySelector('.popup__big-image').src = link;
}

//set events 
function setEventListeners (placeElement) {
    const deleteCardButton = placeElement.querySelector('.place__delete-button')
    deleteCardButton.addEventListener('click', handleDelete);
    const likeCardButton = placeElement.querySelector('.place__like-button');
    likeCardButton.addEventListener('click', handleLike);
    const imageButton = placeElement.querySelector('.place__image');
    imageButton.addEventListener('click', openPopupImage);
}
