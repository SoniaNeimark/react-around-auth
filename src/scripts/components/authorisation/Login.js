import { useState, useContext } from "react";
import Form from "../basic/form/Form";
import FormInput from "../basic/input/FormInput";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";
import { authorize } from "../../utils/auth";
import { withRouter, useHistory } from "react-router-dom";

function Login(props) {
  const history = useHistory();
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
    authorize(email, password)
      .then((data) => {
        if (data.jwt) {
          setEmail("");
          setPassword("");
          currentProps.handleLogin();
          history.push(currentProps.main);
        }
      })
      .catch((err) => console.log(err)); // this is fired if the user not found
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

export default Login;
