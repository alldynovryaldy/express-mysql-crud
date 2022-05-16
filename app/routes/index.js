const express = require('express');
const router = express.Router();
const posting = require('./posting');
const auth = require('./auth');

router.use('/api', [posting, auth]);

// method ini akan di jalankan kapan pun
router.use('/', function (req, res) {
  res.send('Welcome to Web API with express, mysql')
});

module.exports = router;