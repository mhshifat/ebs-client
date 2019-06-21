import decode from "jwt-decode";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import {
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Icon,
  Label,
  Message
} from "semantic-ui-react";
import { cancelBookingMutation } from "../graphql/mutations";
import { bookingsQuery } from "../graphql/queries";

class BookingsList extends Component {
  cancelThisBooking = id => async () => {
    const {
      data: {
        cancelBooking: { success }
      }
    } = await this.props.mutate({
      variables: { eventId: id },
      update: (
        store,
        {
          data: {
            cancelBooking: { success, event }
          }
        }
      ) => {
        if (!success) return;
        const data = store.readQuery({ query: bookingsQuery });
        const newBookings = data.bookings.filter(b => b.event.id !== event.id);
        data.bookings = newBookings;
        store.writeQuery({ query: bookingsQuery, data });
      }
    });
    if (!success) return;
  };

  render() {
    const { events } = this.props;
    const decodedToken = decode(localStorage.getItem("token"));
    return (
      <React.Fragment>
        {events.map(event => (
          <Card key={event.id} fluid>
            <Card.Content>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Header as="h4">{event.name}</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
            <Card.Content>
              <Message info>
                <Message.Header>Event Information</Message.Header>
                <Message.List
                  items={[
                    `Event Ticket Price: $${event.price}`,
                    `Event Date/Time: ${event.date}`
                  ]}
                />
              </Message>
              <Divider />
              {event.description}
            </Card.Content>
            <Card.Content extra>
              <Grid columns={2}>
                <Grid.Row>
                  <Grid.Column width={12}>
                    <Label color="teal">
                      <Icon name="user" /> {event.owner.username}
                    </Label>
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Button
                      disabled={decodedToken.id === event.owner.id}
                      size="mini"
                      color="red"
                      onClick={this.cancelThisBooking(event.id)}
                    >
                      <Icon name="cancel" /> Cancel this Booking
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Content>
          </Card>
        ))}
      </React.Fragment>
    );
  }
}

export default graphql(cancelBookingMutation)(BookingsList);
