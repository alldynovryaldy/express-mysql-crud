const express = require('express');
const posting = express.Router();
const validator = require('../middleware/validator/validatorPosting');
const postingController = require('../controllers/postingController');
const { verifyToken } = require('../middleware/verifyToken');

posting.get('/posting', verifyToken, postingController.getAll); // index

posting.post(
  '/posting',
  verifyToken,
  validator.posting,
  postingController.create
); // insert

posting.get('/posting/:id', verifyToken, postingController.getOne); // get by id

posting.patch(
  '/posting/:id',
  verifyToken,
  validator.posting,
  postingController.update
); // update

posting.delete('/posting/:id', verifyToken, postingController.delete); // delete

module.exports = posting;
