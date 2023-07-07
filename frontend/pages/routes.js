import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useUser } from "../UserContext";

import Login from './screens/Login';
import Register from './screens/Register';
import About from './screens/About';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const Routes = () => {
  const { setUser } = useUser();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData !== undefined && userData !== null) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, [setUser]);

  return (
    <Router>
      <Route path="/screens/login" component={Login} />
      <Route path="/screens/register" component={Register} />
      <PrivateRoute path="/screens/about" component={About} />
    </Router>
  );
};

export default Routes;
