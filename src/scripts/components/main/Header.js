import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";

function Header() {
  const currentProps = useContext(CurrentPropsContext);
  function handleSignOut() {
    currentProps.setLoggedIn(false);
    localStorage.removeItem("token");
    currentProps.resetLoginForm();
  }

  return (
    <header className="header">
      <div className="logo" id="logo"></div>
      <div className="header__group">
        <p className="header__text header__text_user">
          {currentProps.loggedIn ? currentProps.userMail : ""}
        </p>
        <Link
          to={
            currentProps.location.pathname === currentProps.login
              ? currentProps.register
              : currentProps.login
          }
        >
          <p
            className={`header__text${
              !currentProps.loggedIn ? " header__text_unsigned" : ""
            } hover-opacity`}
            onClick={handleSignOut}
          >
            {currentProps.location.pathname === currentProps.login ||
            currentProps.location.pathname === currentProps.inalert
              ? "Sign up"
              : currentProps.location.pathname === currentProps.register ||
                currentProps.location.pathname === currentProps.upalert
              ? "Log in"
              : "Log out"}
          </p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
