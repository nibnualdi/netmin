import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://probable-hagfish-37.hasura.app/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": "yShbtKWAWnde3GJqPSYlMIYHXXZyVCXZcMKkpzLAiE59fboIs40tezdS2xe2LGKC",
  },
});
