import React, { Component } from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import Bookings from "./components/Bookings";
import Events from "./components/Events";
import Footer from "./components/Footer";
import LoggedInRoute from "./components/LoggedInRoute";
import LoggedOutRoute from "./components/LoggedOutRoute";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Redirect from="/" to="/register" exact />
            <LoggedOutRoute exact path="/login" component={Login} />
            <LoggedOutRoute exact path="/register" component={Register} />
            <LoggedInRoute exact path="/events" component={Events} />
            <LoggedInRoute exact path="/bookings" component={Bookings} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
