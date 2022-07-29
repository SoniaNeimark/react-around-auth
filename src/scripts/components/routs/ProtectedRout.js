import * as React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  return <Navigate to={props.loggedIn ? props.main : props.login} replace={true} />
}

export default ProtectedRoute;
