import React, { useContext } from "react";
import { CurrentPropsContext } from "../../../contexts/CurrentPropsContext";
import Input from "./Input";

function FormInput(props) {
  const currentProps = useContext(CurrentPropsContext);
  const error = currentProps.errors[props.name];
  const propsRef = props.propsRef;

  return (
    <>
      <Input
        className={
          !props.login
            ? `popup-box__input${error ? " popup-box__input_type_error" : ""}`
            : `popup-box__input popup-box__input_dark${
                error ? " popup-box__input_type_error" : ""
              }`
        }
        type={props.type}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        required
        ref={propsRef}
      />
      <p
        className={`popup-box__error ${
          error ? " popup-box__error_visible" : ""
        }`}
      >
        {error}
      </p>
    </>
  );
}

export default FormInput;
