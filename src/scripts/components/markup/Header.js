import React from "react";
//import { useParams } from "react-router-dom"

const Header = (props) => {
  //const params = useParams();
  return (
    <>
      <header className="header">
        {props.loggedIn && props.hamburgerClicked ? (
          <div className="header__mobile-menu header__mobile-menu_opened">
            <div className="header__text-group header__text-group_size_mobile">
              <p className="paragraph-text paragraph-text_place_header">
                {props.userMail}
              </p>
              <p
                className="paragraph-text paragraph-text_place_header"
                onClick={props.togglePage}
              >
                Log out
              </p>
            </div>
          </div>
        ) : null}
        <div className="header__main-group">
          <div
            className="header__logo"
          ></div>

          {props.loggedIn && !props.hamburgerClicked ? (
            <ul className="hamburger-menu hover-opacity" onClick={() => props.setHamburgerClicked(true)}>
              <li className="hamburger-menu__line"></li>
              <li className="hamburger-menu__line"></li>
              <li className="hamburger-menu__line"></li>
            </ul>
          ) : props.loggedIn ? (
            <button
              className="close-button close-button_place_header"
              onClick={() => props.setHamburgerClicked(false)}
            ></button>
          ) : (
            <p
              className="paragraph-text paragraph-text_place_header paragraph-text_hidden_large-screen hover-opacity"
              onClick={props.togglePage}
            >
              {props.location.pathname === props.register
                ? "Sign in"
                : "Sign up"}
            </p>
          )}

          <div className="header__text-group">
            {!props.loggedIn ? null : props.location.pathname === props.main ? (
              <p className="paragraph-text paragraph-text_place_header paragraph-text_hidden_small-screen">
                {props.userMail}
              </p>
            ) : null}
            <p
              className={`paragraph-text paragraph-text_place_header${
                props.loggedIn ? " paragraph-text_hidden_small-screen" : ""
              } hover-opacity`}
              onClick={props.togglePage}
            >
              {props.loggedIn
              ? "Log out"
              : props.location.pathname === props.register
              ? "Sign in"
              : "Sign up"}
            </p>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
