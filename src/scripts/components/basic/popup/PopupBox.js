import React, { useContext } from "react";
import { CurrentPropsContext } from "../../../contexts/CurrentPropsContext";
function PopupBox(props) {
  const currentProps = useContext(CurrentPropsContext);

  function onClickOutside(e) {
    if (e.currentTarget === e.target) {
      if (!props.loginAlert) {
        currentProps.handleClosePopups();
      }
      if (props.loginAlert) {
        if (props.handleClick) {
          props.handleClick();
        }
      }
    }
    return;
  }

  return (
    <div
      className={`popup-box${currentProps.isOpen ? " popup-box_opened" : ""}`}
      onClick={onClickOutside}
    >
      <div
        className={`${
          props.name !== "image" ? "popup-box__container" : "popup-box__wrapper"
        }`}
      >
        <button
          className={`close-button${
            props.name === "image" ? " close-button_place_image" : ""
          } hover-opacity`}
          type="button"
          onClick={currentProps.handleClosePopups}
        ></button>
        {props.children}
      </div>
    </div>
  );
}

export default PopupBox;
