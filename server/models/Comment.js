// create a schema for a Comment model
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create a schema for a Comment model
const commentSchema = new Schema({
  content: {
    type: String,
    required: true, // ensure a content is provided for the Comment
    minlength: 1, //the content has at least 1 characters
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // reference to the User who posted the Comment
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

//create the Comment model using the commentSchema
const Comment = model('Comment', commentSchema);

//export the Comment model for use in other files
module.exports = Comment;