import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      {props.loggedIn && props.hamburgerClicked ? (
        <div className="header__mobile-menu header__mobile-menu_opened">
          <div className="header__text-group header__text-group_size_mobile">
            <p className="paragraph-text paragraph-text_place_header">
              {props.userMail}
            </p>
            <p
              className="paragraph-text paragraph-text_place_header"
              onClick={props.handleLogout}
            >
              Log out
            </p>
          </div>
        </div>
      ) : null}
      <div className="header__main-group">
        <div className="header__logo"></div>

        {props.loggedIn && !props.hamburgerClicked ? (
          <ul className="hamburger-menu hover-opacity" onClick={props.onOpen}>
            <li className="hamburger-menu__line"></li>
            <li className="hamburger-menu__line"></li>
            <li className="hamburger-menu__line"></li>
          </ul>
        ) : props.loggedIn ? (
          <button
            className="close-button close-button_place_header"
            onClick={props.onClose}
          ></button>
        ) : (
          <p
            className="paragraph-text paragraph-text_place_header paragraph-text_hidden_large-screen hover-opacity"
            onClick={props.togglePage}
          >
            {props.signUp ? "Sign in" : "Sign up"}
          </p>
        )}

        <div className="header__text-group">
          {props.loggedIn && (
            <p className="paragraph-text paragraph-text_place_header paragraph-text_hidden_small-screen">
              {props.userMail}
            </p>
          )}
          <p
            className={`paragraph-text paragraph-text_place_header${
              props.loggedIn ? " paragraph-text_hidden_small-screen" : ""
            } hover-opacity`}
            onClick={(e) => {
              e.target.textContent === "Log out"
                ? props.handleLogout()
                : e.target.textContent === "Sign in"
                ? props.setSignUp(false)
                : props.setSignUp(true);
              console.log(e.target.textContent);
            }}
          >
            {props.loggedIn ? "Log out" : props.signUp ? "Sign in" : "Sign up"}
          </p>
        </div>
      </div>
    </header>
  );
};
export default Header;
