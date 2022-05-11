import { gql } from "@apollo/client";

export const GET_USERS = gql`
  subscription AllUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_MESSAGES = gql`
  subscription AllMessages($user: String!) {
    messages(
      where: { _or: [{ user: { name: { _eq: $user } } }, { friend: { name: { _eq: $user } } }] }
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
      userId
      friendId
      createdAt
    }
  }
`;

export const INPUT_MESSAGE = gql`
  mutation insertMessage(
    $messagesRead: Boolean = false
    $messagesText: String
    $userId: Int
    $friendId: Int
    $createdAt: String
  ) {
    insert_messages(
      objects: {
        messagesText: $messagesText
        messagesRead: $messagesRead
        userId: $userId
        friendId: $friendId
        createdAt: $createdAt
      }
    ) {
      returning {
        id
        messagesText
        userId
        friendId
      }
    }
  }
`;
