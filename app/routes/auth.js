const express = require('express');
const auth = express.Router();
const validatorAuth = require('../middleware/validator/validatorAuth');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');

auth.post('/register', validatorAuth.register, userController.store);
auth.post('/login', validatorAuth.login, authController.login);
auth.get('/logout', verifyToken, authController.logout);

module.exports = auth;
