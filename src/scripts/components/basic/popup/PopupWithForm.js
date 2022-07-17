import React from "react";
import PopupBox from "./PopupBox";
import Form from "../form/Form";

function PopupWithForm(props) {
  return (
    <PopupBox
      name={props.name}
      loginAlert={props.loginAlert}
      handleClick={props.handleClick}
    >
      <Form
        name={props.name}
        title={props.title}
        login={false}
        children={props.children}
        onSubmit={props.onSubmit}
        buttonText={props.buttonText}
        loginAlert={props.loginAlert}
        create={props.create}
      />
    </PopupBox>
  );
}

export default PopupWithForm;
