const express = require('express');
const auth = express.Router();
const validatorAuth = require('../validator/validatorAuth');
const authHandler = require('../handler/authHandler');

auth.post('/register', validatorAuth.register, authHandler.register);
// auth.post('/login', async (req, res) => {});

module.exports = auth;
