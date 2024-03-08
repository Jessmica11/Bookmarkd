// const { gql } = require("apollo-server");

const typeDefs = `

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
    joinBookClub(userId: ID!, bookClubId: ID!): User
    addCommentToBookClub(
      bookClubId: ID!
      userId: ID!
      commentText: String!
    ): BookClub
  }
`;

module.exports = typeDefs;
