const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Token = require('../models/tokenModel');

exports.login = async (req, res) => {
  try {
    const getUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const checkPass = await bcrypt.compare(getUser.email, req.body.password);

    if (!getUser && !checkPass) {
      return res.status(404).send({
        status: false,
        message: 'Email or Password Incorrect',
      });
    }

    const data = {
      id: getUser.id,
      name: getUser.name,
      email: getUser.email,
    };

    const checkToken = await Token.findOne({
      where: {
        userId: getUser.id,
      },
    });

    // jika token suda ada
    if (!checkToken) {
      const creatToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

      res.cookie('authcookie', creatToken, {
        httpOnly: false,
        maxAge: 2592000,
      });

      Token.create({
        userId: getUser.id,
        token: creatToken,
      });

      return res.status(201).send({
        status: true,
        message: 'Login Success',
        data: getUser,
        token: creatToken,
      });
    }

    return res.status(401).send({
      status: false,
      message: 'Access denied',
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  const token = req.cookies.authcookie; // get cookie token

  if (!token) {
    return res.status(404).send({
      status: false,
      message: 'Token tidak valid',
    });
  }

  Token.destroy({
    where: {
      token: token,
    },
  });

  res.clearCookie('authcookie');
  return res.status(200).send({
    status: true,
    message: 'Logout Berhasil',
  });
};

// const login1 = (req, res) => {
//   let formData = {
//     email: req.body.email,
//     password: req.body.password,
//   };
//   connection.query(
//     `SELECT * FROM users WHERE email = "${formData.email}"`,
//     function (err, result) {
//       if (err) {
//         return res.status(500).json({
//           status: false,
//           message: 'Internal Server Error',
//         });
//       } else {
//         bcrypt.compare(
//           formData.password,
//           result[0].password,
//           function (err, response) {
//             if (response === true) {
//               const token = jwt.sign(
//                 { user_id: result[0].id, name: result[0].name },
//                 process.env.TOKEN_KEY,
//                 {
//                   expiresIn: '2h',
//                 }
//               );
//               return res.status(200).json({
//                 status: true,
//                 message: 'Login berhasil',
//                 token: token,
//                 data: {
//                   id: result[0].id,
//                   nama: result[0].name,
//                   email: result[0].email,
//                 },
//               });
//             } else {
//               return res.status(500).json({
//                 status: false,
//                 message: 'Email atau password salah',
//               });
//             }
//           }
//         );
//       }
//     }
//   );
// };
