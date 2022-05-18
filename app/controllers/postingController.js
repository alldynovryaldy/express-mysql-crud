const postingModel = require('../models/postingModel')

exports.getPosting = (req, res) => {
  postingModel.get(req, res)
};

exports.addPosting = (req, res) => {
  postingModel.store(req, res)
};

exports.detailPosting = (req, res) => {
  postingModel.edit(req, res)
};

exports.updatePosting = (req, res) => {
  postingModel.update(req, res)
};

exports.deletePosting = (req, res) => {
  postingModel.destroy(req, res)
};