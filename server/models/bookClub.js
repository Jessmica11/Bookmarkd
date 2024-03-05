const { Schema, model } = require('mongoose');

//Define bookClubSchema for BookClub model
const bookClubSchema = new Schema({
  name: {
    type: String,
    required: true, // Ensure a name is provided for the BookClub
  },
  description: {
    type: String,
    required: true, //describing bookClub
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to associated Users (members)
    },
  ],
  books: [
    {
      type: Schema.Type.ObjectId,
      ref: "Book", // Reference to associated Books
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment", // Reference to associated Comments
    },
  ],
});

// Create the BookClub model using the bookClubSchema
const BookClub = model('BookClub', bookClubSchema);

// Export the BookClub model for use in other files
model.exports = BookClub