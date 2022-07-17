import React, { useContext } from "react";
import Form from "../basic/form/Form";
import FormInput from "../basic/input/FormInput";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";
import * as auth from "../../utils/auth.js";
import { withRouter } from "react-router-dom";

function Login() {
  const currentProps = useContext(CurrentPropsContext);

  function handleSignIn() {
    currentProps.resetForm();
    if (!currentProps.email || !currentProps.password) {
      return;
    }
    auth
      .authorize(
        currentProps.email,
        currentProps.password,
        currentProps.handleFetchError
      )
      .then((data) => {
        if (data.token) {
          currentProps.resetLoginForm();
          currentProps.setLoggedIn(true);
          currentProps.history.push(currentProps.main);
        } else {
          const error = new Error("Something went wrong");
          error.name = "loginError";
          throw error;
        }
      })
      .catch((error) => error && currentProps.handleFetchError());
  }

  return (
    <Form
      name="login"
      title="Log in"
      login={true}
      bottomText="Not a member yet? Sign up here!"
      link={currentProps.register}
      linkText="Log in"
      buttonText="Log in"
      onSubmit={handleSignIn}
    >
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={currentProps.email}
        login={true}
        minLength="4"
        onChange={(evt) => {
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
        onChange={(evt) => {
          currentProps.setPassword(evt.target.value);
        }}
      />
    </Form>
  );
}

export default withRouter(Login);
