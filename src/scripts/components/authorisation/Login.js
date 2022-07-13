import { useState, useContext } from "react";
import Form from "../basic/form/Form";
import FormInput from "../basic/input/FormInput";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";
import * as auth from "../../utils/auth.js";
import { withRouter, useHistory } from "react-router-dom";

function Login(props) {
  //const history = useHistory();
  const currentProps = useContext(CurrentPropsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  //const [user, setUser] = useState({ email: "", password: "" });
  //const password = React.useRef("");
  //const email = React.useRef("");

  /*React.useEffect(() => {
    email.current.value = "";
    password.current.value = "";
  }, [email, password]);*/

  function handleSubmit() {
    if (!email || !password) {
      return;
    }
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail("");
          setPassword("");
          currentProps.setLoggedIn(true);
          currentProps.history.push("/gallery");
        }
      })
      .catch((err) => console.log(err.message)); // this is fired if the user not found
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
      onSubmit={handleSubmit}
    >
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        login={true}
        minLength="4"
        onChange={(evt) => {
          setEmail(evt.target.value);
        }}
      />

      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        login={true}
        minLength="4"
        onChange={(evt) => {
          setPassword(evt.target.value);
        }}
      />
    </Form>
  );
}

export default withRouter(Login)
