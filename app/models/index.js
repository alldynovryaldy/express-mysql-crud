const dbConfig = require('../config/database')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
  }
)

sequelize
  .authenticate()
  .then(function () {
    console.log('Koneksi ke db telah berhasil.');
  })
  .catch(function (err) {
    console.log('Tidak dapat melakukan koneksi ke db: ', err);
  });

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.posting = require('../models/postingModel')(sequelize, Sequelize);
module.exports = db;