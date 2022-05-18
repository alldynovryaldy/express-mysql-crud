const express = require('express');
const posting = express.Router();
const validator = require('../middleware/validator/validatorPosting');
const postingController = require('../controllers/postingController');

posting.get('/posting', postingController.getAll); // index
posting.post('/posting', validator.posting, postingController.create); // insert
posting.get('/posting/:id', postingController.getOne); // get by id
posting.patch('/posting/:id', validator.posting, postingController.update); // update
posting.delete('/posting/:id', postingController.delete); // delete

module.exports = posting;