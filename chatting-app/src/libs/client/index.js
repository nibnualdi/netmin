import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://probable-hagfish-37.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "yShbtKWAWnde3GJqPSYlMIYHXXZyVCXZcMKkpzLAiE59fboIs40tezdS2xe2LGKC",
  },
});

const wsLink = new WebSocketLink(
  new SubscriptionClient("ws://probable-hagfish-37.hasura.app/v1/graphql", {
    options: {
      reconnect: true,
      timeout: 30000,
      connectionParams: {
        headers: {
          "x-hasura-admin-secret":
            "yShbtKWAWnde3GJqPSYlMIYHXXZyVCXZcMKkpzLAiE59fboIs40tezdS2xe2LGKC",
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
