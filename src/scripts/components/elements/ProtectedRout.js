import * as React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(loggedIn, main, login, children) {
  return <Navigate to={loggedIn ? main : login} replace={true}>
    {loggedIn? children : null}
    </Navigate>
}

/*const ProtectedRoute = ({ loggedIn, main, login, children }) => {
  if (!loggedIn) {
    return <Navigate to={login} replace />;
  }

  /*if (!children) {
    return <Navigate to={main} replace />;
  }*/

  /*return <Navigate to={main}>{children}</Navigate>;
};*/


export default ProtectedRoute;