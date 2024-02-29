// create a schema for a Comment model
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// create a schema for a Comment model
const commentSchema = new Schema({});

const Comment = model('Comment', commentSchema);

module.exports = Comment;

