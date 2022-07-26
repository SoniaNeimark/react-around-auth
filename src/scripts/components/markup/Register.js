import React from "react";
import Form from "../elements/Form";
import InputWithErrorField from "../basic/InputWithErrorField";
import SignInAlertPopup from "./SignInAlertPopup";

const Register = (props) => {
  return (
    <>
      <Form
        name="signuppopup"
        onSubmit={props.onSubmit}
        dark={true}
        title="Sign up"
        buttonText="Sign up"
        onButtonClick={props.onButtonClick}
      >
        <InputWithErrorField name="email" type="email" placeholder="Email" />
        <InputWithErrorField
          name="password"
          type="password"
          minLength="4"
          placeholder="Password"
        />
      </Form>
      <p
        onClick={props.togglePage}
        className="paragraph-text authorisation__bottom-link hover-opacity"
      >
        Allready a member? Sign in here
      </p>
      <SignInAlertPopup name="signup" onClick={props.onClick} />
    </>
  );
};

export default Register;
