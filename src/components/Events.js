import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Dimmer, Divider, Icon, Loader, Menu } from "semantic-ui-react";
import { eventsQuery } from "../graphql/queries";
import CreateEventModal from "./CreateEventModal";
import EventLists from "./EventLists";

class Events extends Component {
  state = {
    createEventModal: false
  };

  handleEventClick = () => {
    this.setState(state => ({ createEventModal: !state.createEventModal }));
  };

  render() {
    const {
      data: { loading, events }
    } = this.props;
    const { createEventModal } = this.state;

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
            <EventLists events={events} />
          )}
        </div>
        <CreateEventModal
          open={createEventModal}
          closeModal={this.handleEventClick}
        />
      </React.Fragment>
    );
  }
}

export default graphql(eventsQuery, {
  options: {
    fetchPolicy: "network-only"
  }
})(Events);
