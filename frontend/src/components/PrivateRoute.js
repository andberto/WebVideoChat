import React from 'react';

const PrivateRoute = () => {
    return (
        <Route
          {...rest}
          render={() => {
            return fakeAuth.isAuthenticated === true ? (
              children
            ) : (
              <Redirect to="/login" />
            );
          }}
        />
  );
};

export default PrivateRoute;
