import React from "react";
import { CurrentPropsContext } from "../contexts/CurrentPropsContext";

function PopupWithForm(props) {
  const currentProps = React.useContext(CurrentPropsContext);

  function onClickOutside(e) {
    e.currentTarget === e.target && currentProps.onClose();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit();
  }

  return (
    <div
      key={props.name}
      className={`popup-box popup-box_${props.name}${
        props.isOpen ? " popup-box_opened" : ""
      }`}
      id={`${props.name}popup`}
      onClick={onClickOutside}
    >
      <div className="popup-box__container">
        <form
          className={`popup-box__form popup-box__form_${props.name}`}
          name={props.name}
          id={props.name}
          onChange={currentProps.handleChange}
          onSubmit={handleSubmit}
        >
          <div className="popup-box__heading">
            <h2 className="popup-box__title">{props.title}</h2>
            <button
              className={`close-button close-button_${props.name} hover-opacity`}
              type="button"
              onClick={currentProps.onClose}
            ></button>
          </div>
          <fieldset className="popup-box__fieldset">
            {props.children}
            <button
              className={`popup-box__button popup-box__button_${props.name}${
                currentProps.buttonOff ? " popup-box__button_disabled" : ""
              }`}
              type="submit"
              disabled={currentProps.buttonOff}
            >
              {currentProps.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
