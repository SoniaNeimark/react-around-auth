import React , { useContext, useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth";
import {
  CurrentUserContext,
  getCurrentUser
} from "../contexts/CurrentUserContext";
import { CurrentPropsContext } from "../contexts/CurrentPropsContext";
import { useCurrentProps } from "../hooks/useCurrentProps";
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
import InfoTooltip from "./popups/InfoTooltip";
import ProtectedRoute from "./protected/ProtectedRoute";
import paths from "../utils/paths";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const currentProps = {
    ...useCurrentProps(),
    ...paths
  };

  useEffect(() => {
    api
      .getUserData()
      .then(data => {
        setCurrentUser(getCurrentUser(data));
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    return function() {
      const token = localStorage.getItem("token");
      if (token) {
        auth
          .getContent(token)
          .then(res => {
            if (res) {
              currentProps.setLoggedIn(true);
              currentProps.setUserMail(res.data.email);
              currentProps.history.push(paths.main);
            }
            return;
          })
          .catch(err => console.log(err));
      }
    };
  }, []);

  useEffect(() => {
    if (currentProps.isValid) {
      currentProps.setButtonOff(false);
    } else {
      currentProps.setButtonOff(true);
    }
  }, [currentProps.isValid]);

  useEffect(() => {
    const closeByEscape = evt => {
      if (evt.key === "Escape") {
        if (!currentProps.loggedIn) {
          currentProps.handleCloseInfoTooltip();
        } else {
          currentProps.handleClosePopups();
        }
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [
    currentProps.loggedIn,
    currentProps.handleCloseInfoTooltip,
    currentProps.handleClosePopups
  ]);

  function toggleLike(card, isLiked) {
    if (!isLiked) {
      return api.addLike(card._id);
    } else {
      return api.deleteLike(card._id);
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    toggleLike(card, isLiked)
      .then(newCard => {
        setCards(state =>
          state.map(currentCard =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(err => console.log(err));
  }

  function handleCardClick(card) {
    currentProps.setSelectedCard({ ...card });
    currentProps.setIsOpen(true);
  }

  function handleAlertPopupOpen(card) {
    currentProps.setSelectedCard(card);
    currentProps.setIsOpen(true);
    currentProps.setIsAlert(true);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(state =>
          state.filter(currentCard => {
            return currentCard !== card;
          })
        );
        currentProps.handleClosePopups();
      })
      .catch(err => console.log(err));
  }

  function handleSubmit(updateData, setState) {
    currentProps.setButtonText(renderLoading(true));
    updateData
      .then(value => {
        setState(value);
        currentProps.handleClosePopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        currentProps.setButtonText(
          renderLoading(false, currentProps.buttonText)
        );
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
            <ProtectedRoute path={paths.main}>
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
              <Route path={paths.inalert}>
                <InfoTooltip />
              </Route>
              <Route path={paths.upalert}>
                <InfoTooltip />
              </Route>
            </Switch>
            <Switch>
              <ProtectedRoute exact path={paths.avatar}>
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} />
              </ProtectedRoute>
              <ProtectedRoute path={paths.profile}>
                <EditProfilePopup onUpdateUser={handleUpdateUser} />
              </ProtectedRoute>
              <ProtectedRoute path={paths.create}>
                <AddPlacePopup handleAddPlaceSubmit={handleAddPlaceSubmit} />
              </ProtectedRoute>
              <ProtectedRoute path={paths.delete}>
                <AlertPopup handleCardDelete={handleCardDelete} />
              </ProtectedRoute>
              <ProtectedRoute path={paths.image}>
                <ImagePopup />
              </ProtectedRoute>
              <Route path={paths.home}>
                <Redirect
                  to={currentProps.loggedIn ? paths.main : paths.login}
                />
              </Route>
              <Route path={paths.default}></Route>
            </Switch>
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
