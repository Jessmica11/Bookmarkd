import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $bio: String!) {
    addUser(username: $username, email: $email, password: $password, bio: $bio) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $bookClubId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      bookClubId: $bookClubId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      bookClubName 
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
