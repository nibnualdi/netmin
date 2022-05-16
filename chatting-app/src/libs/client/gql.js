import { gql } from "@apollo/client";

export const GET_USER_AND_FRIEND_BY_NAME = gql`
  query UserAndFriend($username: String, $friendname: String) {
    users(where: { name: { _eq: $username } }) {
      id
      name
    }
    friends(where: { name: { _eq: $friendname } }) {
      id
      name
    }
  }
`;

export const GET_USER = gql`
  query User($email: String, $password: String) {
    users(where: { _and: { email: { _eq: $email }, password: { _eq: $password } } }) {
      id
      name
    }
  }
`;

export const GET_USER_SIGN_UP_VALIDATION = gql`
  query User($email: String, $name: String) {
    users(where: { _or: [{ name: { _eq: $name } }, { email: { _eq: $email } }] }) {
      id
      name
    }
  }
`;

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
    $userId: String
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

export const CREATE_NEW_USER = gql`
mutation CreateNewUser($id: String, $name: String, $email: String, $password: String, $userTyping: Boolean = false) {
  insert_users(objects: {id: $id, name: $name, email: $email, password: $password}) {
    returning {
      id
      name
      email
    }
  }
  insert_friends(objects: {name: $name, userId: $id, userTyping: $userTyping}) {
    returning {
      id
      name
      userId
    }
  }
}

`;
