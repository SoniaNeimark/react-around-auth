import React, { useContext } from "react";
import Form from "../elements/Form";
import InputWithErrorField from "../basic/InputWithErrorField";
import SignInAlertPopup from "./SignInAlertPopup";
import { DocPropsContext } from "../../contexts/DocPropsContext";

const Login = (props) => {
  const docProps = useContext(DocPropsContext)
  return (
    <section className="authorisation">
      <Form
        name="signinpopup"
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit(
            docProps.values["email"],
            docProps.values["password"]
          )
        }}
        dark={true}
        title="Log in"
        buttonText="Log in"
        onButtonClick={props.onButtonClick}
      >
        <InputWithErrorField name="email" type="email" placeholder="Email" />
        <InputWithErrorField
          name="password"
          type="password"
          minLength="8"
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
