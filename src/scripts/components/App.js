import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userMail, setUserMail] = useState("");
  const [success, setSuccess] = useState(true);
  const [cards, setCards] = useState([]);
  const [signUp, setSignUp] = useState(false);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  const navigate = useNavigate();
  const enableFormAndValidation = useFormAndValidation(currentUser);
  const enablePopups = usePopups(currentUser, enableFormAndValidation);
  const docProps = {
    ...enableFormAndValidation,
    ...enablePopups,
    loggedIn,
    ...paths,
    success,
  };

  const toggleSignUp = () => {
    !signUp ? setSignUp(true) : setSignUp(false);
  };

  const togglePage = () => {
    toggleSignUp();
    docProps.resetForm();
  };

  useEffect(() => {
    loggedIn
      ? navigate(paths.main)
      : signUp
      ? navigate(paths.register)
      : navigate(paths.login);
  }, [loggedIn, signUp, setSignUp, setLoggedIn, navigate]);

  /** assign "page" class to document.body */
  useEffect(() => {
    document.body.classList.add("page");
  }, []);

  const setUser = () => {
    if (loggedIn) {
      return api
        .getUserData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
    return;
  };

  const setInitialCards = () => {
    if (loggedIn) {
      return api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
    return;
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    setCurrentUser({});
    setCards([]);
    docProps.resetForm();
    setHamburgerClicked(false);
  };

  const handleSigninAlertClick = () => {
    if (success) {
      docProps.closePopup();
      setSignUp(false);
      console.log(docProps.values);
      //navigate(paths.login)
    } else {
      return docProps.closeAllPopups();
    }
  };

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth.getContent(token).then((res) => {
        if (res) {
          setUserMail(res.data.email);
          handleLogin();
          console.log(res.data);
        }
      });
    }
  };
  useEffect(() => {
    console.log("check");
    return tokenCheck();
  }, [setLoggedIn]);

  /**  set current user */
  useEffect(() => {
    setUser();
  }, [setCurrentUser, loggedIn]);

  /** set cards list for gallery */
  useEffect(() => {
    setInitialCards();
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
  }, [docProps.popup, docProps.closeAllPopups]);

  function handleSubmitRegister(e, email, password) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    //console.log(user.email, user.password)
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          console.log(res);
          setSuccess(true);
          docProps.setValues({
            ...docProps.values,
            password: password,
            email: email,
          });
          return docProps.openPopup(e);

          //navigate(paths.login);
        } else {
          throw new Error("Nooo");
        }
      })
      .catch((err) => {
        console.log("Wrong" + err);
        setSuccess(false);
        return docProps.openPopup(e);
      });
  }

  function handleSubmitLogin(e, email, password) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          console.log(data.token);
          tokenCheck();
          navigate(paths.main);
          docProps.resetForm();
        } else {
          throw new Error("ERRRR");
        }
      })
      .catch((err) => {
        setSuccess(false);
        console.log(err);
        return docProps.openPopup(e);
      });
  }

  const toggleHamburgerClicked = () => {
    if (hamburgerClicked) {
      return setHamburgerClicked(false);
    }
    return setHamburgerClicked(true);
  };

  function checkIfOwner(owner) {
    return owner._id === currentUser._id;
  }

  function chekIfLiked(card) {
    if (card.likes.length > 0) {
      return card.likes.some((owner) => checkIfOwner(owner));
    }
    return false;
  }

  const isLiked = (card) => chekIfLiked(card);
  const isOwn = (card) => checkIfOwner(card.owner);

  const toggleLike = (card) => {
    if (!isLiked(card)) {
      return api.addLike(card._id);
    } else {
      return api.deleteLike(card._id);
    }
  };

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
              login={paths.login}
              loggedIn={loggedIn}
              signUp={signUp}
              setSignUp={setSignUp}
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
                    onButtonClick={(e) => {
                      handleSubmitLogin(
                        e,
                        docProps.values["email"],
                        docProps.values["password"]
                      );
                    }}
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  />
                }
              />
              <Route
                path={paths.register}
                element={
                  <Register
                    onClick={handleSigninAlertClick}
                    togglePage={togglePage}
                    onButtonClick={(e) => {
                      handleSubmitRegister(
                        e,
                        docProps.values["email"],
                        docProps.values["password"]
                      );
                    }}
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  />
                }
              />
              <Route path="*" element={<h1>Wrong request</h1>} />
            </Routes>
          </div>
        </DocPropsContext.Provider>
      </CurrentUserContext.Provider>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

/**/

export default App;
