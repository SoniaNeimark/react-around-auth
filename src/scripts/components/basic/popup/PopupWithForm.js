import React from "react";
import Form from "../form/Form"
import { CurrentPropsContext } from "../../../contexts/CurrentPropsContext";

function PopupWithForm(props) {
  const currentProps = React.useContext(CurrentPropsContext);

  function onClickOutside(e) {
    e.currentTarget === e.target && currentProps.handleClosePopups();
  }

  return (
    <div
      className={`popup-box popup-box_${props.name}${
        currentProps.isOpen ? " popup-box_opened" : ""
      }`}
      id={`${props.name}popup`}
      onClick={onClickOutside}
    >
      <div className="popup-box__container">
        <Form
          name={props.name}
          title={props.title}
          login={false}
          children={props.children}
          onSubmit={props.onSubmit}
          buttonText={props.buttonText}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
