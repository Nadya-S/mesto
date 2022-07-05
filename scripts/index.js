const editProfileModal = document.querySelector('.popup_edit-profile');
const addPlaceModal = document.querySelector('.popup_add-place');
const imageModal = document.querySelector('.popup_open-image');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonPlace = addPlaceModal.querySelector('.popup__button-close');
const closeButtonProfile = editProfileModal.querySelector('.popup__button-close');
const closeButtonImage = imageModal.querySelector('.popup__button-close');
const popup = document.querySelector('.popup');
const nameInput = document.querySelector('.popup__input_type_name');
const aboutInput = document.querySelector('.popup__input_type_about');
const formElement = document.querySelector('.popup__container');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const placesList = document.querySelector('.places__list');
const placeTemplate = document.querySelector('.place-template').content;
const saveCardButton = document.querySelector('#button-save-card');
const saveProfileButton = document.querySelector('#button-save-profile');

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
   openModalWindow(editProfileModal);
   nameInput.value = profileName.textContent;
   aboutInput.value = profileAbout.textContent;
}

editButton.addEventListener('click', handleEditProfile);
addButton.addEventListener('click', () => openModalWindow(addPlaceModal));

// закрытие попапов
const closePopup = (event) => {
    event.preventDefault();
    addPlaceModal.classList.remove('popup_opened');
    editProfileModal.classList.remove('popup_opened');
    imageModal.classList.remove('popup_opened');
}

closeButtonPlace.addEventListener('click', closePopup);
closeButtonProfile.addEventListener('click', closePopup);
closeButtonImage.addEventListener('click', closePopup);

// сохранение профиля
function saveProfileHandler (event) {
    event.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(event);
}

saveProfileButton.addEventListener('click', saveProfileHandler);

// добавление разметки карточки
function addCard(cardName, cardLink) {
    const placeElement = placeTemplate.cloneNode(true);
    
    placeElement.querySelector('.place__name').textContent = cardName;
    placeElement.querySelector('.place__image').alt = cardName;
    placeElement.querySelector('.place__image').src = cardLink;
    //сет
    setEventListeners(placeElement);
  
    placesList.prepend(placeElement);
  }
// сохранение карточки
saveCardButton.addEventListener('click', function (event) {
    event.preventDefault();
    const cardName = document.querySelector('#card-name');
    const cardLink = document.querySelector('.popup__input_type_link');

    addCard(cardName.value, cardLink.value);

    cardName.value = '';
    cardLink.value = '';
    closePopup(event);
  });

  // enter
//   nameInput.addEventListener('keydown', function(event){
//     alert(event.keyCode);
// } );

// удаление карточки 
function handleDelete(evt) {
	evt.target.closest('.place').remove();
}

//функция лайка 
function handleLike(evt) {
  evt.target.classList.toggle('place__like-button_active');
}

//открытие попапа с картинкой
function openImageModal (evt) {
      imageModal.classList.add('popup_opened');
      handleOpenImage(evt.target.alt, evt.target.src);
  }

//open image
function handleOpenImage (name, link) {
  imageModal.querySelector('.popup_img-name').textContent = name;
  imageModal.querySelector('.popup__big-image').src = link;
}

//set events 
function setEventListeners (placeElement) {
    const deleteCardButton = placeElement.querySelector('.place__delete-button')
    deleteCardButton.addEventListener('click', handleDelete);
    const likeCardButton = placeElement.querySelector('.place__like-button');
    likeCardButton.addEventListener('click', handleLike);

    const imageButton = placeElement.querySelector('.place__image');
    imageButton.addEventListener('click', openImageModal);
    console.log('listener');
}
