const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'B00kmarkd!';
const expiration = '2h';

function signToken({ id }) {
  return jwt.sign({ id }, secret, { expiresIn: expiration });
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
    // Verify the token
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
};
