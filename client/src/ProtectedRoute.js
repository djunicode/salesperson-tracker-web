import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          localStorage.getItem('Token') != null &&
          localStorage.getItem('Status') == 'LoggedIn'
        ) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/',
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
