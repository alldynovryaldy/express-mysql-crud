const db = require('../models'); // connect with db
const Posting = db.posting; // connect with model
const operator = db.Sequelize.Op; // for operator query

// INSERT DATA
exports.create = async (req, res) => {
  // form data
  const formData = {
    ...req.body
  }

  try {
    // save data in database
    // console.log(data.toJSON());
    let data = await Posting.create(formData);
    return res.status(201).send({
      status: true,
      message: 'Create data success.',
      data: {
        id: data.id
      }
    })
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message
    })
  }
};

// GET ALL DATA
exports.getAll = (req, res) => {
  Posting.findAll({
      order: [
        ['id', 'DESC'], // will return `id` DESC
      ]
    })
    .then((result) => {
      return res.status(200).send({
        status: true,
        data: result
      })
    }).catch((err) => {
      return res.status(500).send({
        status: false,
        message: err.message || 'Server internal error'
      })
    });
};

// GET DATA BY ID
exports.getOne = async (req, res) => {
  try {
    // param id
    const id = req.params.id;
    let data = await Posting.findByPk(id)
    if (data) {
      return res.status(200).send({
        status: true,
        data: data
      })
    }
    return res.status(404).send({
      status: false,
      message: '404: Data Not Found'
    })
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message || 'Server Internal Error'
    })
  }

};

// UPDATE DATA
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const checkData = await Posting.findByPk(id) // check data in database
    if (checkData) {
      // update data
      await Posting.update(req.body, {
        where: {
          id: id
        }
      })

      return res.status(200).send({
        status: true,
        message: 'Update Success',
      })
    } else {
      // if data not found
      return res.status(404).send({
        status: false,
        message: 'Data Not Found'
      })
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message || 'Server Internal Error'
    })

  }
  //
};

// DELETE DATA
exports.delete = async (req, res) => {

  try {
    const id = req.params.id;
    const checkData = await Posting.findByPk(id) // check data in database
    console.log(checkData);

    if (checkData) {

      // delete data
      await Posting.destroy({
        where: {
          id: id
        }
      })

      res.status(200).send({
        status: true,
        message: 'Delete Success',
      })
    }

    // if data not found
    res.status(404).send({
      status: false,
      message: 'Data Not Found'
    })
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message
    })
  }

};