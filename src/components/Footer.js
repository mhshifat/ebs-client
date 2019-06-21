import React, { Component } from "react";
import { Header, Menu } from "semantic-ui-react";

class Footer extends Component {
  render() {
    return (
      <Menu style={{ marginTop: 150 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Header as="h5">Mehedi Hassan Shifat (mhs.com)</Header>
        </div>
      </Menu>
    );
  }
}

export default Footer;
