import React, { useContext } from "react";
import { CurrentPropsContext } from "../../../contexts/CurrentPropsContext";
function Button(props) {
  const currentProps = useContext(CurrentPropsContext);
  return (
    <button
      className={`popup-box__button${
        props.login ? " popup-box__button_login" : ""
      }${
        props.type === "button"
          ? ""
          : currentProps.buttonOff
          ? " popup-box__button_disabled"
          : ""
      }`}
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Button;
