import { gql } from "@apollo/client";

export const QUERY_BOOK_CLUBS = gql`
  query GetBookClubs {
    bookClubs {
      _id
      name
      description
      members {
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
          timestamp
        }
      }
      books {
        _id
      }
      comments {
        _id
        content
        user {
          _id
          username
          email
          bio
          book_clubs {
            _id
            name
          }
        }
        timestamp
      }
    }
  }
`;

export const QUERY_BOOK_CLUB_BY_ID = gql`
  query GetBookClubById($id: ID!) {
    bookClubById(id: $id) {
      _id
      name
      description
      members {
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
          timestamp
        }
      }
      books {
        _id
      }
      comments {
        _id
        content
        user {
          _id
          username
          email
          bio
          book_clubs {
            _id
            name
          }
        }
        timestamp
      }
    }
  }
`;

export const QUERY_USERS_IN_BOOK_CLUB = gql`
  query GetUsersInBookClub($bookClubId: ID!) {
    usersInBookClub(bookClubId: $bookClubId) {
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
        timestamp
      }
    }
  }
`;

export const QUERY_BOOK_CLUB_COMMENTS = gql`
  query GetBookClubComments($bookClubId: ID!) {
    bookClubComments(bookClubId: $bookClubId) {
      _id
      content
      user {
        _id
        username
        email
        bio
        book_clubs {
          _id
          name
        }
      }
      timestamp
    }
  }
`;

export const QUERY_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
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
        timestamp
      }
    }
  }
`;

export const QUERY_USER_NOTIFICATIONS = gql`
  query GetUserNotifications($userId: ID!) {
    notifications(userId: $userId) {
      _id
      message
      createdAt
    }
  }
`;
