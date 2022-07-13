import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";

function Header(props) {
  const location = useLocation();
  const currentProps = React.useContext(CurrentPropsContext);
  function handleClicK() {
    currentProps.headerText.link =
      location.pathname === currentProps.login ? "Log in" : "Sign up";
    currentProps.resetForm();
    currentProps.setLoggedIn(false)
  }

  return (
    <header className="header">
      <div className="logo" id="logo"></div>
      <div className="header__text">
      <p className="header__link header__user">{currentProps.headerText.name}</p>
      <Link
        to={
          currentProps.loggedIn
            ? currentProps.login
            : location.pathname === currentProps.login
            ? currentProps.register
            : currentProps.login
        }
      >
        <p className="header__link hover-opacity" onClick={handleClicK}>
          {currentProps.headerText.link}
        </p>
      </Link>
      </div>
    </header>
  );
}

export default Header;
