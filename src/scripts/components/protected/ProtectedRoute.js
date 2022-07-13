import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CurrentPropsContext } from '../../contexts/CurrentPropsContext';
//  import paths from '../utils/paths';

function ProtectedRoute({ children, loggedIn, ...props }) {
  const currentProps = React.useContext(CurrentPropsContext)
  return (
    <Route {...props}>
      {currentProps.loggedIn ? children : <Redirect to={currentProps.login} />}
    </Route>
  );
}

export default ProtectedRoute;