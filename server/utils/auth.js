const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'B00kmarkd!';
const expiration = '2h';

function signToken({ id, email, username}) {
  return jwt.sign({ id, email, username }, secret, { expiresIn: expiration });
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

function authMiddleware(req, res, next) {
  // pull the token from the request headers or our query string
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return next(new GraphQLError('Authentication token is missing.'));
  }

  try {
    // verify that the token is valid and not expired
    const decoded = verifyToken(token.replace('Bearer ', ''));

    // attach the decoded user information to the request object
    req.user = decoded;

    next();
  } catch (err) {
    return next(new GraphQLError('Invalid token or token has expired.'));
  }
}

async function authenticateUser(email, password) {
  // find the user by the email
  const user = await User.findOne({ email });

  if (!user) {
    return null;
  }

  // check if the provided password is correct
  const isCorrectPassword = await user.isCorrectPassword(password);

  if (!isCorrectPassword) {
    return null;
  }

  // return the user if the email and password are correct
  return user;
}

function signToken({ id, email, username }) {
  return jwt.sign({ id, email, username }, secret, { expiresIn: expiration });
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

function authMiddleware(req, res, next) {
  // pull the token from the request headers or our query string
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    return next(new GraphQLError('Authentication token is missing.'));
  }

  try {
    // verify the token we made earlier
    const decoded = verifyToken(token.replace('Bearer ', ''));

    // attach the decoded user information to the request object
    req.user = decoded;

    next();
  } catch (err) {
    return next(new GraphQLError('Invalid token or token has expired.'));
  }
}

module.exports = {
  signToken,
  verifyToken,
  authMiddleware,
  authenticateUser,
};
