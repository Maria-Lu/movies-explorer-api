const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED_MESSAGE } = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  }
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_MESSAGE);
  }
  req.user = payload;
  next();
};
