const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Token = require('../models/tokenModel');

const User = db.define(
  'user',
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
User.hasOne(Token);
module.exports = User;
