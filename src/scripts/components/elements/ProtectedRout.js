import * as React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(loggedIn, main, login, children) {
  return <Navigate to={loggedIn ? main : login} replace={true}>
    {loggedIn? children : null}
    </Navigate>
}

export default ProtectedRoute;