const express = require('express');
const posting = express.Router();
const validator = require('../middleware/validator/validatorPosting');
const postingController = require('../controller/postingController');

posting.get('/posting', postingController.getPosting); // index
posting.post('/posting', validator.posting, postingController.addPosting); // insert
posting.get('/posting/:id', postingController.detailPosting); // get by id
posting.patch('/posting/:id', validator.posting, postingController.updatePosting); // update
posting.delete('/posting/:id', postingController.deletePosting); // delete

module.exports = posting;