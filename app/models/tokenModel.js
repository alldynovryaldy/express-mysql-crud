const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Token = db.define(
  'token',
  {
    token: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Token;
