const jwt = require('jsonwebtoken');

const { UnauthorizedException } = require('../errors');
const { env } = require('../config');

const checkJwt = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return next(new UnauthorizedException('No token provided', 'auth'));

  const tokenBearer = token.split(' ')[1];
  jwt.verify(tokenBearer, env.jwt.secret, (err, decoded) => {
    if (err) {
      return next(
        new UnauthorizedException('Failed to authenticate token.', 'auth'),
      );
    }
    req.user = decoded;
    next();
  });
};

module.exports = { checkJwt };
