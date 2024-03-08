// resolvers.js

const { BookClub, Comment, User } = require("../models");

const resolvers = {
  Query: {
    bookClubs: async () => {
      return BookClub.find({});
    },

    bookClubById: async (parent, { id }) => {
      return BookClub.findOne({ _id: id });
    },

    usersInBookClub: async (parent, { bookClubId }) => {
      try {
        const bookClub = await BookClub.findOne({ _id: bookClubId }).populate(
          "members"
        );
        return bookClub ? bookClub.members : [];
      } catch (error) {
        console.log("Error fetching users in book club:", error);
        throw error;
      }
    },

    bookClubComments: async (parent, { bookClubId }) => {
      try {
        const bookClub = await BookClub.findOne({ _id: bookClubId }).populate(
          "comments"
        );
        return bookClub ? bookClub.comments : [];
      } catch (error) {
        console.log("Error fetching comments in book club:", error);
        throw error;
      }
    },
  },

  Mutation: {
    joinBookClub: async (parent, { userId, bookClubId }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { book_clubs: bookClubId } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (error) {
        console.error("Error joining book club:", error);
        throw error;
      }
    },

    addCommentToBookClub: async (
      parent,
      { bookClubId, userId, commentText }
    ) => {
      try {
        const newComment = new Comment({
          content: commentText,
          user: userId,
        });

        const updatedBookClub = await BookClub.findOneAndUpdate(
          { _id: bookClubId },
          { $push: { comments: newComment } },
          { new: true, runValidators: true }
        );

        return updatedBookClub;
      } catch (error) {
        console.error("Error adding comment to book club:", error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
