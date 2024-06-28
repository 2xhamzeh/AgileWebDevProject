// middleware/jwtAuth.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secret = 'your_jwt_secret_key';

module.exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, secret, {
    expiresIn: '1h',
  });
};

module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];  // Split the Bearer token
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.userId = decoded.id;
    next();
  });
};