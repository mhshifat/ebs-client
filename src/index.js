import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const link = new HttpLink({
  uri: process.env.REACT_APP_SERVER_URL
});

const authLink = new setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-token": localStorage.getItem("token")
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      if (message.includes("Authenticated required!")) {
        localStorage.removeItem("token");
      }
      return console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(errorLink.concat(link))
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
