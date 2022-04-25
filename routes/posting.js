const express = require('express');
const posting = express.Router();

const connection = require('../config/database');

// index
posting.get('/posting', function (req, res) {
  connection.query(
    'SELECT * FROM posting ORDER BY id desc',
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Server Error',
        });
      } else {
        return res.status(200).json({
          status: true,
          message: 'List data',
          data: rows,
        });
      }
    }
  );
});

module.exports = posting;
