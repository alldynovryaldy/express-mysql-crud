const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Posting = db.define(
  'posting', // table name generate
  {
    // Model attributes are defined here
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    // custom nama table
    freezeTableName: true,
  }
);
module.exports = Posting;
