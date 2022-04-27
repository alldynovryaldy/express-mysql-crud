const mysql = require('mysql');

// config database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting : ' + err.stack);
    return;
  }
  console.log(connection.state);
});

module.exports = connection;
