import React from "react";
import { Link } from "react-router-dom";
import { CurrentPropsContext } from "../../../contexts/CurrentPropsContext";

function Form(props) {
  const currentProps = React.useContext(CurrentPropsContext);

  React.useEffect(() => {
    if (currentProps.isAlert) {
      currentProps.setButtonText("Yes");
    } else if (props.buttonText) {
      currentProps.setButtonText(props.buttonText);
    } else {
      currentProps.setButtonText("Save");
    }
  }, [currentProps.isOpen, currentProps, props.buttonText]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit();
  }

  return (
    <form
      className={`popup-box__form popup-box__form_${props.name}${
        !currentProps.loggedIn ? " popup-box__form_no-popup" : ""
      }`}
      name={props.name}
      id={props.name}
      onChange={currentProps.handleChange}
      onSubmit={handleSubmit}
    >
      <div
        className={`popup-box__heading${
          props.login ? " popup-box__heading_login" : ""
        }`}
      >
        <h2
          className={`popup-box__title${
            props.login ? " popup-box__title_dark" : ""
          }`}
        >
          {props.title}
        </h2>
        {!props.login && (
          <button
            className={`close-button close-button_${props.name} hover-opacity`}
            type="button"
            onClick={currentProps.handleClosePopups}
          ></button>
        )}
      </div>
      <fieldset className="popup-box__fieldset">
        {props.children}
        <button
          className={`popup-box__button popup-box__button_${
            !props.login ? props.name : "login"
          }${currentProps.buttonOff ? " popup-box__button_disabled" : ""}`}
          type="submit"
          disabled={currentProps.buttonOff}
        >
          {currentProps.buttonText}
        </button>
        {props.login && (
          <Link to={props.link}>
            <p
              className="authentication__link hover-opacity"
              onClick={() => {
                currentProps.setHeaderText({ link: props.linkText });
                currentProps.resetForm();
                console.log(currentProps.loggedIn);
              }}
            >
              {props.bottomText}
            </p>
          </Link>
        )}
      </fieldset>
    </form>
  );
}

export default Form;
