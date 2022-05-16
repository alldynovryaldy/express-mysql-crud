const connection = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
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

const login = (req, res) => {
  let formData = {
    email: req.body.email,
    password: req.body.password,
  };
  connection.query(
    `SELECT * FROM users WHERE email = "${formData.email}"`,
    function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        });
      } else {
        bcrypt.compare(
          formData.password,
          result[0].password,
          function (err, response) {
            if (response === true) {
              const token = jwt.sign(
                { user_id: result[0].id, name: result[0].name },
                process.env.TOKEN_KEY,
                {
                  expiresIn: '2h',
                }
              );
              return res.status(200).json({
                status: true,
                message: 'Login berhasil',
                token: token,
                data: {
                  id: result[0].id,
                  nama: result[0].name,
                  email: result[0].email,
                },
              });
            } else {
              return res.status(500).json({
                status: false,
                message: 'Email atau password salah',
              });
            }
          }
        );
      }
    }
  );
};
module.exports = { register, login };
