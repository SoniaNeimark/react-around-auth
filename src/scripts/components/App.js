import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { DocPropsContext } from "../contexts/DocPropsContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { usePopups } from "../hooks/usePopups";
import Header from "./markup/Header";
import Main from "./markup/Main";
import Footer from "./markup/Footer";
import paths from "../utils/paths";
import Login from "./markup/Login";
import Register from "./markup/Register";
import ProtectedRoute from "./elements/ProtectedRout";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState({});
  const [success, setSuccess] = useState(false);
  const [cards, setCards] = useState([]);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const navigate = useNavigate();
  const enableFormAndValidation = useFormAndValidation();
  const enablePopups = usePopups(currentUser, enableFormAndValidation);
  const location = useLocation();
  /** toggle card's isLiked state*/
  const toggleLike = (card, isLiked) => {
    if (!isLiked) {
      return api.addLike(card._id, token);
    }
    return api.deleteLike(card._id, token);
  };

  /** handle card's like button */
  const handleCardLike = (selectedCard, isLiked) => {
    toggleLike(selectedCard, isLiked)
      .then((newCard) => {
        selectedCard.likes = newCard.likes;
        return selectedCard;
      })
      .catch((error) => console.log(error.message))
      .finally(() => setInitialCards())
  };

  function checkIfOwner(owner) {
    return owner === currentUser._id;
  }
  const docProps = {
    ...enableFormAndValidation,
    ...enablePopups,
    loggedIn,
    ...paths,
    success,
    location,
    handleCardLike,
    checkIfOwner,
  };

  const toggleSignUp = () => {
    navigate(location.pathname === paths.login ? paths.register : paths.login);
  };

  const togglePage = () => {
    docProps.resetForm();
    if (loggedIn) {
      handleLogout();
      toggleSignUp();
      return;
    }
    toggleSignUp();
    return;
  };

  const toggleLoggedIn = () => {
    navigate(loggedIn ? paths.main : paths.login);
  };

  /** assign "page" class to document.body */
  useEffect(() => {
    document.body.classList.add("page");
  }, []);

  /** set loggedIn state */
  useEffect(() => {
    toggleLoggedIn();
  }, [loggedIn]);

  /** set current user data depending on logged in state */
  const setUser = () => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      return api
        .getUserData(token)
        .then((data) => {
          setCurrentUser({ ...data });
        })
        .catch((err) => console.log(err));
    }
    return setCurrentUser({});
  };

  /** set cards array */
  const setInitialCards = () => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      return api
        .getInitialCards(token)
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
    return setCards([]);
  };

  const handleLogin = () => {
    setToken(localStorage.getItem("token"))
    setLoggedIn(true);
    docProps.resetForm();
    return;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    return;
  };

  /** handle infoTooltip click */
  const handleSigninAlertClick = () => {
    if (success) {
      docProps.closePopup();
      navigate(paths.login);
    } else {
      return docProps.closeAllPopups();
    }
  };

  const tokenCheck = () => {
    if (token) {
      return api
        .getUserData(token)
        .then((res) => {
          return res.email ? true : false;
        })
        .catch((err) => console.log(err));
    }
    return false;
  };

  useEffect(() => {
    setLoggedIn(tokenCheck());
  }, []);

  /**  set current user and cards on loggedIn state change */
  useEffect(() => {
    if (loggedIn) {
      setUser();
    }
    return
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      setInitialCards();
    }
    return
  }, [loggedIn]);

  /** handle close popup by "Escape" key */
  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        docProps.closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  /** handle submit sign-up form */
  function handleSubmitRegister(email, password) {
    if (!email || !password) {
      return;
    }
    auth
      .register(email, password)
      .then((res) => {
        if (!res.error) {
          setSuccess(true);
          docProps.setValues({
            password: password,
            email: email,
          });
          return docProps.setPopup("signuppopup");
        }
        setSuccess(false);
        return docProps.setPopup("signuppopup");
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          setSuccess(false);
          return docProps.setPopup("signuppopup");
        }
      });
  }

  /** handle submit sign-in form */
  function handleSubmitLogin(email, password) {
    if (!email || !password) {
      return;
    }
    return auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          return handleLogin();
        }
        return;
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          return docProps.setPopup("signinpopup");
        }
      });
  }
  /** show/hide humburger-menu button */
  const toggleHamburgerClicked = () => {
    if (hamburgerClicked) {
      return setHamburgerClicked(false);
    }
    return setHamburgerClicked(true);
  };

  /** handle card delete */
  function handleCardDelete() {
    const token = localStorage.getItem("token");
    api
      .deleteCard(docProps.selectedCard._id, token)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => {
            return currentCard !== docProps.selectedCard;
          })
        );
        docProps.closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  /** handle submit profile data */
  const handleSubmitProfile = (data) => {
    const token = localStorage.getItem("token");
    return (
      typeof data === "string"
        ? api.editAvatar(data, token)
        : api.editProfile(data, token)
    )
      .then((values) => {
        setCurrentUser(values);
        setUser();
        return;
      })
      .catch((err) => console.log(err))
      .finally(() => docProps.closeAllPopups());
  };

  /** handle submit add new card */
  const handleSubmitAddCard = (data) => {
    const token = localStorage.getItem("token");
    return api
      .addCard(data, token)
      .then((value) => updateCards(value.data))
      .catch((err) => console.log(err))
      .finally(() => docProps.closeAllPopups());
  };

  function updateCards(value) {
    setCards([value, ...cards]);
  }

  if (currentUser) {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <DocPropsContext.Provider value={docProps}>
          <div className="page__content">
            <Header
              location={location}
              navigate={navigate}
              login={paths.login}
              main={paths.main}
              register={paths.register}
              signin={paths.login}
              loggedIn={loggedIn}
              toggleHamburgerClicked={toggleHamburgerClicked}
              hamburgerClicked={hamburgerClicked}
              setHamburgerClicked={setHamburgerClicked}
              currentUser={currentUser}
              userMail={currentUser.email}
              onClose={() => setHamburgerClicked(false)}
              onOpen={() => setHamburgerClicked(true)}
              togglePage={togglePage}
            />
            <Routes>
              <Route
                path={paths.home}
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    main={paths.main}
                    login={paths.login}
                  >
                    <Main
                      setSelectedCard={docProps.setSelectedCard}
                      cards={cards}
                      handleSubmit={handleSubmitProfile}
                      handleSubmitAdd={handleSubmitAddCard}
                      handleCardDelete={handleCardDelete}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path={paths.main}
                element={
                  <Main
                    setSelectedCard={docProps.setSelectedCard}
                    cards={cards}
                    handleSubmit={handleSubmitProfile}
                    handleSubmitAdd={handleSubmitAddCard}
                    handleCardDelete={handleCardDelete}
                  />
                }
              />
              <Route
                path={paths.login}
                element={
                  <Login
                    onClick={handleSigninAlertClick}
                    togglePage={togglePage}
                    onSubmit={handleSubmitLogin}
                  />
                }
              />
              <Route
                path={paths.register}
                element={
                  <Register
                    togglePage={togglePage}
                    onClick={handleSigninAlertClick}
                    onSubmit={handleSubmitRegister}
                  />
                }
              />
              <Route path={paths.default} element={<h1>Wrong request</h1>} />
            </Routes>
            {loggedIn ? <Footer /> : null}
          </div>
        </DocPropsContext.Provider>
      </CurrentUserContext.Provider>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default App;
