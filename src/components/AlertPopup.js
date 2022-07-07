import React from "react";
import PopupWithForm from "./PopupWithForm";

function AlertPopup(props) {
  function handleSubmit() {
    props.handleCardDelete(props.selectedCard);
  }

  return (
    <PopupWithForm
      name="alert"
      title="Are you sure?"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    />
  );
}

export default AlertPopup;
