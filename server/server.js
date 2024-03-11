const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const fs = require("fs");


// const path = require("path");

const { typeDefs, resolvers } = require("./schemas");
const { User } = require("./models");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// define a path to userData.json
const userDataPath = path.join(__dirname, "./seeders/userData.json");
const userData = JSON.parse(fs.readFileSync(userDataPath, "utf-8"));

// const server = new ApolloServer({
//   schema: buildSchema(typeDefs),
//   context: ({ req }) => ({ req }),
//   resolvers,
// });
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // app.use("/graphql", server.getMiddleware());
    app.use("/graphql", expressMiddleware(server));

  // Add the following lines
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // create users from userData.json
  app.post("/api/createUsersFromJson", async (req, res) => {
    try {
      // simulate creating users in your database
      const createdUsers = await Promise.all(
        userData.map(async (user) => {
          // create user in your database
          const createdUser = await User.create(user);
          return createdUser;
        })
      );

      res.json({ success: true, createdUsers });
    } catch (error) {
      console.error("Error creating users:", error.message);
      res.status(500).json({ success: false, error: "Failed to create users" });
    }
  });

  // serve client/dist as static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
