const db = require("../config/connection");
const { Comment, User } = require("../models");
const cleanDB = require("./cleanDB");

const commentData = require("./commentData.json");
const userData = require("./userData.json");

db.once("open", async () => {
  try {
    // Clean the existing data
    await cleanDB("Comment", "User");

    // Insert comment data
    const comments = await Comment.insertMany(commentData);

    // Insert user data
    const users = await User.insertMany(userData);

    console.log("Data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
});
