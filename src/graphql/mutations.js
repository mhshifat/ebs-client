import gql from "graphql-tag";

export const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      success
      errors {
        path
        message
      }
    }
  }
`;

export const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      token
      errors {
        path
        message
      }
    }
  }
`;

export const createEventMutation = gql`
  mutation(
    $name: String!
    $description: String!
    $price: Float!
    $date: String!
  ) {
    createEvent(
      name: $name
      description: $description
      price: $price
      date: $date
    ) {
      success
      event {
        id
        name
        description
        date
        price
        owner {
          id
          username
        }
      }
      errors {
        path
        message
      }
    }
  }
`;

export const bookEventMutation = gql`
  mutation($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      success
      event {
        id
        name
        description
        date
        price
        owner {
          id
          username
        }
      }
      errors {
        path
        message
      }
    }
  }
`;

export const cancelBookingMutation = gql`
  mutation($eventId: ID!) {
    cancelBooking(eventId: $eventId) {
      success
      event {
        id
        name
        description
        date
        price
        owner {
          id
          username
        }
      }
      errors {
        path
        message
      }
    }
  }
`;

export const deleteEventMutation = gql`
  mutation($eventId: ID!) {
    deleteEvent(eventId: $eventId) {
      success
      event {
        id
        name
        description
        price
        date
        owner {
          id
          username
        }
      }
      errors {
        path
        message
      }
    }
  }
`;
