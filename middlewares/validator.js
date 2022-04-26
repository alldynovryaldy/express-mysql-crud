const { body, validationResult } = require('express-validator');

exports.posting = [
  body('title').notEmpty(),
  body('content').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
