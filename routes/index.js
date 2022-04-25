const express = require('express');
const router = express.Router();

const posting = require('./posting');

router.use('/api', [posting]);

module.exports = router;
