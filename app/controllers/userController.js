const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.getAll = async (req, res) => {
  try {
    const data = await User.findAll();
    return res.status(200).send({
      status: true,
      message: 'Data user berhasil di ambil',
      data: data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message || 'Server internal error',
    });
  }
};

exports.store = async (req, res) => {
  try {
    const formData = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    };

    const data = await User.create(formData);

    const dataUser = {
      id: data.id,
      name: req.body.name,
      email: req.body.email,
    };

    return res.status(201).send({
      status: true,
      message: 'Register Succes',
      data: dataUser,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message || 'Server internal error',
    });
  }
};
