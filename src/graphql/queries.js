import gql from "graphql-tag";

export const eventsQuery = gql`
  query {
    events {
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
  }
`;

export const bookingsQuery = gql`
  query {
    bookings {
      id
      user {
        id
        username
      }
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
      createdAt
    }
  }
`;
