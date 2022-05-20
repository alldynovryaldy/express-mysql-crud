const { DataTypes } = require('sequelize');
const db = require('../config/database');

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
module.exports = User;
