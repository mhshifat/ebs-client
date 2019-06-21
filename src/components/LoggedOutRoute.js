import decode from "jwt-decode";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  try {
    decode(token);
    return true;
  } catch (err) {
    return false;
  }
};

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated() ? <Component {...props} /> : <Redirect to="/events" />
    }
  />
);

export default LoggedInRoute;
