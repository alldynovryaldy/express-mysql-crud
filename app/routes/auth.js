const express = require('express');
const auth = express.Router();
const validatorAuth = require('../middleware/validator/validatorAuth');
const authController = require('../controller/authController');

auth.post('/register', validatorAuth.register, authController.register);
auth.post('/login', validatorAuth.login, authController.login);

module.exports = auth;