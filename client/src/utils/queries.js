import { gql } from '@apollo/client';

export const GET_BOOK_CLUB_DETAILS = gql`
  query getBookClubDetails($bookClubId: ID!) {
    bookClubById(id: $bookClubId) {
      _id
      name
      description
      members {
        _id
        username
      }
      books {
        _id
        title
        author
      }
      comments {
        _id
        content
        user {
          _id
          username
        }
        timestamp
      }
    }
  }
`;

export const GET_ALL_BOOK_CLUBS = gql`
  query getAllBookClubs {
    bookClubs {
      _id
      name
      description
      members {
        _id
        username
      }
      books {
        _id
        title
        author
      }
      comments {
        _id
        content
        user {
          _id
          username
        }
        timestamp
      }
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query getUserDetails($userId: ID!) {
    userById(id: $userId) {
      _id
      username
      email
      bio
      book_clubs {
        _id
        name
      }
      comments {
        _id
        content
        bookClub {
          _id
          name
        }
        timestamp
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      _id
      username
      email
      bio
      book_clubs {
        _id
        name
      }
      comments {
        _id
        content
        bookClub {
          _id
          name
        }
        timestamp
      }
    }
  }
`;

export const GET_BOOK_CLUB_COMMENTS = gql`
  query getBookClubComments($bookClubId: ID!) {
    bookClubComments(bookClubId: $bookClubId) {
      _id
      content
      user {
        _id
        username
      }
      timestamp
    }
  }
`;
