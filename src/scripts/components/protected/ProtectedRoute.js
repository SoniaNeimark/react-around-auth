import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { CurrentPropsContext } from "../../contexts/CurrentPropsContext";

function ProtectedRoute({ children, ...props }) {
  const currentProps = useContext(CurrentPropsContext);
  return (
    <Route {...props}>
      {currentProps.loggedIn ? children : <Redirect to={currentProps.login} />}
    </Route>
  );
}

export default ProtectedRoute;
