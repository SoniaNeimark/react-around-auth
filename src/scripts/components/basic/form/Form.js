import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentPropsContext } from "../../../contexts/CurrentPropsContext";
import Button from "../button/Button";

function Form(props) {
  const currentProps = useContext(CurrentPropsContext);

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
      </div>
      <fieldset className="popup-box__fieldset">{props.children}</fieldset>
      <Button
        type={"submit"}
        login={props.login}
        value={props.buttonText}
        disabled={currentProps.buttonOff}
      ></Button>
      {props.login && (
        <Link to={props.link}>
          <p
            className="authentication__link hover-opacity"
            onClick={currentProps.resetLoginForm}
          >
            {props.bottomText}
          </p>
        </Link>
      )}
    </form>
  );
}

export default Form;
