import decode from "jwt-decode";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Input, Menu } from "semantic-ui-react";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  try {
    decode(token);
    return true;
  } catch (err) {
    return false;
  }
};

class Navbar extends Component {
  logoutTheUser = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  render() {
    return (
      <Menu>
        <Menu.Item name="EBS" onClick={() => this.props.history.push("/")} />
        <Menu.Item
          name="Events"
          active={this.props.location.pathname.includes("events")}
          onClick={() => this.props.history.push("/events")}
        />
        {isAuthenticated() && (
          <Menu.Item
            name="Bookings"
            onClick={() => this.props.history.push("/bookings")}
          />
        )}
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          {isAuthenticated() && (
            <Menu.Item name="logout" onClick={this.logoutTheUser} />
          )}
          {!isAuthenticated() && (
            <React.Fragment>
              <Menu.Item
                name="Login"
                active={this.props.location.pathname.includes("login")}
                onClick={() => this.props.history.push("/login")}
              />
              <Menu.Item
                name="Register"
                active={this.props.location.pathname.includes("register")}
                onClick={() => this.props.history.push("/register")}
              />
            </React.Fragment>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter(Navbar);
