const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({
      status: false,
      message: 'Token required for authentication',
    });
  }

  const token = authHeader.split(' ')[1]; // get token from header

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, value) => {
    if (err) {
      return res.status(403).send({
        status: false,
        message: 'Token invalid',
      });
    }
    next();
  });
};
