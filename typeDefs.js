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
    joinBookClub(userId: ID!, bookClubId: ID!): User
    addCommentToBookClub(
      bookClubId: ID!
      userId: ID!
      commentText: String!
    ): BookClub
    login(email:String!, password:String!): Auth
    addUser(username: String!, email: String!, password: String!, bio: String!): Auth
  }
`;

module.exports = typeDefs;