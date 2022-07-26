import React, { useContext, useRef } from "react";
import { DocPropsContext } from "../../contexts/DocPropsContext";

const InputWithErrorField = (props) => {
  const docProps = useContext(DocPropsContext);
  const ref = useRef("");
  //const dark = props["dark"]

  React.useEffect(() => {
    ref.current.value = docProps.values[props.name] ? docProps.values[props.name] : "";
  }, [docProps.values, props.name]);
  return (
    <>
      <input
        className={`form__input${!docProps.loggedIn ? " form__input_theme_dark" : ""}`}
        key={props.name}
        required
        {...props}
        ref={ref}
      />
      <p className={`form__error form__error_visible`}>{docProps.errors[props.name]}</p>
    </>
  );
};

export default InputWithErrorField;
