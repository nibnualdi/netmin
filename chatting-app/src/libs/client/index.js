import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_URI,
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_X_HASURA_ADMIN_SECRET_HEDEARS,
  },
});

const wsLink = new WebSocketLink(
  new SubscriptionClient(process.env.REACT_APP_WEB_SOCKET, {
    options: {
      reconnect: true,
      timeout: 30000,
      connectionParams: {
        headers: {
          "x-hasura-admin-secret":
            process.env.REACT_APP_X_HASURA_ADMIN_SECRET_HEDEARS,
        },
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
