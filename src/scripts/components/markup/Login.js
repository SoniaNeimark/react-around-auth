import React from "react";
import Form from "../elements/Form";
import InputWithErrorField from "../basic/InputWithErrorField";
import SignInAlertPopup from "./SignInAlertPopup";

const Login = (props) => {
  return (
    <section className="authorisation">
      <Form
        name="signinpopup"
        onSubmit={props.onSubmit}
        dark={true}
        title="Log in"
        buttonText="Log in"
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
        Not a member yet? Sign up here
      </p>
      <SignInAlertPopup name="signin" onClick={props.onClick} />
    </section>
  );
};

export default Login;
