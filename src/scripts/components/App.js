import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth"
import {
  CurrentUserContext,
  getCurrentUser,
} from "../contexts/CurrentUserContext";
import { CurrentPropsContext } from "../contexts/CurrentPropsContext";
import Header from "./main/Header";
import Main from "./main/Main";
import Footer from "./main/Footer";
import ImagePopup from "./popups/ImagePopup";
import EditProfilePopup from "./popups/EditProfilePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import AddPlacePopup from "./popups/AddPlacePopup";
import AlertPopup from "./popups/AlertPopup";
import Loading from "./Loading";
import Login from "./authorisation/Login";
import Register from "./authorisation/Register";
import ProtectedRoute from "./protected/ProtectedRoute";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import paths from "../utils/paths";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useState({ token: localStorage.getItem("token") })
  const [userMail, setUserMail] = useState("")
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [headerText, setHeaderText] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [buttonText, setButtonText] = useState("Save");
  const [buttonOff, setButtonOff] = useState(true);
  const currentProps = {
    userMail,
    userToken,
    handleLogin,
    history,
    loggedIn,
    setLoggedIn,
    setHeaderText,
    headerText,
    isAlert,
    isOpen,
    setIsOpen,
    selectedCard,
    handleClosePopups,
    buttonText,
    setButtonText,
    buttonOff,
    ...useFormAndValidation(),
    ...paths,
  };

  useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(getCurrentUser(data));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setHeaderText(
      loggedIn
        ? { name: currentUser ? currentUser.name : "", link: "Log out" }
        : { name: "", link: "Sign Up" }
    );
  }, [currentUser, loggedIn]);

  useEffect(() => {
    return function tokenCheck() {
      // if the user has a token in localStorage,
      // this function will check that the user has a valid token
      const token = localStorage.getItem('token');
      if (token) {
        // we'll verify the token
        auth.getContent(token).then((res) => {
          if (res) {
            // we can get the user data here!
                        // let's put it in the state inside App.js
            setLoggedIn(true)
            setUserMail(res.data.email)
            history.push(paths.main);
            console.log(res.data.email)

          }
        });
      }
    }
  }, [])

  useEffect(() => {
    if (isAlert) {
      setButtonOff(false);
    } else {
      if (currentProps.isValid) {
        setButtonOff(false);
      } else {
        setButtonOff(true);
      }
    }
  }, [isAlert, currentProps.isValid]);

  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape" && loggedIn) {
        handleClosePopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, handleClosePopups, loggedIn]);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleClosePopups() {
    setIsOpen(false);
    setIsAlert(false);
    history.goBack();
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

  function handleCardClick(card) {
    setSelectedCard({ ...card });
    setIsOpen(true);
    console.log(userToken)
  }

  function handleAlertPopupOpen(card) {
    setSelectedCard(card);
    setIsOpen(true);
    setIsAlert(true);
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
        handleClosePopups();
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(updateData, setState) {
    setButtonText(renderLoading(true));
    updateData
      .then((value) => {
        setState(value);
        handleClosePopups();
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
            <ProtectedRoute path={paths.main} loggedIn={loggedIn}>
              <Main
                cards={cards}
                onCardLike={handleCardLike}
                handleCardClick={handleCardClick}
                handleAlertPopupOpen={handleAlertPopupOpen}
              />
            </ProtectedRoute>
            <Route path={paths.login}>
              <Login />
            </Route>
            <Route path={paths.register}>
              <Register />
            </Route>
            <Switch>
              <ProtectedRoute exact path={paths.avatar} loggedIn={loggedIn}>
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} />
              </ProtectedRoute>
              <ProtectedRoute path={paths.profile} loggedIn={loggedIn}>
                <EditProfilePopup onUpdateUser={handleUpdateUser} />
              </ProtectedRoute>
              <ProtectedRoute path={paths.create} loggedIn={loggedIn}>
                <AddPlacePopup handleAddPlaceSubmit={handleAddPlaceSubmit} />
              </ProtectedRoute>
              <ProtectedRoute path={paths.delete} loggedIn={loggedIn}>
                <AlertPopup
                  handleCardDelete={handleCardDelete}
                  selectedCard={selectedCard}
                />
              </ProtectedRoute>
              <ProtectedRoute path={paths.image} loggedIn={loggedIn}>
                <ImagePopup
                  src={selectedCard ? selectedCard.link : ""}
                  alt={selectedCard ? selectedCard.name : ""}
                />
              </ProtectedRoute>
              <Route path={paths.home}>
                <Redirect to={loggedIn ? paths.main : paths.login} />
              </Route>
              <Route path={paths.default}></Route>
            </Switch>
            <Footer loggedIn={loggedIn} />
          </div>
        </CurrentPropsContext.Provider>
      </CurrentUserContext.Provider>
    );
  } else {
    return <Loading />;
  }
}

export default App;
