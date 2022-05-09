const connection = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  let formData = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  connection.query('INSERT INTO users SET ?', formData, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: err,
      });
    } else {
      // Create token
      const token = jwt.sign(
        { user_id: rows.insertId, name: req.body.name },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h', // token expired in 2 hours
        }
      );

      return res.status(200).json({
        status: true,
        token: token,
        message: 'Registrasi berhasil.',
      });
    }
  });
};

module.exports = { register };
