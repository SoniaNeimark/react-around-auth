import { useState, useContext } from "react";
import Form from "../basic/form/Form";
import FormInput from "../basic/input/FormInput";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";
import * as auth from "../../utils/auth";
import { withRouter, useHistory } from "react-router-dom";

function Register(props) {
  const currentProps = useContext(CurrentPropsContext);
  //const [user, setUser] = useState({ email: "", password: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  /*React.useEffect(() => {
    email.current.value = "";
    password.current.value = "";
  }, [email, password]);*/

  function handleSubmit() {
    //console.log(user.email, user.password)
    auth.register(password, email).then((res) => {
      if (res) {
        setMessage("");
        history.push(currentProps.login);
      } else {
        setMessage("Something went wrong!");
      }
    });

    /*props.onLogin({
      email: user.email,
      password: user.password,
    });*/
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

export default Register;
