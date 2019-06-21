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
import { bookEventMutation } from "../graphql/mutations";
import { eventsQuery } from "../graphql/queries";
import RemoveEvent from "./RemoveEvent";

class EventLists extends Component {
  bookThisEvent = id => async () => {
    const {
      data: {
        bookEvent: { success }
      }
    } = await this.props.mutate({
      variables: { eventId: id },
      update: (
        store,
        {
          data: {
            bookEvent: { success, event }
          }
        }
      ) => {
        if (!success) return;
        const data = store.readQuery({ query: eventsQuery });
        const newEvents = data.events.filter(e => e.id !== event.id);
        data.events = newEvents;
        store.writeQuery({ query: eventsQuery, data });
      }
    });
    if (!success) return;
  };

  render() {
    const { events } = this.props;
    const decodedToken = decode(localStorage.getItem("token"));
    return (
      <React.Fragment>
        {events.length === 0 ? (
          <Message icon>
            <Icon name="question circle" />
            <Message.Content>
              <Message.Header>Sorry...</Message.Header>
              We couldn't found any events for you.
            </Message.Content>
          </Message>
        ) : (
          events.reverse().map(event => (
            <Card key={event.id} fluid>
              <Card.Content>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column width={15}>
                      <Header as="h4">{event.name}</Header>
                    </Grid.Column>
                    <Grid.Column width={1}>
                      {decodedToken.id === event.owner.id && (
                        <RemoveEvent eventId={event.id} />
                      )}
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
                        color="violet"
                        onClick={this.bookThisEvent(event.id)}
                      >
                        <Icon name="shopping basket" />{" "}
                        {decodedToken.id === event.owner.id && "Can't"} Book
                        this Event
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </Card>
          ))
        )}
      </React.Fragment>
    );
  }
}

export default graphql(bookEventMutation)(EventLists);
