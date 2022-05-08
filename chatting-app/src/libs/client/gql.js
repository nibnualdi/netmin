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
  query AllMessages {
    messages(
      where: {
        _or: [
          { user: { email: { _eq: "admin@email.com" } } }
          { friend: { name: { _eq: "admin" } } }
        ]
      }
      order_by: { createdAt: desc }
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
