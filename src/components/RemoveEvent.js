import React from "react";
import { graphql } from "react-apollo";
import { Icon } from "semantic-ui-react";
import { deleteEventMutation } from "../graphql/mutations";
import { eventsQuery } from "../graphql/queries";

const RemoveEvent = props => {
  const removeEvent = async () => {
    const {
      data: {
        deleteEvent: { success }
      }
    } = await props.mutate({
      variables: { eventId: props.eventId },
      update: (
        store,
        {
          data: {
            deleteEvent: { success, event }
          }
        }
      ) => {
        if (!success) return;
        const data = store.readQuery({ query: eventsQuery });
        data.events = data.events.filter(e => e.id !== event.id);
        store.writeQuery({ query: eventsQuery, data });
      }
    });
    if (!success) return;
  };
  return (
    <Icon name="remove" style={{ cursor: "pointer" }} onClick={removeEvent} />
  );
};

export default graphql(deleteEventMutation)(RemoveEvent);
