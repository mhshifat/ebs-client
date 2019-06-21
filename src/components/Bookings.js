import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Dimmer, Divider, Icon, Loader, Menu } from "semantic-ui-react";
import { bookingsQuery } from "../graphql/queries";
import BookingsList from "./BookingsList";

class Bookings extends Component {
  render() {
    const {
      data: { loading, bookings }
    } = this.props;

    return (
      <React.Fragment>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Menu pointing>
            <Menu.Item name="Events" active={true} />
            <Menu.Menu position="right">
              <Menu.Item>
                <Icon onClick={this.handleEventClick} name="add circle" />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Divider />
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading...</Loader>
            </Dimmer>
          ) : (
            <BookingsList events={bookings.map(booking => booking.event)} />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default graphql(bookingsQuery, {
  options: {
    fetchPolicy: "network-only"
  }
})(Bookings);
