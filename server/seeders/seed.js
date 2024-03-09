const db = require("../config/connection");
const { Comment, User } = require("../models");
const cleanDB = require("./cleanDB");

const commentData = require("./commentData.json");
const userData = require("./userData.json");

db.once("open", async () => {
  try {
    console.log("Cleaning existing data...");
    await cleanDB("Comment", "User");

    console.log("Seeding comment data...");
    const comments = await Comment.insertMany(commentData);

    console.log("Seeding user data...");
    for (const userDataItem of userData) {
      const existingUser = await User.findOne({
        username: userDataItem.username,
      });
      if (!existingUser) {
        await User.create(userDataItem);
      } else {
        console.log(
          `User with username '${userDataItem.username}' already exists. Skipping insertion.`
        );
      }
    }

    console.log("Data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
});