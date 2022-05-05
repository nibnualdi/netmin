import { gql } from "@apollo/client";

// export const GET_MESSAGES = gql`
// query MyQuery {
//   messages(where: {user: {email: {_eq: "admin@email.com"}}}, order_by: {createdAt: desc}) {
//     user {
//       name
//     }
//     friend {
//       name
//       userTyping
//     }
//     messagesText
//     messagesRead
//     createdAt
//   }
// }
// `;

export const GET_MESSAGES = gql`
query MyQuery {
  messages(where: {_or: [{user: {email: {_eq: "admin@email.com"}}}, {friend: {name: {_eq: "admin"}}}]}, order_by: {createdAt: desc}) {
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