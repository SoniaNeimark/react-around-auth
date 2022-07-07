import React from "react";
import api from "../utils/api.js";
import {
  CurrentUserContext,
  getCurrentUser,
} from "../contexts/CurrentUserContext.js";
import { CurrentPropsContext } from "../contexts/CurrentPropsContext.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import AlertPopup from "./AlertPopup.js";
import Loading from "./Loading.js";
import { useFormAndValidation } from "../hooks/useFormAndValidation.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [buttonText, setButtonText] = React.useState("Save");
  const [buttonOff, setButtonOff] = React.useState(true);
  const currentProps = {
    onClose: closeAllPopups,
    buttonText: buttonText,
    buttonOff: buttonOff,
    ...useFormAndValidation(),
  };

  React.useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(getCurrentUser(data));
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (isAddPlacePopupOpen) {
      setButtonText("Create");
    } else {
      if (isAlertPopupOpen) {
        setButtonText("Yes");
      } else {
        setButtonText("Save");
      }
    }
  }, [isAddPlacePopupOpen, isAlertPopupOpen]);

  React.useEffect(() => {
    if (isAlertPopupOpen) {
      setButtonOff(false);
    } else {
      if (currentProps.isValid) {
        setButtonOff(false);
      } else {
        setButtonOff(true);
      }
    }
  }, [isAlertPopupOpen, currentProps.isValid]);

  React.useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsAlertPopupOpen(false);
    currentProps.resetForm();
  }

  function toggleLike(card, isLiked) {
    if (!isLiked) {
      return api.addLike(card._id);
    } else {
      return api.deleteLike(card._id);
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    toggleLike(card, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => {
            return currentCard !== card;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(updateData, setState) {
    setButtonText(renderLoading(true));
    updateData
      .then((value) => {
        setState(value);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setButtonText(renderLoading(false, buttonText));
      });
  }

  function handleUpdateAvatar(props) {
    handleSubmit(api.editAvatar(props), setCurrentUser);
  }

  function handleUpdateUser(props) {
    handleSubmit(api.editProfile(props), setCurrentUser);
  }

  function handleAddPlaceSubmit(props) {
    handleSubmit(api.addCard(props), updateCards);
  }

  function updateCards(value) {
    setCards([value, ...cards]);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(evt) {
    setIsImagePopupOpen(true);
    setSelectedCard(evt.target);
  }

  function handleDeleteCardClick() {
    setIsAlertPopupOpen(true);
  }

  function renderLoading(isLoading, buttonText) {
    if (isLoading) {
      return "Saving...";
    } else {
      return buttonText;
    }
  }

  if (currentUser) {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentPropsContext.Provider value={currentProps}>
          <div className="page__content">
            <Header />

            <Main
              setIsEditProfilePopupOpen={handleEditProfileClick}
              setIsAddPlacePopupOpen={handleAddPlaceClick}
              setIsEditAvatarPopupOpen={handleEditAvatarClick}
              setIsImagePopupOpen={handleCardClick}
              setIsAlertPopupOpen={handleDeleteCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              setSelectedCard={setSelectedCard}
              selectedCard={selectedCard}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onAddCard={handleAddPlaceSubmit}
            />

            <AlertPopup
              handleCardDelete={handleCardDelete}
              isOpen={isAlertPopupOpen}
              selectedCard={selectedCard}
            />

            <ImagePopup
              isOpen={isImagePopupOpen}
              src={selectedCard.src}
              alt={selectedCard.alt}
            />

            <Footer />
          </div>
        </CurrentPropsContext.Provider>
      </CurrentUserContext.Provider>
    );
  } else {
    return <Loading />;
  }
}

export default App;
