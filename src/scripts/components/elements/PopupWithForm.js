import React from "react";
import Popup from "../basic/Popup";
import Form from "./Form";

const PopupWithForm = (props) => {
  return (
    <Popup name={props.name}>
      <div className={`popup__container`}>
        <Form
          name={props.name}
          onSubmit={(e) => {
            e.preventDefault();
            props.onSubmit();
          }}
          onChange={props.onChange}
          buttonText={props.buttonText}
          title={props.title}
          onButtonClick={props.onButtonClick}
        >
          {props.children}
        </Form>
      </div>
    </Popup>
  );
};

export default PopupWithForm;
