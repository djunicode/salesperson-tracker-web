import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          localStorage.getItem('Status') == null ||
          localStorage.getItem('Status') == 'LoggedOut'
        ) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/dashboard',
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
