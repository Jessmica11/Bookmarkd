const { gql } = require("apollo-server");

const typeDefs = gql`
  type BookClub {
    _id: ID
    name: String
    description: String
    members: [User]
    books: [Book]
    comments: [Comment]
  }

  type Comment {
    _id: ID
    content: String
    user: User
    timestamp: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    bio: String
    book_clubs: [BookClub]
    comments: [Comment]
  }

  type Book {
    _id: ID
  }

  type Query {
    bookClubs: [BookClub!]!
    bookClubById(id: ID!): BookClub
    usersInBookClub(bookClubId: ID!): [User]
    bookClubComments(bookClubId: ID!): [Comment]
  }

  type Mutation {
    joinBookClub(userId: ID!, bookClubId: ID!): JoinBookClubResponse
    addCommentToBookClub(bookClubId: ID!, userId: ID!, commentText: String!): JoinCommentResponse
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, bio: String!): Auth
  }

  type JoinBookClubResponse {
    user: User
    bookClub: BookClub
  }

  type JoinCommentResponse {
    user: User
    bookClub: BookClub
  }
`;

module.exports = typeDefs;
