import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserComtext";
import { DocPropsContext } from "../contexts/DocPropsContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { usePopups } from "../hooks/usePopups";
import Header from "./markup/Header";
import Main from "./markup/Main";
import paths from "../utils/paths";
import Login from "./markup/Login";
import Register from "./markup/Register";
import ProtectedRoute from "./elements/ProtectedRout";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userMail, setUserMail] = useState("");
  const [currentUser, setCurrentUser] = useState({ email: userMail });
  const [success, setSuccess] = useState(false);
  const [cards, setCards] = useState([]);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const navigate = useNavigate();
  const enableFormAndValidation = useFormAndValidation(currentUser);
  const enablePopups = usePopups(currentUser, enableFormAndValidation);
  const location = useLocation();
  const docProps = {
    ...enableFormAndValidation,
    ...enablePopups,
    loggedIn,
    ...paths,
    success,
    location,
  };

  const toggleSignUp = () => {
    navigate(location.pathname === paths.login ? paths.register : paths.login);
  };

  const togglePage = () => {
    docProps.resetForm();
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
      return api
        .getUserData()
        .then((data) => {
          setCurrentUser({ ...data, ...userMail });
        })
        .catch((err) => console.log(err));
    }
    return setCurrentUser({});
  };

  /** set cards array */
  const setInitialCards = () => {
    if (loggedIn) {
      return api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
    return setCards([]);
  };

  const handleLogin = (email) => {
    setLoggedIn(true);
    setUserMail(email);
    setUser();
    setInitialCards();
    docProps.resetForm();
    return;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
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
    const token = localStorage.getItem("token");
    if (token) {
      return auth
        .getContent(token)
        .then((res) => {
          setUserMail(res.data.email);
          return res.data.email ? setLoggedIn(true) : setLoggedIn(false);
        })
        .catch((err) => console.log(err));
    }
    return setLoggedIn(false);
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  /**  set current user and cards on loggedIn state change */
  useEffect(() => {
    if (loggedIn) {
      setUser();
      setInitialCards();
    }
  }, [loggedIn, setCurrentUser]);

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
        //return;
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
          return handleLogin(email);
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

  /** check card's owner */
  function checkIfOwner(owner) {
    return owner._id === currentUser._id;
  }

  /** check if card is liked */
  function chekIfLiked(card) {
    if (card.likes.length > 0) {
      return card.likes.some((owner) => checkIfOwner(owner));
    }
    return false;
  }

  const isLiked = (card) => chekIfLiked(card);
  const isOwn = (card) => checkIfOwner(card.owner);

  /** toggle card's isLiked state */
  const toggleLike = (card) => {
    if (!isLiked(card)) {
      return api.addLike(card._id);
    } else {
      return api.deleteLike(card._id);
    }
  };

  /** handle card's like button */
  const handleCardLike = (selectedCard) => {
    toggleLike(selectedCard)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === selectedCard._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.log(error));
  };

  /** handle card delete */
  function handleCardDelete() {
    api
      .deleteCard(docProps.selectedCard._id)
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
    return (
      typeof data === "string" ? api.editAvatar(data) : api.editProfile(data)
    )
      .then((values) => {
        setCurrentUser(values);
        docProps.closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  /** handle submit add new card */
  const handleSubmitAddCard = (data) => {
    return api
      .addCard(data)
      .then((value) => updateCards(value))
      .then(() => docProps.closeAllPopups())
      .catch((err) => console.log(err));
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
                    handleLogin={handleLogin}
                    handleLogout={handleLogout}
                    toggleHamburgerClicked={toggleHamburgerClicked}
                    hamburgerClicked={hamburgerClicked}
                    setHamburgerClicked={setHamburgerClicked}
                    userMail={userMail}
                    currentUser={currentUser}
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
                />
                }
              />
                <Route
                  path={paths.main}
                  element={
                    <Main
                      setSelectedCard={docProps.setSelectedCard}
                      cards={cards}
                      isLiked={isLiked}
                      isOwn={isOwn}
                      handleSubmit={handleSubmitProfile}
                      handleSubmitAdd={handleSubmitAddCard}
                      handleCardLike={handleCardLike}
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
          </div>
        </DocPropsContext.Provider>
      </CurrentUserContext.Provider>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default App;
