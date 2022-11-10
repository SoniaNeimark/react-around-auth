import React, { useContext, useRef } from "react";
import { DocPropsContext } from "../../contexts/DocPropsContext";

const InputWithErrorField = (props) => {
  const docProps = useContext(DocPropsContext);
  const ref = useRef("");

  React.useEffect(() => {
    ref.current.value = docProps.values[props.name]
      ? docProps.values[props.name]
      : "";
  }, [docProps.values, props.name, docProps.resetForm]);
  return (
    <>
      <input
        className={`form__input${
          docProps.location.pathname !== docProps.main
            ? " form__input_theme_dark"
            : ""
        }${
          !docProps.errors[props.name]
            ? ""
            : docProps.location.pathname !== docProps.main
            ? " form__input_type_error form__input_type_error_theme_dark"
            : " form__input_type_error"
        }`}
        key={props.name}
        required
        {...props}
        ref={ref}
      />
      <p
        className={`form__error${
          docProps.errors[props.name] ? " form__error_visible" : ""
        }`}
      >
        {docProps.errors[props.name]}
      </p>
    </>
  );
};

export default InputWithErrorField;
