const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddPlace = document.querySelector('.popup_add-place');
const popupImage = document.querySelector('.popup_open-image');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonClosePlace = popupAddPlace.querySelector('.popup__button-close');
const buttonCloseProfile = popupEditProfile.querySelector('.popup__button-close');
const buttonCloseImage = popupImage.querySelector('.popup__button-close');
const buttonSaveCard = document.querySelector('#button-save-card');
const buttonSaveProfile = document.querySelector('#button-save-profile');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const formElement = document.querySelector('.popup__container');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
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

// загрузка карточек при старте
  initialPlaces.forEach(function (element) {
    const placeElement = placeTemplate.cloneNode(true);
  
    placeElement.querySelector('.place__name').textContent = element.name;
    placeElement.querySelector('.place__image').alt = element.name;
    placeElement.querySelector('.place__image').src = element.link;
    setEventListeners(placeElement);
  
    placesList.append(placeElement);
  });

// открытие попапов общая
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
const closePopup = (event) => {
    event.preventDefault();
    popupAddPlace.classList.remove('popup_opened');
    popupEditProfile.classList.remove('popup_opened');
    popupImage.classList.remove('popup_opened');
}

buttonClosePlace.addEventListener('click', closePopup);
buttonCloseProfile.addEventListener('click', closePopup);
buttonCloseImage.addEventListener('click', closePopup);

// сохранение профиля
function saveProfileHandler (event) {
    event.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(event);
}

buttonSaveProfile.addEventListener('click', saveProfileHandler);

// добавление разметки карточки
function addCard(cardName, cardLink) {
    const placeElement = placeTemplate.cloneNode(true);
    
    placeElement.querySelector('.place__name').textContent = cardName;
    placeElement.querySelector('.place__image').alt = cardName;
    placeElement.querySelector('.place__image').src = cardLink;
    
    setEventListeners(placeElement);
  
    placesList.prepend(placeElement);
  }
// сохранение карточки
buttonSaveCard.addEventListener('click', function (event) {
    event.preventDefault();
    const cardName = document.querySelector('#card-name');
    const cardLink = document.querySelector('.popup__input_type_link');

    addCard(cardName.value, cardLink.value);

    cardName.value = '';
    cardLink.value = '';
    closePopup(event);
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
    console.log('listener');
}
