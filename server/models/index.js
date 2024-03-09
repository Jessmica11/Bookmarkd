// just for the sake of organization, we'll use this file to import 
// all of our models and export them as an object
const User = require('./User');
const Comment = require('./Comment');
const BookClub = require('./Bookclub');

// add more as needed

module.exports = { User, Comment, BookClub };