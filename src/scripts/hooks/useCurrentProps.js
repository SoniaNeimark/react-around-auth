import { useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import paths from "../utils/paths";
import { useFormAndValidation } from "./useFormAndValidation";

export function useCurrentProps() {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    setErrors
  } = { ...useFormAndValidation() };
  const history = useHistory();
  const location = useLocation();
  const [success, setSuccess] = useState(true);
  const [userMail, setUserMail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState("Save");
  const [buttonOff, setButtonOff] = useState(true);
  const [selectedCard, setSelectedCard] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetLoginForm = () => {
    setEmail("");
    setPassword("");
    resetForm();
  };

  const handleClosePopups = useCallback(() => {
    setIsOpen(false);
    setIsAlert(false);
    resetForm();
    history.goBack();
  }, [history, resetForm]);

  const handleFetchError = useCallback(() => {
    setEmail("");
    setPassword("");
    setSuccess(false);
    resetForm();
    history.push(
      location.pathname === paths.login ? paths.inalert : paths.upalert
    );
    setIsOpen(true);
    return;
  }, [history, location.pathname, resetForm]);

  const handleCloseInfoTooltip = useCallback(() => {
    if (success) {
      history.push(paths.login);
      return;
    }
    location.pathname === paths.inalert
      ? history.push(paths.login)
      : history.push(paths.register);
    return;
  }, [success, history, location.pathname]);

  return {
    success,
    setSuccess,
    userMail,
    setUserMail,
    loggedIn,
    setLoggedIn,
    history,
    isAlert,
    setIsAlert,
    isOpen,
    setIsOpen,
    buttonText,
    setButtonText,
    buttonOff,
    setButtonOff,
    selectedCard,
    setSelectedCard,
    email,
    setEmail,
    password,
    setPassword,
    location,
    handleClosePopups,
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setIsValid,
    setErrors,
    resetLoginForm,
    handleCloseInfoTooltip,
    handleFetchError
  };
}
