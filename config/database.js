const mysql = require('mysql');

// config database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'express-mysql-crud',
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting : ' + err.stack);
    return;
  }
  console.log(connection.state);
});

module.exports = connection;
