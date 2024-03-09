const mongoose = require("mongoose");
require ('dotenv').config();

let MONGODB_URI;

  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/Bookmarkd';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

module.exports = db;
