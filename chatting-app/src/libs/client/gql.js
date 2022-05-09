import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query AllUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_MESSAGES = gql`
  query AllMessages($user: String!) {
    messages(
      where: {
        _or: [
          { user: { name: { _eq: $user } } }
          { friend: { name: { _eq: $user } } }
        ]
      }
      order_by: { createdAt: asc }
    ) {
      user {
        name
      }
      friend {
        name
        userTyping
      }
      id
      messagesText
      messagesRead
      createdAt
    }
  }
`;
