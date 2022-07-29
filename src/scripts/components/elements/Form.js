import React, { useContext, useState, useEffect } from "react";
import { DocPropsContext } from "../../contexts/DocPropsContext";

const Form = (props) => {
  const docProps = useContext(DocPropsContext);
  const [buttonText, setButtonText] = useState("");
  useEffect(() => {
    setButtonText(props.buttonText);
  }, [docProps.popup, setButtonText, props.buttonText]);
  return (
    <form
      name={props.name}
      onSubmit={props.onSubmit}
      onChange={(e) => docProps.handleChange(e)}
      className={`form${props.dark ? " form_theme_dark" : ""}`}
    >
      <h2
        className={`form__title${props.dark ? " form__title_theme_dark" : ""}`}
      >
        {props.title}
      </h2>

      {props.children}

      <button
        type="submit"
        name={props.name}
        className={`submit-button${
          props.dark ? " submit-button_theme_dark" : ""
        }${
          !docProps.isValid
            ? ""
            : !props.dark
            ? " submit-button_active"
            : " submit-button_active_theme_dark"
        }`}
        disabled={!docProps.isValid}
        onClick={(e) => {
          if (props.onButtonClick) {
            props.onButtonClick(e);

          }
          return setButtonText("Loading...");
        }}
      >
        {buttonText}
      </button>
    </form>
  );
};
export default Form;
