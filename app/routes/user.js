const express = require('express');
const user = express.Router();
const validatorAuth = require('../middleware/validator/validatorAuth');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');

user.get('/user', verifyToken, userController.getAll);
user.post('/register', validatorAuth.register, userController.store);

module.exports = user;
