// Import models from Mongoose
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema for User model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // usernames are unique
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // emails are unique
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  bio: {
    type: String,
    required: false, //bios are optional
    minlength: 2,
    maxlength: 300, //max/minlength limits users bio
  
  },
  book_clubs: [
    {
      type: Schema.Types.ObjectId,
      ref: "BookClub", // refrences to associated BookClubs
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment", // refrences to associated Comments
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// create the User model using the UserSchema
const User = model("User", userSchema);

module.exports = User;