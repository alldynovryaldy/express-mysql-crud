const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('../models/userModel');

const Token = db.define(
  'token',
  {
    token: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

User.hasOne(Token);
module.exports = Token;
