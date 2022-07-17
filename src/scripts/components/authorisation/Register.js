import React, { useContext } from "react";
import Form from "../basic/form/Form";
import FormInput from "../basic/input/FormInput";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";
import * as auth from "../../utils/auth.js";
import { withRouter } from "react-router-dom";

function Register() {
  const currentProps = useContext(CurrentPropsContext);

  function handleSignUp() {
    auth
      .register(
        currentProps.password,
        currentProps.email,
        currentProps.handleFetchError
      )
      .then(res => {
        if (res) {
          currentProps.setSuccess(true);
          currentProps.history.push(currentProps.inalert);
          currentProps.setIsOpen(true);
        } else {
          const error = new Error("Something went wrong");
          error.name = "signupError";
          throw error;
        }
      })
      .catch(error => error && currentProps.handleFetchError());
  }

  return (
    <Form
      name="register"
      title="Sign up"
      login={true}
      bottomText="Already a member? Log in here!"
      link={currentProps.login}
      linkText="Sign up"
      buttonText="Sign up"
      onSubmit={handleSignUp}
    >
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={currentProps.email}
        login={true}
        minLength="4"
        onChange={evt => {
          currentProps.setEmail(evt.target.value);
        }}
      />

      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        value={currentProps.password}
        login={true}
        minLength="4"
        onChange={evt => {
          currentProps.setPassword(evt.target.value);
        }}
      />
    </Form>
  );
}

export default withRouter(Register);
